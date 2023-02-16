import { Controller, Get, InternalServerErrorException, Res } from '@nestjs/common';
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
                message: "Get catalog list succes!",
                data: data
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
