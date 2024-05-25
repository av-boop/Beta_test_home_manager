exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.text("title");
    table.text("description");
    table.date("due_date");
    table.string("importance", 10);
    table.integer("recurring");
    table
      .integer("assignee")
      .unsigned()
      .references("id")
      .inTable("household_members")
      .onDelete("CASCADE")
      .nullable();
    table.boolean("completed").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
