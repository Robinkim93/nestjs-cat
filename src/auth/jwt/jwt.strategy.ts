import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret', // 유출되면 안되기에 .env에 따로 저장함
      ignoreExpiration: false, // 만료기간
    });
  }

  async validate(payload: Payload) {
    // 프론트단에서 넘어온 jwt의 payload를 뽑아내서 유효성 검사를 하는 것.
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub, // Repository에서 유효성검사를 통과하고 넘어오는 id에 맞는 정보들을 password를 제외하고 받았음.
    );
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('토큰 이상');
    }
  }
}
