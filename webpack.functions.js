const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'decimal.js': path.resolve(process.cwd(), 'node_modules/decimal.js/decimal.js'),
      'json-schema-faker': path.resolve(process.cwd(), 'node_modules/json-schema-faker/dist/bundle.umd.min.js'),
    }
  }
};
