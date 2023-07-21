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
    {id: 3, userid: 1, itemname: 'testitem3', description: 'This is a test description for an item that still does not exist', quantity: 13},
    {id: 4, userid: 1, itemname: 'testitem4', description: 'This is my test description. There are many like it, but this one is mine.  My test description is my best friend. It is my life. I must master it as I must master my life.', quantity: 106},
    {id: 5, userid: 1, itemname: 'testitem5', description: 'This is my test description. There are many like it, but this one is mine.  My test description is my best friend. It is my life. I must master it as I must master my life.', quantity: 45},
    {id: 6, userid: 2, itemname: 'testitem6', description: 'This is a test description for an item that still does not exist', quantity: 67},
    {id: 7, userid: 2, itemname: 'testitem7', description: 'This is my test description. There are many like it, but this one is mine.  My test description is my best friend. It is my life. I must master it as I must master my life.', quantity: 7},
    {id: 8, userid: 3, itemname: 'testitem8', description: 'This is my test description. There are many like it, but this one is mine.  My test description is my best friend. It is my life. I must master it as I must master my life.', quantity: 34},
    {id: 9, userid: 3, itemname: 'testitem9', description: 'This is a test description for an item that still does not exist', quantity: 13},
    {id: 10, userid: 3, itemname: 'testitem10', description: 'This is a test description for an item that does not exist', quantity: 117},
    {id: 11, userid: 3, itemname: 'testitem11', description: 'This is a test description for an item that also does not exist', quantity: 464},
    {id: 12, userid: 3, itemname: 'testitem12', description: 'This is a test description for an item that still does not exist', quantity: 8}
  ]);
};
