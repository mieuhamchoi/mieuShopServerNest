import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Receipt } from './entites/receipt.entity';

@Injectable()
export class ReceiptService {
    constructor(
        @Inject('RECEIPT_REPOSITORY')
        private receiptRepository: Repository<Receipt>,
    ) {}

    async findAll(): Promise<Receipt[]> {
        return this.receiptRepository.find();
    }

    async findOne(id: number): Promise<Receipt> {
        return this.receiptRepository.findOne({
            where: {
                id: id,
            }
        })
    }

    async create(receipt: Receipt): Promise<Receipt> {
        return this.receiptRepository.save(receipt)
    }

    async update(receipt: Receipt): Promise<Receipt> {
        let result = await this.receiptRepository.createQueryBuilder().update(Receipt).set(receipt).where("id = :id", {id: receipt.id}).execute();
        if (result.affected != 0) {
           return await this.receiptRepository.findOne({
             where: {
                 id: receipt.id,
             }
           })
        }
        return Promise.reject('Update error!')
    }

    async delete(id: number): Promise<boolean> {
        let result = await this.receiptRepository.createQueryBuilder()
                    .delete()
                    .from(Receipt)
                    .where("id = :id", { id: id })
                    .execute()
        if (result.affected != 0) {
          return true
        }
        return Promise.reject('Delete error!')
    }
}