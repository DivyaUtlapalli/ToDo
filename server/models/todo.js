const con = require("./db_connect");

async function createTable(){
  let sql = `CREATE TABLE IF NOT EXISTS todo(
    textareaValue varchar(1000)
      
    )`;
    await con.query(sql);
}
createTable();

async function addTodo(todo) {
  let sql = `
    INSERT INTO todo(textareaValue)
    VALUES("${todo.textareaValue}")
  `

  await con.query(sql)
  return true;
}

async function getAllTodos() {
  let sql = `SELECT * FROM todo`;

  return await con.query(sql);
}

module.exports = {addTodo,getAllTodos}
