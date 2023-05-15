const express = require('express');
const router = express.Router();
let todos = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Study',
    completed: true,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Solve the tasks',
    completed: false,
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Submit the tasks',
    completed: false,
  },
];
function validateId(req, res, next) {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === todoId);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found.' });
  }
  next();
}

function validateTitleAndDescription(req, res, next) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Task title and description are required.' });
  }
  next();
}

router.get('/todos', (req, res) => {
  // Implement pagination if provided
  const limit = parseInt(req.query.limit) || todos.length;
  const skip = parseInt(req.query.skip) || 0;
  // Get the paginated todos
  const paginatedTodos = todos.slice(skip, skip + limit);
  // Return the paginated todos
  res.status(200).json(paginatedTodos);
});

router.get('/todos/:id', validateId, (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === todoId);
  res.status(200).json(todo);
});
router.delete('/todos/:id', validateId, (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== todoId);
  res.status(204).end();
});
router.post('/todos', validateTitleAndDescription, (req, res) => {
  const { title, description ,completed } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title: title,
    description: description,
    completed: completed,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
router.put('/todos/:id', validateId, validateTitleAndDescription, (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, description } = req.body;
  const updatedTodo = todos.find(todo => todo.id === todoId);
  updatedTodo.title = title;
  updatedTodo.description = description;
  res.status(200).json(updatedTodo);
});
module.exports = router;