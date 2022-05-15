import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validation을 사용하려면, pipe를 등록해줘야한다.
  app.useGlobalFilters(new HttpExceptionFilter()); // app의 전역에서 filter를 사용하게 등록한 것.
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });
  // http://localhost:8000/media/cats로 접근하기 위해 prefix를 넣어주는 middleware
  // 첫번째 인자는 dist 폴더의 /common의 uploads경로에 있는 것들에 접근한다는 뜻.

  const config = new DocumentBuilder() // 협업을 위한 api문서는 Swagger로 만들 수 있다.
    .setTitle('C.I.C') // api 제목
    .setDescription('cat') // api 설명
    .setVersion('1.0') // api 버전
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // 1번째 인자는 api docs의 엔드포인트.
  app.enableCors({ origin: true, credentials: true }); // CORS 문제를 해결하기 위해 프론트를 등록해주는 것
  // origin이 true이면 아무나 접근이 가능하기 때문에, 배포단계에서는 url을 작성해줘야한다.
  // credentials는 신뢰가능하다는 옵션임.
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
