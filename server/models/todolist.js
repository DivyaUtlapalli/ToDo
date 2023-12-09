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