import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';
import { DynamoDBTokens } from './tokens';

export default {
  provide: DynamoDBTokens.DYNAMO_DB_CLIENT,
  useFactory: (configService: ConfigService) => {
    const region = configService.get<string>('AWS_REGION');
    const endpoint = configService.get<string>('DYNAMODB_ENDPOINT');
    return new DynamoDBClient({ region, endpoint });
  },
  inject: [ConfigService],
};
