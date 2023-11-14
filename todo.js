
function register(event){

    event.preventDefault();
    let textarea= document.getElementById("area").value;
   
  let formData = {
    
    textarea :textarea
  };
  console.log(formData);
  
  };
  document.addEventListener('DOMContentLoaded',function(){
    const addTodo = document.getElementById('addTodo');
    addTodo.addEventListener('submit', register); 
  });