import { EntityRepository, Repository } from "typeorm";
import User from "../../entity/User";
import UserDTO from "../controllers/dto/user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ name, email, password }: UserDTO) {
    const user = await User.create({ name, email, password }).save();

    return user;
  }
}
