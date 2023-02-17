import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entites/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({
            where: {
                id: id,
            }
        })
    }

    async findByCatalogId(catalogId: number): Promise<Product[]> {
        return this.productRepository.find({
            where: {
                catalogId: catalogId,
            }
        })
    }

    async create(product: Product): Promise<Product> {
        return this.productRepository.save(product)
    }

    async update(product: Product): Promise<Product> {
        let result = await this.productRepository.createQueryBuilder().update(Product).set(product).where("id = :id", {id: product.id}).execute();
        if (result.affected != 0) {
           return await this.productRepository.findOne({
             where: {
                 id: product.id,
             }
           })
        }
        return Promise.reject('Update error!')
    }

    async delete(id: number): Promise<boolean> {
        let result = await this.productRepository.createQueryBuilder()
                    .delete()
                    .from(Product)
                    .where("id = :id", { id: id })
                    .execute()
        if (result.affected != 0) {
          return true
        }
        return Promise.reject('Delete error!')
    }
}