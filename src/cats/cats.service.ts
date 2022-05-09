import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.chema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body; //프론트단에서의 body를 받아와 각각 email, name, password로 선언.
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      // 유효성검사.
      // exists는 catModel안에 같은 email이 존재하는지 검사하고 boolean 타입을 리턴한다.
      throw new UnauthorizedException('해당 고양이는 이미 존재합니다.'); // HttpException을 통해 isCatExist가 true(이미존재)면 메세지를 띄워준다.
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email, // 유효성 검사를 통과한 email 주소를 저장
      name,
      password: hashedPassword, // hash처리한 password를 db에 저장
    });

    return cat.readOnlyData; // virtual db를 넣어줌으로써 원치않는 데이터에 접근을 막을 수 있다.
  }
}
