'use strict';
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/portfolio_dev'
  },
  production: {
    client: 'pg',
    connection: 'postgres://vmelvajncdawfd:74ad71c575babb2e620076d8f8ecf98c10123f01510978b11680aa9fb32bb7c8@ec2-54-235-245-255.compute-1.amazonaws.com:5432/d70qtigse7l0tn'
  }
};
