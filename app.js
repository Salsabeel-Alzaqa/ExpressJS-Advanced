const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
// Parse JSON requests
app.use(express.json());

const todosRouter = require('./todos');
app.use(todosRouter);

// Handle not found routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`open http://localhost:${port}`);
});
