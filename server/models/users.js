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
   
      USER_ID INT NOT NULL,
      FIRST_NAME VARCHAR(100),
      LAST_NAME VARCHAR(100),
      EMAIL_ID INT NOT NULL,
      PASSWORD VARCHAR(100),
      DOB DATE,
      GENDER VARCHAR(100),
      PRIMARY KEY (USER_ID)
  
    )`;
    await con.query(sql);
}
createTable();
async function login(user) {
    let userResult = await getUser(user.username)
    if(!userResult[0]) throw Error("Username not found!!")
    if(userResult[0].Password != user.password) throw Error("Password Incorrect!!")
  
    return userResult[0]
  }
  
  // Register (Create) New User
  async function register(user) {
    let userResult = await getUser(user.username)
    if(userResult.length > 0) throw Error("Username already in use!!")
  
    let sql = `
      INSERT INTO users(UserName, Password, Email)
      VALUES("${user.username}", "${user.password}", "${user.email}")
    `
  
    await con.query(sql)
    const newUser = await getUser(user.username)
    return newUser[0]
  }
  
  // Update - CRUD
  async function editUser(user) {
    let updatedUser = await getUser(user.username)
    if(updatedUser.length > 0) throw Error("Username not available!")
  
    let sql = `UPDATE users
      SET UserName = "${user.username}"
      WHERE UserId = ${user.UserId}
    `
    await con.query(sql)
    updatedUser = await getUser(user.username)
    return updatedUser[0]
  }
  
  // Delete User 
  async function deleteUser(user) {
    let sql = `DELETE FROM users
      WHERE UserId = ${user.UserId}
    `
    await con.query(sql)
  }
  
  // Useful functions
  async function getUser(username) {
    let sql = `
      SELECT * FROM users 
      WHERE UserName = "${username}" 
    `
    return await con.query(sql)
  }
  
  module.exports = {login, register, editUser, deleteUser}