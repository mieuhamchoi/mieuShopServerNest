import { Body, Controller, DefaultValuePipe, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger/dist';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Product } from './entites/product.entity';
import { createDto, findAllDto, findByCatalogId, findOne, update } from './product.dto';
import { ProductService } from './product.service';
@ApiTags('products')
@Controller('products')
export class ProductController {

    constructor(private productService: ProductService){}

    @Get()
    @ApiQuery({
        name: "page",
        type: String,
        description: "A parameter. Optional",
        required: false
    })
    @ApiForbiddenResponse({ status: 400, description: 'Forbidden get product list'})
    @ApiCreatedResponse({
        description: 'get product list successfully.',
        type: [findAllDto],
    })
    async findAll(@Res() response,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe ) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('catalogid', new DefaultValuePipe(-1), ParseIntPipe) catalogid: number = -1,
    @Query('search', new DefaultValuePipe('')) search: string = '',
    @Query('isfilter', new DefaultValuePipe(false)) isfilter: string = "false",
    @Query('minprice', new DefaultValuePipe(0), ParseIntPipe) minprice: number = 0,
    @Query('maxprice', new DefaultValuePipe(1000000), ParseIntPipe) maxprice: number = 1000000
    ): Promise<Pagination<Product>> {
        try {
            // Case get by catalog id
            if (catalogid != -1) {
                let data = await this.productService.findByCatalogId({
                    page,
                    limit,
                    route: 'http://localhost:3000/products',
                }, catalogid);
                return response.status(200).json({
                    statusCode: 200,
                    message: "Result find product by catalog id",
                    data: data
                })
            }

            // Case filter by price
            if (isfilter == "true") {
                let data = await this.productService.filterByPrice({
                    page,
                    limit,
                    route: 'http://localhost:3000/products',
                }, minprice, maxprice);
                return response.status(200).json({
                    statusCode: 200,
                    message: "Filter product by price result!",
                    data: data
                })
            }

            // Case get all
            if (search === "") {
                let data = await this.productService.findAll({
                    page,
                    limit,
                    route: 'http://localhost:3000/products',
                });
                return response.status(200).json({
                    statusCode: 200,
                    message: "Get product list success!",
                    data: data
                })
            }
    
            // Case search
            let data = await this.productService.search({
                page,
                limit,
                route: 'http://localhost:3000/products',
            }, search);
            return response.status(200).json({
                statusCode: 200,
                message: "Result search!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get('/:id')
    @ApiForbiddenResponse({ status: 400, description: 'Forbidden get product by id'})
    @ApiCreatedResponse({
        description: 'Get product by id successfully.',
        type: findOne,
    })
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

    @Post('')
    @ApiBody({ type: [createDto] })
    @ApiForbiddenResponse({ status: 400, description: 'Forbidden Create Product'})
    @ApiCreatedResponse({
        description: 'Create product successfully.',
        type: createDto,
    })
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

    @Put('')
    @ApiBody({ type: [update] })
    @ApiForbiddenResponse({ status: 400, description: 'Forbidden Updated'})
    @ApiCreatedResponse({
        description: 'Updated successfully.',
        type: update,
    })
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

    @Delete('/:id')
    @ApiOkResponse({description: "Delele product successfully"})
    @ApiForbiddenResponse({ status: 400, description: 'Forbidden Updated'})
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
