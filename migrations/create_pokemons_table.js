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
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 10000,
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
