import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SyncModule } from 'src/sync/sync.module';
import documentClientOptions from '../config/document-client-options';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [documentClientOptions],
    }),
    SyncModule,
  ],
  providers: [],
  exports: [SyncModule],
})
export class CoreModule {}
