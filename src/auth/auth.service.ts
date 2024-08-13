import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  private signUser(authUserDto: CreateUserDto) {
    return this.jwtService.sign(authUserDto);
  }

  async register(authUserDto: UserDto) {
    const foundUser = await this.userService.findOne(authUserDto.email);

    if (foundUser) {
      throw new ConflictException('User exists');
    }

    const savedUser = await this.userService.saveUser(authUserDto);
    return {
      email: savedUser.email,
      accessToken: this.signUser(savedUser),
    };
  }

  async login(authUserDto: CreateUserDto) {
    const foundUser = await this.userService.findOne(authUserDto.email);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (authUserDto.password !== foundUser.password) {
      throw new ForbiddenException('Wrong password');
    }

    return {
      email: foundUser.email,
      accessToken: this.signUser(foundUser),
    };
  }
}
