const { Pool } = require("pg"); // connection pool

// establish a pool of connections that we can use to talk to the database
const config = {
  dev: {
    database: 'goodfoodhunting',
  },
  prod: {
    connectionString: process.env.DATABASE_URL,
  },
}

module.exports = new Pool(process.env.DATABASE_URL ? config.prod : config.dev);