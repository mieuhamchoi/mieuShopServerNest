import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Catalog } from './entites/catalog.entity';


@Injectable()
export class CatalogService {
  constructor(
    @Inject('CATALOG_REPOSITORY')
    private catalogRepository: Repository<Catalog>,
  ) {}

  async findAll(): Promise<Catalog[]> {
    return this.catalogRepository.find();
  }

  async findOne(id: number): Promise<Catalog> {
    return this.catalogRepository.findOne({
        where: {
            id: id,
        }
    })
  }

  async create(catalog: Catalog): Promise<Catalog> {
    return this.catalogRepository.save(catalog)
  }

  async update(catalog: Catalog): Promise<Catalog> {
     let result = await this.catalogRepository.createQueryBuilder().update(Catalog).set(catalog).where("id = :id", {id: catalog.id}).execute();
     if (result.affected != 0) {
        return await this.catalogRepository.findOne({
          where: {
              id: catalog.id,
          }
        })
     }
     return Promise.reject('Update error!')
  }

  async delete(id: number): Promise<boolean> {
    let result = await this.catalogRepository.createQueryBuilder()
                .delete()
                .from(Catalog)
                .where("id = :id", { id: id })
                .execute()
    if (result.affected != 0) {
      return true
    }
    return Promise.reject('Delete error!')
  } 
}