import { Response } from "express";
import { IRequest } from "../server";
import { Booking, IUser } from "../models";

class RejectionController {
  async store(req: IRequest, res: Response) {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate("spot");

    booking.approved = false;

    await booking.save();

    const result = (booking.user as any) as IUser;

    const userSocket = req.connectedUsers[result._id];

    if (userSocket) req.io.to(userSocket).emit("booking_response", booking);

    return res.json(booking);
  }
}

export default new RejectionController();
