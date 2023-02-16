import { DataSource } from 'typeorm';
import { Catalog } from './entites/catalog.entity';


export const catalogProviders = [
  {
    provide: 'CATALOG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Catalog),
    inject: ['DATA_SOURCE'],
  },
];