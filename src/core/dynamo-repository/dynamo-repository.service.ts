import { AttributeValue, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { ReflectionMapper } from '../mapper/reflection-mapper';
import { PaginatedResult } from '../models/paginated-result';

export abstract class DynamoRepositoryService<T> {
  public constructor(
    protected docClient: DynamoDBDocumentClient,
    private mapper: ReflectionMapper<T>,
  ) {}

  public getScanCommandInput(): ScanCommandInput {
    return {
      TableName: this.getResourceName(),
      Select: 'ALL_ATTRIBUTES',
    };
  }

  protected abstract getResourceName(): string;

  public async getAll(limit: number, offset?: number) {
    const inputs: ScanCommandInput = {
      ...this.getScanCommandInput(),
      Limit: limit,
    };

    if (offset) {
      inputs.ExclusiveStartKey = {
        id: { N: `${offset}` },
      };
    }

    const scanCommand = new ScanCommand(inputs);
    const response = await this.docClient.send(scanCommand);
    const items = response.Items.map((item) => this.mapper.map(item));

    return new PaginatedResult(
      items,
      response.Count,
      response.LastEvaluatedKey?.id?.N,
    );
  }

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

  public async getByAttribute<T>(
    name: string,
    val: string | number,
  ): Promise<T | null> {
    const isNumber = typeof val === 'number';
    let attributeValue: AttributeValue;

    if (isNumber) {
      attributeValue = { N: `${val}` };
    } else {
      attributeValue = { S: val };
    }

    const input = {
      ...this.getScanCommandInput(),
      ScanFilter: {
        [name]: {
          AttributeValueList: [attributeValue],
          ComparisonOperator: 'EQ',
        },
      },
    };

    const command = new ScanCommand(input);
    const response = await this.docClient.send(command);

    if (response?.Items?.length) {
      return this.mapper.map(response.Items[0]);
    }
    return null;
  }
}
