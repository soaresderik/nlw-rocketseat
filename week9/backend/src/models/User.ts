import * as mongoose from "mongoose";

interface IUser extends mongoose.Document {
  email: string;
}

const UserSchema = new mongoose.Schema({
  email: String
});

const User = mongoose.model<IUser>("User", UserSchema);

export { User, IUser };
