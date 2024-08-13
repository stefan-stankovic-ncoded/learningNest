import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { Role } from './auth/constants/constants';
import { Roles } from './decorators/roles.decorator';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @Roles(Role.Admin)
  createHello(): string {
    return this.appService.createHello();
  }
}
