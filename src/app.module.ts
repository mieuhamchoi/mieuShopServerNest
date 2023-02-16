import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './modules/catalog/catalog.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, CatalogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
