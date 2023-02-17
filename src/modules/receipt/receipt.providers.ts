import { DataSource } from 'typeorm';
import { Receipt } from './entites/receipt.entity';


export const receiptProviders = [
  {
    provide: 'RECEIPT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Receipt),
    inject: ['DATA_SOURCE'],
  },
];