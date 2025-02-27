import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(['INTERN', 'DEVELOPER', 'MANAGER'], {
    message: "Enter Valid Role ['INTERN' | 'DEVELOPER' | 'MANAGER']",
  })
  role: 'INTERN' | 'DEVELOPER' | 'MANAGER';
}
