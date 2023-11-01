const parse = require("pg-connection-string").parse;
const config = parse(process.env.DEVELOPMENT_DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
  pool: {
    min: 2,
    max: 10,
  },
});
