import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' }) // swagger 상의 엔드포인트마다 설명을 붙혀줄 수 있다.
  @Get()
  GetCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body); // signUp의 return값이 Promise이기 때문에 await처리해줌.
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload image';
  }
}
