import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
  @IsEmail() // Email형식으로 validation 해주는 데코레이터
  @IsNotEmpty() // 비어있지 않도록 해주는 데코레이터
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
