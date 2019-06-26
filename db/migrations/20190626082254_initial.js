
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('countries', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('capital');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('resources', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('country-resources', (table) => {
      table.increments('id').primary();
      table.integer('country_id').unsigned()
      table.foreign('country_id')
        .references('countries.id');
      table.integer('resource_id').unsigned()
      table.foreign('resource_id')
        .references('resources.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('country-resources'),
    knex.schema.dropTable('resources'),
    knex.schema.dropTable('countries')
  ])
};
