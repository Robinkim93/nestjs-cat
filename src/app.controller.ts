import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller() // 함수에 인자가 들어가면 localhost:8000/인자 의 형태로 엔드포인트 변경 가능.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 인자가 들어가면 localhost:8000/Controller인자/Get인자 의 형태로 엔드포인트 변경
  getHello(): string {
    // express와 마찬가지로 요청에 대한 body에 접근할 수 있으나, 책임을 분리하고 확실히하기 위해 @Req, @Body, @Param같은 데코레이터
    // 패턴을 이용하여 다양한 데이터에 접근한다
    return 'hello world';
  }
}
