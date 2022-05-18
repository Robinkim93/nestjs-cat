import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dtos/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '모든 고양이 댓글 가져오기',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: '특정 고양이에 댓글 달기',
  })
  @Post(':id')
  async createComments(
    @Param() id: string,
    @Body() comments: CommentsCreateDto,
  ) {
    return this.commentsService.createComments(id, comments);
  }

  @ApiOperation({
    summary: '좋아요 수 늘리기',
  })
  @Patch(':id')
  async plusLike(@Param() id: string) {
    return this.commentsService.plusLike(id);
  }
}
