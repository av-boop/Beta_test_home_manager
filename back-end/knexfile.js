// /**
//  * Knex configuration file.
//  *
//  * You will not need to make changes to this file.
//  */

// require('dotenv').config({path: './'});
// const path = require("path");

// const {
//   DATABASE_URL = "postgresql://postgres@localhost/postgres",
//   DEBUG,
// } = process.env;

// module.exports = {
//   development: {
//     client: "postgresql",
//     pool: { min: 1, max: 5 },
//     connection: DATABASE_URL,
//     migrations: {
//       directory: path.join(__dirname, "src", "db", "migrations"),
//     },
//     seeds: {
//       directory: path.join(__dirname, "src", "db", "seeds"),
//     },
//     debug: !!DEBUG,
//   },
//   production: {
//     client: "postgresql",
//     pool: { min: 1, max: 5 },
//     connection: DATABASE_URL,
//     migrations: {
//       directory: path.join(__dirname, "src", "db", "migrations"),
//     },
//     seeds: {
//       directory: path.join(__dirname, "src", "db", "seeds"),
//     },
//     debug: !!DEBUG,
//   },
// };

/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");
const { parse } = require("pg-connection-string");

const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DEBUG,
} = process.env;

// Parse the connection URL
const connectionOptions = parse(DATABASE_URL);

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: connectionOptions,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: connectionOptions,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: connectionOptions,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};