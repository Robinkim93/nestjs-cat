import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';

import { Cat, CatSchema } from './cats.chema';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload', // 저장할 폴더를 지정. (destination의 약자)
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ], // 스키마를 등록하여 해당 모듈안에서 사용할 수 있도록 함.
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], // 모듈자체를 다른 모듈에서 imports하고 exports에 있는 provider들을 다른 모듈에서 사용할 수 있다.
})
export class CatsModule {}
