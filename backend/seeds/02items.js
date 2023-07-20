/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, userid: 1, itemname: 'testitem1', description: 'This is a test description for an item that does not exist', quantity: 10},
    {id: 2, userid: 1, itemname: 'testitem2', description: 'This is a test description for an item that also does not exist', quantity: 100},
    {id: 3, userid: 1, itemname: 'testitem3', description: 'This is a test description for an item that still does not exist', quantity: 13}
  ]);
};
