import { IsEnum } from 'class-validator';
import { Role } from 'src/decorators/roles.decorator';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends LoginUserDto {
  @IsEnum(Role)
  role: Role;
}
