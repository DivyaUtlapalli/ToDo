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