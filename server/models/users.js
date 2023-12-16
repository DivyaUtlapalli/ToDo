// const users =[
//     {
//         "username":"Divya",
//         "password": "Abc@1234"
//     },
//     {
//         "username":"Divya22",
//         "password": "Abc@12340" 
//     },
//     {
//         "username":"DivyaU",
//         "password": "Abc@1234567" 
//     },
// ]
// exports.getAllUsers = ()=>{
//     return users;
// }

const con = require("./db_connect");

async function createTable(){
  let sql = `CREATE TABLE IF NOT EXISTS user(
   
      USER_ID INT NOT NULL AUTO_INCREMENT,
      FIRST_NAME VARCHAR(100),
      LAST_NAME VARCHAR(100),
      EMAIL_ID VARCHAR(100) NOT NULL,
      PASSWORD VARCHAR(100) NOT NULL,
      PRIMARY KEY (USER_ID)
    
    )`;
    await con.query(sql);
}
createTable();
async function login(user) {
    let userResult = await getUser(user.EMAIL_ID)
    if(!userResult[0]) throw Error("EMAIL_ID not found!!")
    if(userResult[0].PASSWORD != user.PASSWORD) throw Error("Password Incorrect!!")
  
    return userResult[0]
  }
  
  // Register (Create) New User
  async function register(user) {
    let userResult = await getUser(user.EMAIL_ID)
    if(userResult.length > 0) throw Error("EMAIL_ID already in use!!")
  
    // let sql = `
    //   INSERT INTO user(USER_ID, FIRST_NAME,LAST_NAME, EMAIL_ID,PASSWORD)
    //   VALUES("${user.USER_ID}", "${user.FIRST_NAME}",  "${user.LAST_NAME}", "${user.EMAIL_ID}", "${user.PASSWORD}")
    // `
    let sql = `
    INSERT INTO user( FIRST_NAME,LAST_NAME, EMAIL_ID,PASSWORD)
    VALUES("${user.FIRST_NAME}",  "${user.LAST_NAME}", "${user.EMAIL_ID}", "${user.PASSWORD}")
  `
  
    await con.query(sql)
    const newUser = await getUser(user.EMAIL_ID)
    return newUser[0]
  }
  
  // Update - CRUD
  async function editUser(user) {
    let updatedUser = await getUser(user.EMAIL_ID)
    if(updatedUser.length > 0) throw Error("Userid not available!")
  
    let sql = `UPDATE user
      SET FIRST_NAME = "${user.FIRST_NAME}"
      WHERE EMAIL_ID = ${user.EMAIL_ID}
    `
    await con.query(sql)
    updatedUser = await getUser(user.EMAIL_ID)
    return updatedUser[0]
  }
  
  // Delete User 
  async function deleteUser(user) {
    let sql = `DELETE FROM user
      WHERE EMAIL_ID = ${user.EMAIL_ID}
    `
    await con.query(sql)
  }
  
  // Useful functions
  async function getUser(user_id) {
    let sql = `
      SELECT * FROM user
      WHERE EMAIL_ID = "${user_id}" 
    `
    return await con.query(sql)
  }
  
  module.exports = {login, register, editUser, deleteUser}