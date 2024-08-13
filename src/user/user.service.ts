import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  private registeredUsers: UserDto[] = []; // Ovo treba da predstavlja bazu podataka

  async findOne(email: string) {
    return this.registeredUsers.find((user) => user.email === email);
  }

  async saveUser(user: UserDto) {
    this.registeredUsers.push(user);
    return user;
  }
}
