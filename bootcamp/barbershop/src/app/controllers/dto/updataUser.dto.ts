import UserDTO from "./user.dto";
import { IsString, IsNotEmpty } from "class-validator";

export default class UpdateUserDTO extends UserDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
