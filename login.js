

function register(event){

  event.preventDefault();

  let username= document.getElementById("username").value;
  let password= document.getElementById("password").value;

let formData = {
  
  username :username,
  password: password
};
console.log(formData);

};
document.addEventListener('DOMContentLoaded',function(){
  const loginpage = document.getElementById('loginpage');
  loginpage.addEventListener('submit', register); 
});