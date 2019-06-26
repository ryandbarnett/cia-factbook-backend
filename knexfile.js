module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/facts',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
