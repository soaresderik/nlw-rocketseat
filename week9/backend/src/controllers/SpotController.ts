import { Response, Request } from "express";
import { Spot, User } from "../models";

class SpotController {
  async index(req: Request, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  }

  async store(req: Request, res: Response) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) return res.status(400).json({ error: "User does not exist!" });

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(",").map(tech => tech.trim()),
      price
    });

    return res.json(spot);
  }
}

export default new SpotController();
