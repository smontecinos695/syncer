import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { DynamoDBTokens } from './tokens';

export default {
  provide: DynamoDBTokens.DYNAMO_DB_DOCUMENT_CLIENT,
  useFactory: (ddbClient: DynamoDBClient, configService: ConfigService) => {
    const config = configService.get('documentClientOptions');
    return DynamoDBDocumentClient.from(ddbClient, config);
  },
  inject: [DynamoDBTokens.DYNAMO_DB_CLIENT, ConfigService],
};
