import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validation을 사용하려면, pipe를 등록해줘야한다.
  app.useGlobalFilters(new HttpExceptionFilter()); // app의 전역에서 filter를 사용하게 등록한 것.
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
