const con = require("./db_connect");

async function createTable(){
  let sql = `CREATE TABLE IF NOT EXISTS TODO(
      TODO_ID INT NOT NULL,
      LIST_ID INT NOT NULL,
      TASK_NAME VARCHAR(100),
      DESCRIPTION VARCHAR(100),
      USER_ID INT NOT NULL,
      PRIORITY VARCHAR(100),
      STATUS VARCHAR(100),
      DUE_DATE DATE,
      PRIMARY KEY (TODO_ID)
  
    )`;
    await con.query(sql);
}
createTable();

// add todos
async function addTodo(newTodo) {
  let sql = `
    INSERT INTO todo(TODO_ID, LIST_ID,TASK_NAME,DESCRIPTION,USER_ID,PRIORITY,STATUS,DUE_DATE)
    VALUES("${newTodo.TODO_ID}", "${newTodo.LIST_ID}","${newTodo.TASK_NAME}","${newTodo.DESCRIPTION}","${newTodo.USER_ID}",
    "${newTodo.PRIORITY}","${newTodo.STATUS}","${newTodo.DUE_DATE}")
  `

  await con.query(sql)
  return true;
}

// Update - CRUD
async function editTodo(newTodo) {
  let updatedTodo = await getTodoById(user.user_id)
  if(updatedTodo.length < 0) throw Error("Userid not available!")

  let sql = `UPDATE todo
    SET Description = "${newTodo.Description}"
    WHERE Todo_Id = ${newTodo.Todo_Id}
  `
  await con.query(sql)
  updatedTodo = await getTodoById(user.user_id)
  return updatedTodo[0]
}

// Delete User 
async function deleteTodo(todo) {
  let sql = `DELETE FROM todo
    WHERE Todo_Id = ${todo.Todo_Id}
  `
  await con.query(sql)
}

// Useful functions
async function getTodoById(todo_Id) {
  let sql = `
    SELECT * FROM todos
    WHERE Todo_Id = "${todo_Id}" 
  `
  return await con.query(sql)
}

async function getTodoByUserId(user_Id){
    let sql= `SELECT * FROM todo WHERE User_ID=${user_Id}`

    return await con.query(sql)
}

module.exports = {addTodo, deleteTodo, editTodo, getTodoByUserId}