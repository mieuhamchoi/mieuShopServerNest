import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { catalogProviders } from './catalog.providers';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...catalogProviders,
    CatalogService,
  ],
  controllers: [CatalogController],
})
export class CatalogModule {}