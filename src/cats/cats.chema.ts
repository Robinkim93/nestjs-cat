import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, // 변동된 일자를 찍어주는 옵션.
};
@Schema(options) // 스키마를 생성하고 옵션을 지정한 데코레이터
export class Cat extends Document {
  @Prop({
    required: true, // 필수
    unique: true, // 유일
  })
  @IsEmail() // Email형식으로 validation 해주는 데코레이터
  @IsNotEmpty() // 비어있지 않도록 해주는 데코레이터
  email: string;

  @Prop({ required: true }) // 하나의 column이 된다.
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat은 class이기 때문에 Schema로 바꿔준 것.