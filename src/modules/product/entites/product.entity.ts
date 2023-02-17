import { Catalog } from 'src/modules/catalog/entites/catalog.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  catalogId: number;

  @ManyToOne(() => Catalog, catalog => catalog.products)
  @JoinColumn()
  catalog: Catalog

  @Column()
  name: string

  @Column()
  des: string

  @Column()
  price: number

  @Column()
  avatarLink: string

  @Column()
  brand: string
}