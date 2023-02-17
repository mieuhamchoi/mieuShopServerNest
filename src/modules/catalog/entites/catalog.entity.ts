import { Product } from 'src/modules/product/entites/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iconLink: string;

  @OneToMany(() => Product, product => product.catalog)
  @JoinColumn()
  public products: Product[];
}