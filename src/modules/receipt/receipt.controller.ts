import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ReceiptService } from './receipt.service';

@Controller('receipts')
export class ReceiptController {

    constructor(private receiptService: ReceiptService){}

    @Get()
    async findAll(@Res() response ) {
        try {
            const data = await this.receiptService.findAll();
            return response.status(200).json({
                statusCode: 200,
                message: "Get receipt list success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get('/:id')
    async findOne(@Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const data = await this.receiptService.findOne(id);
            return response.status(200).json({
                statusCode: 200,
                message: "Get receipt success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Post('create')
    async create(@Res() response, @Body() body) {
        try {
            const data = await this.receiptService.create(body);
            return response.status(200).json({
                statusCode: 200,
                message: "Create receipt success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Put('update')
    async update(@Res() response, @Body() body) {
        try {
            const data = await this.receiptService.update(body);
            return response.status(200).json({
                statusCode: 200,
                message: "Update receipt success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Delete('delete/:id')
    async delete(@Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            await this.receiptService.delete(id);
            return response.status(200).json({
                statusCode: 200,
                message: "Delete receipt success!"
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
