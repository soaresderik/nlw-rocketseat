import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export default class UserDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
