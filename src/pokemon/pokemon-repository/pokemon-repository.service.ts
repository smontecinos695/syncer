import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { DynamoRepositoryService } from 'src/core/dynamo-repository/dynamo-repository.service';
import { DynamodbMapperService } from 'src/core/dynamodb-mapper/dynamodb-mapper.service';
import { DynamoDBTokens } from 'src/core/tokens';
import { Pokemon } from '../models/pokemon';

@Injectable()
export class PokemonRepositoryService extends DynamoRepositoryService<Pokemon> {
  public getResourceName(): string {
    return `pokemons`;
  }

  constructor(
    @Inject(DynamoDBTokens.DYNAMO_DB_DOCUMENT_CLIENT)
    docClient: DynamoDBDocumentClient,
  ) {
    super(docClient, new DynamodbMapperService(Pokemon));
  }
}
