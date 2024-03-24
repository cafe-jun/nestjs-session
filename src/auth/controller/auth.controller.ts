import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginReqDto } from './dto/login-req.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginReqDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('logout')
  async logout() {}
}
