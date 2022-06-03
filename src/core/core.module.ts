import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SyncModule } from 'src/sync/sync.module';
import documentClientOptions from '../config/document-client-options';
import dynamodbProvider from '../core/dynamodb.provider';
import dynamodbdocumentProvider from './dynamodbdocument.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [documentClientOptions],
    }),
    SyncModule,
  ],
  exports: [SyncModule, dynamodbProvider, dynamodbdocumentProvider],
  providers: [dynamodbProvider, dynamodbdocumentProvider],
})
export class CoreModule {}
