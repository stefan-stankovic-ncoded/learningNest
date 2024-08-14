import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { RegisterUserDto } from 'src/users/dtos/register-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  saltOrRounds: number = 10;

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const { password, ...result } = user;

    const isMatch = await bcrypt.compare(pass, password);

    if (!isMatch) {
      return null;
    }

    return result;
  }

  async login(user: LoginUserDto) {
    const payload = await this.usersService.findOneByEmail(user.email);

    return {
      user: payload,
      access_token: this.jwtService.sign({ ...payload }),
    };
  }

  async register(user: RegisterUserDto) {
    const existingUser = await this.usersService.findOneByEmail(user.email);

    if (existingUser) {
      throw new ConflictException();
    }

    const hashPass = await bcrypt.hash(user.password, this.saltOrRounds);

    return await this.usersService.createOne({ ...user, password: hashPass });
  }
}
