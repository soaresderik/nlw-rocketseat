import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity
} from "typeorm";
import User from "./User";

@Entity("appointments")
export default class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("timestamp")
  date: Date;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  providerId: number;

  @Column({ type: "timestamp", nullable: true })
  canceledAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.appointments
  )
  user: User;

  @ManyToOne(
    () => User,
    user => user.appointments
  )
  provider: User;
}
