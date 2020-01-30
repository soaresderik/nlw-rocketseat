import { EntityRepository, Repository, getRepository } from "typeorm";
import NotFoundException from "../exceptions/NotFoundException";
import Appointment from "../../entity/Appointment";

@EntityRepository(Appointment)
export class AppointmentRepository {
  constructor(private _db = getRepository(Appointment)) {}

  async findAppointmentsByUserId(userId: number, offset, limit = 20) {
    const appointments = await this._db
      .createQueryBuilder("appoint")
      .leftJoinAndSelect("appoint.provider", "provider")
      .leftJoinAndSelect("provider.avatar", "avatar")
      .select([
        "appoint.id",
        "appoint.date",
        "provider.id",
        "provider.name",
        "avatar.id",
        "avatar.path"
      ])
      .where("appoint.userId = :userId", { userId })
      .orderBy("appoint.createdAt", "DESC")
      .offset(offset)
      .limit(limit)
      .getMany();

    return appointments;
  }
}
