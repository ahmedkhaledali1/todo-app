const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://ahmedkhaled01233:ahmed.hh@cluster0.z9bbx0d.mongodb.net/todos',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
const todoSchema = new mongoose.Schema({
  _id: String,
  title: String,
  comments: Array,
});

const Todo = mongoose.model('Todo', todoSchema);

const userSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);

app.post('/addTodo', async (req, res) => {
  const todo = new Todo({
    _id: generateID(),
    title: req.body.todo,
    comments: [],
  });
  await todo.save();
  res.json(await Todo.find());
});

app.get('/retrieveComments/:id', async (req, res) => {
  const id = req.params.id;
  let result = await Todo.findById(id);
  let resultComments = result.comments;
  res.json(resultComments);
});

app.post('/addComment', async (req, res) => {
  const data = req.body;
  let result = await Todo.findById(data.todo_id);
  result.comments.unshift({
    id: generateID(),
    title: data.comment,
    user: data.user,
  });
  await result.save();
  res.json(result.comments);
});

app.delete('/deleteTodo/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete(id);
  res.json(await Todo.find());
});

app.get('/todos', async (req, res) => {
  res.json(await Todo.find());
});

app.post('/register', async (req, res) => {
  const user = new User({
    username: req.body.username,
  });
  await user.save();
  res.json(user);
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Invalid username' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
