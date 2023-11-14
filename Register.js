
function register(e){
    e.preventDefault();
    let firstName= document.getElementById("firstName").value;
    let lastName= document.getElementById("lastName").value;
    let email= document.getElementById("email").value;
    let password= document.getElementById("password").value;

let formData = {
    firstName: firstName,
    lastName:lastName,
    email :email,
    password: password
};
console.log(formData);

};
document.addEventListener('DOMContentLoaded',function(){
    let registerform = document.getElementById("registerform")
    registerform.addEventListener('submit', register); 
});
