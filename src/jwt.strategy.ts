import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { jwtConstants } from './constants'
import { LoginUserPayloadDto } from './users/dto'
import { LoginJwtPayloadDto } from './users/dto/jwt-payload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    } as StrategyOptions)
  }

  async validate(payload: LoginJwtPayloadDto): Promise<LoginUserPayloadDto> {
    return { id: payload.sub, username: payload.username }
  }
}
