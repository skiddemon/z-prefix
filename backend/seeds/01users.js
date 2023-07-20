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
    { id: 1, firstname: 'avery', lastname: 'johnson', username: 'user1', hash: hash },
    { id: 2, firstname: 'franklin', lastname: 'mendez', username: 'user2', hash: hash },
    { id: 3, firstname: 'edward', lastname: 'buck', username: 'user3', hash: hash }
  ]);
};
