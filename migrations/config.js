/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('../lib/app');
const env = process.env.NODE_ENV || 'development';
const dialect = 'postgres';

module.exports = {
  [env]: {
    dialect,
    url: app.default.get(dialect),
    migrationStorageTableName: '_migrations'
  }
};