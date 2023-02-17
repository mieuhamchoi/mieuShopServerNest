import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){}

    @Get()
    async findAll(@Res() response ) {
        try {
            const data = await this.productService.findAll();
            return response.status(200).json({
                statusCode: 200,
                message: "Get product list success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get('/:id')
    async findOne(@Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const data = await this.productService.findOne(id);
            return response.status(200).json({
                statusCode: 200,
                message: "Get product list success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get('by-catalog/:catalogId')
    async findByCatalogId(@Res() response, @Param('catalogId', ParseIntPipe) catalogId: number) {
        try {
            const data = await this.productService.findByCatalogId(catalogId);
            return response.status(200).json({
                statusCode: 200,
                message: "Get product list success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Post('create')
    async create(@Res() response, @Body() body) {
        try {
            const data = await this.productService.create(body);
            return response.status(200).json({
                statusCode: 200,
                message: "Create success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Put('update')
    async update(@Res() response, @Body() body) {
        try {
            const data = await this.productService.update(body);
            return response.status(200).json({
                statusCode: 200,
                message: "Update product success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Delete('delete/:id')
    async delete(@Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            await this.productService.delete(id);
            return response.status(200).json({
                statusCode: 200,
                message: "Delete product success!"
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
