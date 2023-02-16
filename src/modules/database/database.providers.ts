import { DataSource } from 'typeorm';
import { Catalog } from '../catalog/entites/catalog.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'mieushopdb',
        entities: [
          Catalog
        ],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];