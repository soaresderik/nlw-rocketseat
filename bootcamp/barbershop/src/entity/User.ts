import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert
} from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "bool", nullable: false, default: false })
  provider: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  private async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async updatePassword(password: string) {
    const hash = await bcrypt.hash(password, 8);

    return hash;
  }
}
