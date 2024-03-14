import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./uesr.entity";

@Entity()
export class PointHistory {
  @PrimaryColumn()
  id: string;

  @Column()
  action: string;

  @Column()
  prev: number;

  @Column()
  current: number;

  @ManyToOne(() => User, (user) => user.pointHistories)
  @JoinColumn()
  user: User
}