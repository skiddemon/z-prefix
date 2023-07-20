const bcrypt = require('bcrypt')
const saltRounds = 10

const hash = bcrypt.hashSync('admin', 10)

/**
 * @param { import("knex").Knex } knex
* @returns { Promise<void> } 
*/
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, firstname: 'test', lastname: 'user', username: 'admin', hash: hash },
  ]);
};
