import { Module } from '@nestjs/common';
import dynamodbProvider from './dynamodb.provider';
import dynamodbdocumentProvider from './dynamodbdocument.provider';
@Module({
  exports: [dynamodbProvider, dynamodbdocumentProvider],
  providers: [dynamodbProvider, dynamodbdocumentProvider],
})
export class SyncModule {}
