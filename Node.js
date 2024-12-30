const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mock database for users
const users = [
  { email: 'test@example.com', password: 'password123' }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.send({ message: 'Login successful!', token: 'mockToken123' });
  } else {
    res.status(400).send({ message: 'Invalid credentials' });
  }
});

// Sign up endpoint (this would usually save user data to a database)
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.send({ message: 'Sign up successful!' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
