import { Module } from '@nestjs/common';
import dynamodbProvider from './dynamodb.provider';
import dynamodbdocumentProvider from './dynamodbdocument.provider';

@Module({
  providers: [dynamodbProvider, dynamodbdocumentProvider],
})
export class SyncModule {}
