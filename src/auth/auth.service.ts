import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // 로그인은 email과 password가 있어야하기 때문에, db에 email과 password가 있는지 확인 후
  // 토큰을 발행해줄 수 있는 로직을 짜야한다.

  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    //여기서 받은 email과 password는 login할 때 프론트단에서 요청한 정보들임.
    const { email, password } = data; // 구조분해할당으로 data 안의 email과 password를 꺼냄

    // 해당 email이 있는지 확인
    // 여기서 받은 cat은 기존 db에 존재하는 email과 password임
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      // cat이 없다면 에러메세지를 보내줌.
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    // password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password, // 2개의 hash처리 된 비밀번호가 일치하는지 확인하는 compare메서드로 확인.
    );

    // 해당 password가 같은지
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    const payload = { email: email, sub: cat.id }; // token에 들어갈 정보.
    const token = this.jwtService.sign(payload);
    return {
      token, // jwtService의 sign함수를 이용해서 token을 만들어 프론트단에 보낼 수 있다.
    };
  }
}
