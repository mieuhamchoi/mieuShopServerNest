import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { receiptProviders } from './receipt.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...receiptProviders, ReceiptService],
  controllers: [ReceiptController]
})
export class ReceiptModule {}
