import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.chema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      if (result) return true;
      else return false;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    //db에서 email을 받아오고, db안에서 같은 email이 있는지 찾아 return해준다.
    const user = await this.catModel.findOne({ email });
    return user;
  }
}
