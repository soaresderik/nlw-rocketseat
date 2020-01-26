import * as mongoose from "mongoose";
import { IUser } from "./User";

interface ISpot extends mongoose.Document {
  thumbnail: string;
  company: string;
  price: number;
  techs: string[];
  user: mongoose.Model<IUser>;
}

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

SpotSchema.virtual("thumbnail_url").get(function() {
  return `http://localhost:3000/files/${this.thumbnail}`;
});

const Spot = mongoose.model<ISpot>("Spot", SpotSchema);

export { Spot, ISpot };
