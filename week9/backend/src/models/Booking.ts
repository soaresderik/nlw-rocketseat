import * as mongoose from "mongoose";
import { IUser, ISpot } from "./index";

interface IBooking extends mongoose.Document {
  date: string;
  approved: boolean;
  user: mongoose.Model<IUser>;
  spot: ISpot;
}

const BookingSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot"
  }
});

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

export { Booking, IBooking };
