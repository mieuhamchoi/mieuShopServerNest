import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './modules/catalog/catalog.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [DatabaseModule, CatalogModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
