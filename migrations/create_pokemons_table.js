const {
  CreateTableCommand,
  DeleteTableCommand,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@aws-sdk/client-dynamodb');

/**
 * @typedef { import('@aws-sdk/client-dynamodb').DynamoDBClient } DynamoDBClient
 */

const tableName = 'pokemons';

/**
 * @param {DynamoDBClient} ddbClient
 */
function up(ddbClient) {
  const input = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'N',
      },
      {
        AttributeName: 'sync',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'sync',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    StreamSpecification: {
      StreamEnabled: false,
    },
    TableName: tableName,
  };
  return ddbClient.send(new CreateTableCommand(input));
}

/**
 * @param {DynamoDBClient} ddbClient
 */
function down(ddbClient) {
  const input = {
    TableName: tableName,
  };
  return ddbClient.send(new DeleteTableCommand(input));
}

module.exports = {
  up,
  down,
};
