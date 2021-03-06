import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';
import { Cat } from '../cats.chema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body; //프론트단에서의 body를 받아와 각각 email, name, password로 선언.
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      // 유효성검사.
      // exists는 catModel안에 같은 email이 존재하는지 검사하고 boolean 타입을 리턴한다.
      throw new UnauthorizedException('해당 고양이는 이미 존재합니다.'); // HttpException을 통해 isCatExist가 true(이미존재)면 메세지를 띄워준다.
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email, // 유효성 검사를 통과한 email 주소를 저장
      name,
      password: hashedPassword, // hash처리한 password를 db에 저장
    });

    return cat.readOnlyData; // virtual db를 넣어줌으로써 원치않는 데이터에 접근을 막을 수 있다.
  }
  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);

    const newCat = this.catsRepository.findByIdAndUpdateImg(cat.id, fileName);
    console.log(newCat);
    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCat = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCat;
  }
}
