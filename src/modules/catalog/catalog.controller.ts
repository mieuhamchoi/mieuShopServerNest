import { Body, Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {

    constructor(private catalogService: CatalogService){}

    @Get('findAll')
    async findAll(@Res() response ) {
        try {
            const data = await this.catalogService.findAll();
            return response.status(200).json({
                statusCode: 200,
                message: "Get catalog list success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get('findOne/:id')
    async findOne(@Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const data = await this.catalogService.findOne(id);
            return response.status(200).json({
                statusCode: 200,
                message: "Get catalog list success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Post('create')
    async create(@Res() response, @Body() body) {
        try {
            const data = await this.catalogService.create(body);
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
            const data = await this.catalogService.update(body);
            return response.status(200).json({
                statusCode: 200,
                message: "Update success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @Get('delete/:id')
    async delete(@Res() response, @Param('id', ParseIntPipe) id: number) {
        try {
            const data = await this.catalogService.delete(id);
            return response.status(200).json({
                statusCode: 200,
                message: "Delete success!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
