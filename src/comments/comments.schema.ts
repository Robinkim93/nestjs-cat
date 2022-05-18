import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, ObjectId, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, // 변동된 일자를 찍어주는 옵션.
};
@Schema(options) // 스키마를 생성하고 옵션을 지정한 데코레이터
export class Comments extends Document {
  @ApiProperty({
    // 어떤 body를 보내면 되는지 swagger상의 example을 달아준다.
    description: '고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true, // 유일
    ref: 'cats',
  })
  @IsNotEmpty() // 비어있지 않도록 해주는 데코레이터
  author: ObjectId;

  @ApiProperty({
    example: 'Hi Cats!',
    description: 'Comments',
    required: true,
  })
  @Prop({ required: true }) // 하나의 column이 된다.
  @IsString()
  @IsNotEmpty()
  comments: string;

  @ApiProperty({
    description: '좋아요의 수',
  })
  @Prop({ required: true, default: 0 }) // 하나의 column이 된다.
  @IsPositive() // 음수가 되지 않게 해준다.
  likeConut: number;

  @ApiProperty({
    // 어떤 body를 보내면 되는지 swagger상의 example을 달아준다.
    description: '작성 대상',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true, // 유일
    ref: 'cats',
  })
  @IsNotEmpty() // 비어있지 않도록 해주는 데코레이터
  info: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments); // Cat은 class이기 때문에 Schema로 바꿔준 것.
