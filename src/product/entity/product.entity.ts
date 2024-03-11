import { User } from 'src/user/entity/uesr.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum ProductStatus {
  AVAILABLE = 'available', // 판매중
  OUTOFSTOCK = 'out-of-stock', // 품절
  DISCONTINUED = 'discontinued', // 판매중지
}

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @Column()
  status: ProductStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.products)
  seller: User;
}
