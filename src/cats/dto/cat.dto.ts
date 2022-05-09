import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.chema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  // 비밀번호는 노출되면 안되기때문에 Picktype을 통해 필요한 정보만 스키마에서 빼서 사용하고,
  // 스키마에 존재하지 않는 id만 추가로 dto패턴을 사용해 추가해준다.
  @ApiProperty({
    // 어떤 body를 보내면 되는지 swagger상의 example을 달아준다.
    example: '3332123',
    description: 'id',
  })
  id: string;
}
