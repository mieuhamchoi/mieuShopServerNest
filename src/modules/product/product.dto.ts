import { ApiProperty } from "@nestjs/swagger"

export class createDto {
    @ApiProperty({
        description: 'The catalog id of product',
        type: Number
    })
    catalogId: number

    @ApiProperty({
            description: 'The name of product',
            type: String
    })
    name: string

    @ApiProperty({
        description: 'The describe of product',
        type: String
    })
    des: string

    @ApiProperty({
        description: 'The price of product',
        minimum: 0,
        type: Number
    })
    price: number

    @ApiProperty({
        description: 'The avatar url of product',
        type: String
    })
    avatarLink: string

    @ApiProperty({
        description: 'The brand of product',
        type: String
    })
    @ApiProperty()
    brand: string
}

export class findAllDto {
    @ApiProperty({
        description: 'The id of product',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'The catalog id of product',
        type: Number
    })
    catalogId: number

    @ApiProperty({
            description: 'The name of product',
            type: String
    })
    name: string

    @ApiProperty({
        description: 'The describe of product',
        type: String
    })
    des: string

    @ApiProperty({
        description: 'The price of product',
        minimum: 0,
        type: Number
    })
    price: number

    @ApiProperty({
        description: 'The avatar url of product',
        type: String
    })
    avatarLink: string

    @ApiProperty({
        description: 'The brand of product',
        type: String
    })
    @ApiProperty()
    brand: string
}

export class findOne {
    @ApiProperty({
        description: 'The id of product',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'The catalog id of product',
        type: Number
    })
    catalogId: number

    @ApiProperty({
            description: 'The name of product',
            type: String
    })
    name: string

    @ApiProperty({
        description: 'The describe of product',
        type: String
    })
    des: string

    @ApiProperty({
        description: 'The price of product',
        minimum: 0,
        type: Number
    })
    price: number

    @ApiProperty({
        description: 'The avatar url of product',
        type: String
    })
    avatarLink: string

    @ApiProperty({
        description: 'The brand of product',
        type: String
    })
    @ApiProperty()
    brand: string
}

export class findByCatalogId {
    @ApiProperty({
        description: 'The id of product',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'The catalog id of product',
        type: Number
    })
    catalogId: number

    @ApiProperty({
            description: 'The name of product',
            type: String
    })
    name: string

    @ApiProperty({
        description: 'The describe of product',
        type: String
    })
    des: string

    @ApiProperty({
        description: 'The price of product',
        minimum: 0,
        type: Number
    })
    price: number

    @ApiProperty({
        description: 'The avatar url of product',
        type: String
    })
    avatarLink: string

    @ApiProperty({
        description: 'The brand of product',
        type: String
    })
    @ApiProperty()
    brand: string
}

export class update {
    @ApiProperty({
        description: 'The id of product',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'The catalog id of product',
        type: Number
    })
    catalogId: number

    @ApiProperty({
            description: 'The name of product',
            type: String
    })
    name: string

    @ApiProperty({
        description: 'The describe of product',
        type: String
    })
    des: string

    @ApiProperty({
        description: 'The price of product',
        minimum: 0,
        type: Number
    })
    price: number

    @ApiProperty({
        description: 'The avatar url of product',
        type: String
    })
    avatarLink: string

    @ApiProperty({
        description: 'The brand of product',
        type: String
    })
    @ApiProperty()
    brand: string
}

