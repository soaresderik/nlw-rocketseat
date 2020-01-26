import { Request, Response } from "express";
import { User } from "../models";

class SessionController {
  async store(req: Request, res: Response) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) user = await User.create({ email });

    return res.json(user);
  }
}

export default new SessionController();
