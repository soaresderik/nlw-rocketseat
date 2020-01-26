import { Response } from "express";
import { Booking, User, IUser } from "../models";
import { IRequest } from "src/server";

class BookingContoller {
  async store(req: IRequest, res: Response) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    const result = (booking.spot.user as any) as IUser;

    const ownerBooking = req.connectedUsers[result._id];

    if (ownerBooking) req.io.to(ownerBooking).emit("booking_request", booking);

    return res.json(booking);
  }
}

export default new BookingContoller();
