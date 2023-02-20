import { Body, Controller, DefaultValuePipe, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Product } from './entites/product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){}

    @Get()
    async findAll(@Res() response, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1
    , @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10): Promise<Pagination<Product>> {
        try {
            limit = limit > 100 ? 100 : limit;
            //const data = await this.productService.findAll();
            const data = await this.productService.paginate({
                page,
                limit,
                route: 'http://localhost:3000/products',
              });
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
