import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthUserDto } from 'src/user/dtos/authUser.dto';
import { AuthService } from './auth.service';
import { Role } from './constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-user')
  registerUser(@Body(ValidationPipe) authUserDto: AuthUserDto) {
    return this.authService.register({ ...authUserDto, roles: [Role.User] });
  }

  @Post('register-admin')
  registerAdmin(@Body(ValidationPipe) authUserDto: AuthUserDto) {
    return this.authService.register({ ...authUserDto, roles: [Role.Admin] });
  }

  @Post('login')
  login(@Body(ValidationPipe) authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }
}
