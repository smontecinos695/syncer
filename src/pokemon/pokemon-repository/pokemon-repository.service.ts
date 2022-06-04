import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { DynamoDBTokens } from 'src/core/tokens';

@Injectable()
export class PokemonRepositoryService {
  constructor(
    @Inject(DynamoDBTokens.DYNAMO_DB_CLIENT)
    private ddbClient: DynamoDBClient,
    @Inject(DynamoDBTokens.DYNAMO_DB_DOCUMENT_CLIENT)
    private docClient: DynamoDBDocumentClient,
  ) {}

  public bulkUpsert<T>(docs: T[], sync: string) {
    const command = new BatchWriteCommand({
      RequestItems: {
        pokemons: docs
          .map((d) => ({ ...d, sync }))
          .map(this.convertToWriteStatement),
      },
    });

    return this.docClient.send(command);
  }

  public convertToWriteStatement<T>(d: T) {
    return {
      PutRequest: {
        Item: d,
      },
    };
  }

  public getPokemons(offset: number, limit: number) {
    const inputs = {
      TableName: 'pokemons', // give it your table name
      Select: 'ALL_ATTRIBUTES',
    };

    const scanCommand = new ScanCommand(inputs);
    return this.docClient.send(scanCommand);
  }
}
