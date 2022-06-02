import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { SyncModuleTokens } from './tokens';

export default {
  provide: SyncModuleTokens.DYNAMO_DB_DOCUMENT_CLIENT,
  useFactory: (ddbClient: DynamoDBClient, configService: ConfigService) => {
    const config = configService.get('documentClientOptions');
    return DynamoDBDocumentClient.from(ddbClient, config);
  },
  inject: [SyncModuleTokens.DYNAMO_DB_CLIENT, ConfigService],
};
