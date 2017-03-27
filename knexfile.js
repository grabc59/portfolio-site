'use strict';
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/portfolio_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/portfolio_test'
  }
};
