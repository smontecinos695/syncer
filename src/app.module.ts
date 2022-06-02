import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SyncModule } from './sync/sync.module';
import documentClientOptions from './config/document-client-options';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [documentClientOptions],
    }),
    SyncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
