import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Public } from './public.decorator'
import { LoginUserPayloadDto } from './users/dto'

interface RequestWithUser extends Request {
  user: LoginUserPayloadDto | null | undefined
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: RequestWithUser): Promise<LoginUserPayloadDto> {
    return this.authService.login(req.user)
  }

  @Get('/')
  @Get('home')
  home(@Req() req: RequestWithUser): any {
    return req.user
  }

  @Public()
  @Get('public')
  about(): any {
    return 'Public section'
  }
}
