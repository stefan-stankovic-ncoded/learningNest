import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(40000)
  @Max(120000)
  wage: number;
}
