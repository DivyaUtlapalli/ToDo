// const todolist =[
//     {
//         "listid":"1",
//         "userid": "Abc@1234",
//         "listname":"lista",
//         "createdate":"12/12/23"
//     },
//     {
//         "listid":"2",
//         "userid": "Abc@1234",
//         "listname":"listb",
//         "createdate":"12/12/23"
//     },
//     {
//         "listid":"3",
//         "userid": "Abc@1234",
//         "listname":"listc",
//         "createdate":"12/12/23"
//     },
// ]
// exports.getAllUsers = ()=>{
//     return todolist;
// }
const con = require("./db_connect");

async function createTable(){
  let sql = `CREATE TABLE IF NOT EXISTS TODOLIST(
   
      LIST_ID INT NOT NULL,
      USER_ID INT NOT NULL,
      LIST_NAME VARCHAR(100),
      CREATED_DATE DATE,
      UPDATED DATE,
      PRIMARY KEY (LIST_ID)
  
    )`;
    await con.query(sql);
}
createTable();

// add todos
async function addTodoList(newTodoList) {
  let sql = `
    INSERT INTO todolist( LIST_ID,USER_ID,LIST_NAME,CREATED_DATE,UPDATED)
    VALUES("${newTodoList.LIST_ID}", "${newTodoList.USER_ID}","${newTodoList.LIST_NAME}","${newTodoList.CREATED_DATE}","${newTodoList.UPDATED}")
  `

  await con.query(sql)
  return true;
}

// Update - CRUD
async function editTodoList(newTodoList) {
  let updatedTodoList = await getTodoById(todolist.list_id)
  if(updatedTodoList.length < 0) throw Error("list_id not available!")

  let sql = `UPDATE todoList
    SET LIST_NAME = "${newTodoList.LIST_NAME}"
    WHERE list_Id = ${newTodoList.list_Id}
  `
  await con.query(sql)
  updatedTodoList = await getTodoById(todolist.list_id)
  return updatedTodoList[0]
}

// Delete User 
async function deleteTodoList(todolist) {
  let sql = `DELETE FROM todolist
    WHERE list_Id = ${todolist.list_Id}
  `
  await con.query(sql)
}

// Useful functions
async function getTodoById(list_Id) {
  let sql = `
    SELECT * FROM todo
    WHERE list_Id = "${list_Id}" 
  `
  return await con.query(sql)
}

async function getTodoByListId(list_Id){
    let sql= `SELECT * FROM todo WHERE list_ID=${list_Id}`

    return await con.query(sql)
}

module.exports = {addTodoList, deleteTodoList, editTodoList, getTodoByListId}