import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entites/product.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) {}
    
    async findAll(options: IPaginationOptions): Promise<Pagination<Product>> {

        const queryBuilder = this.productRepository.createQueryBuilder("product");
        queryBuilder.orderBy("product.name", "ASC") // A-Z
        queryBuilder.getMany()
        
        return paginate<Product>(queryBuilder, options);
    }

    async search(options: IPaginationOptions, search: string): Promise<Pagination<Product>> {
        const escapedString = `%${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}%`;
        const queryBuilder = this.productRepository.createQueryBuilder("product");
        queryBuilder.where("product.name LIKE :name", { name: escapedString })
        queryBuilder.orderBy("product.name", "ASC") // A-Z
        queryBuilder.getMany()
        return paginate<Product>(queryBuilder, options);
    }

    async filterByPrice(options: IPaginationOptions, minPrice: number, maxPrice: number): Promise<Pagination<Product>> {
        const queryBuilder = this.productRepository.createQueryBuilder("product");
        queryBuilder.where("product.price >= :minPrice", { minPrice })
        queryBuilder.andWhere("product.price <= :maxPrice", { maxPrice })
        queryBuilder.orderBy("product.price", "ASC") //DESC giảm dần
        queryBuilder.getMany();
        return paginate<Product>(queryBuilder, options);
    }

    async findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({
            where: {
                id: id,
            }
        })
    }

    async findByCatalogId(options: IPaginationOptions, catalogId: number): Promise<Pagination<Product>> {
        const queryBuilder = this.productRepository.createQueryBuilder("product");
        queryBuilder.where("product.catalogId = :catalogId", { catalogId })
        queryBuilder.orderBy("product.name", "ASC") //DESC giảm dần
        queryBuilder.getMany();
        return paginate<Product>(queryBuilder, options);
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