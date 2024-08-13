import { IsArray, IsEmail, IsStrongPassword } from 'class-validator';
import { Role } from 'src/auth/constants/constants';

export class UserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsArray()
  roles: Role[];
}
