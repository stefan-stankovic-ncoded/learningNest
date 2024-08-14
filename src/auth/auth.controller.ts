import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { Role } from 'src/decorators/roles.decorator';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(ValidationPipe) user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(@Body(ValidationPipe) user: LoginUserDto) {
    return this.authService.register({ ...user, role: Role.BookkeeperAdmin });
  }
}
