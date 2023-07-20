/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.integer('userid').references('id').inTable('users').onDelete('cascade');
        table.string('itemname');
        table.string('description');
        table.integer('quantity');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return (
        knex.schema.dropTableIfExists('items')
    )
};
