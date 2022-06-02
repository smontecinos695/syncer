import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';
import { SyncModuleTokens } from './tokens';

export default {
  provide: SyncModuleTokens.DYNAMO_DB_CLIENT,
  useFactory: (configService: ConfigService) => {
    const region = configService.get<string>('AWS_REGION');
    const endpoint = configService.get<string>('DYNAMODB_ENDPOINT');
    return new DynamoDBClient({ region, endpoint });
  },
  inject: [ConfigService],
};
