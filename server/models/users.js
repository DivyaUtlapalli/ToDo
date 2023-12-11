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
    let userResult = await getUser(user.user_id)
    if(!userResult[0]) throw Error("Userid not found!!")
    if(userResult[0].Password != user.password) throw Error("Password Incorrect!!")
  
    return userResult[0]
  }
  
  // Register (Create) New User
  async function register(user) {
    let userResult = await getUser(user.userid)
    if(userResult.length > 0) throw Error("Userid already in use!!")
  
    let sql = `
      INSERT INTO user(USER_ID, FIRST_NAME,LAST_NAME, EMAIL_ID,PASSWORD,DOB,GENDER)
      VALUES("${user.user_id}", "${user.first_name}",  "${user.last_name}", "${user.email_id}", "${user.password}", "${user.dob}", "${user.gender}")
    `
  
    await con.query(sql)
    const newUser = await getUser(user.user_id)
    return newUser[0]
  }
  
  // Update - CRUD
  async function editUser(user) {
    let updatedUser = await getUser(user.user_id)
    if(updatedUser.length > 0) throw Error("Userid not available!")
  
    let sql = `UPDATE user
      SET first_Name = "${user.first_Name}"
      WHERE User_Id = ${user.UserId}
    `
    await con.query(sql)
    updatedUser = await getUser(user.user_id)
    return updatedUser[0]
  }
  
  // Delete User 
  async function deleteUser(user) {
    let sql = `DELETE FROM user
      WHERE User_Id = ${user.User_Id}
    `
    await con.query(sql)
  }
  
  // Useful functions
  async function getUser(user_id) {
    let sql = `
      SELECT * FROM user
      WHERE User_id = "${user_id}" 
    `
    return await con.query(sql)
  }
  
  module.exports = {login, register, editUser, deleteUser}