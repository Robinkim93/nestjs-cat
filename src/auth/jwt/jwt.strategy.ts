import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrkey: 'secretKey', // 유출되면 안되기에 .env에 따로 저장함
      ignoreExpiration: false, // 만료기간
    });
  }

  //   async validate(payload) {
  //     // 프론트단에서 넘어온 jwt의 payload를 뽑아내서 유효성 검사를 하는 것.
  //   }
}
