import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  GetAllCat() {
    // throw new HttpException('api broken', 401);
    return 'get all cat api';
  }

  @Get(':id')
  GetOneCat(@Param('id', ParseIntPipe) id: number) {
    return `get ${id} cat api`;
  }
}
