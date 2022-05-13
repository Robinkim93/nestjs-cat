import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.chema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    if (result) return true;
    else return false;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    //db에서 email을 받아오고, db안에서 같은 email이 있는지 찾아 return해준다.
    const user = await this.catModel.findOne({ email });
    return user;
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    // hash처리된 id를 받아서 유효성검사를 하고, select 함수로 password를 뺀 나머지를 return해서 jwt 모듈에 넘긴다.
    return cat;
  }
}
