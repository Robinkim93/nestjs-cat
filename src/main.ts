import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() // 협업을 위한 api문서는 Swagger로 만들 수 있다.
    .setTitle('C.I.C') // api 제목
    .setDescription('cat') // api 설명
    .setVersion('1.0') // api 버전
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 1번째 인자는 api docs의 엔드포인트.
  app.enableCors({ origin: true, credentials: true }); // CORS 문제를 해결하기 위해 프론트를 등록해주는 것
  // origin이 true이면 아무나 접근이 가능하기 때문에, 배포단계에서는 url을 작성해줘야한다.
  // credentials는 신뢰가능하다는 옵션임.
  app.useGlobalPipes(new ValidationPipe()); // class validation을 사용하려면, pipe를 등록해줘야한다.
  app.useGlobalFilters(new HttpExceptionFilter()); // app의 전역에서 filter를 사용하게 등록한 것.
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
