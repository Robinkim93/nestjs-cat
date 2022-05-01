import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  cathello(): string {
    return 'cat hello';
  }
}
