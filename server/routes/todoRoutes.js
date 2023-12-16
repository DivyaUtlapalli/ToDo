const express =require('express')
const Todo=require('../models/todo')
const router =express.Router()

   //login post
  router.post('/addTodo', async (req, res) => {
    try {
      const todo = await Todo.addTodo(req.body)
      res.send({success:"Todo added succcessfully!!!"})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })
  // GET all todos
router.get('/getAllTodos', async (req, res) => {
    try {
      const todos = await Todo.getAllTodos(); // Use your model method to get all todos
      res.send(todos);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
module.exports = router;