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
}