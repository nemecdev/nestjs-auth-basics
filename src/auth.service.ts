import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginUserPayloadDto } from './users/dto'
import { LoginJwtPayloadDto } from './users/dto/jwt-payload.dto'
import { UsersService } from './users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<LoginUserPayloadDto | null> {
    const user = await this.usersService.findOne(username)
    if (user && user.password === password) {
      const { password, ...user_without_password } = user

      return user_without_password
    }

    return null
  }

  async login(user: LoginUserPayloadDto): Promise<any> {
    const { id: sub, username } = user
    const jwt_payload: LoginJwtPayloadDto = { sub, username }

    return {
      access_token: this.jwtService.sign(jwt_payload),
    }
  }
}
