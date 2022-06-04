import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { DynamoDBTokens } from 'src/core/tokens';

@Injectable()
export class PokemonRepositoryService {
  constructor(
    @Inject(DynamoDBTokens.DYNAMO_DB_DOCUMENT_CLIENT)
    private doc: DynamoDBDocumentClient,
  ) {}

  public bulkUpsert<T>(doc: T[]) {
    return Promise.resolve();
  }
}
