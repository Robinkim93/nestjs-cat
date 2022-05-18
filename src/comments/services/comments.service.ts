import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async getAllComments() {
    try {
      const comments = this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComments(id: string, commentData: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { author, comments } = commentData;
      const ValidateAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author); // author와 id가 같은 내용이기 때문에 한번더 validation 체크
      const newComment = new this.commentsModel({
        author: ValidateAuthor._id,
        comments,
        info: targetCat._id,
      });
      console.log(targetCat, ValidateAuthor);
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeConut = comment.likeConut + 1;
      return await comment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
