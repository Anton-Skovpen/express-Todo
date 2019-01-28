const express = require('express');
const router = express.Router();
const Todo = require('../database/models/todo');

router.get('/', async (req, res) => {
  const result = await Todo.find({});
  const todos = result.filter((el) => !el.isDone);
  const doneTodos = result.filter((el) => el.isDone);

  res.render('index', {
    todos,
    doneTodos
  });
})

router.post('/todos', async (req, res) => {
  let newTodo = new Todo({
    description: req.body.description,
  })
  try {
    const result = await newTodo.save();
    res.redirect('/', );
    console.log(result)
  } catch (err) {
    console.error(err)
    res.redirect('/', );
  }
});

router.post('/todos/:id/completed', async (req, res) => {
  const todoId = req.params.id;
  try {
    Todo.findById(todoId)
      .exec()
      .then((result) => {
        result.isDone = !result.isDone
        console.error('result', result.isDone)
        return result.save();
      })
      .then((result) => {
        res.redirect('/', );
      })
  } catch (err) {
    console.error(err)
  }
});


module.exports = router;


