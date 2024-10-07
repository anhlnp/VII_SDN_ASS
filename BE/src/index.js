const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const quizRoutes = require('./resources/routes/quizzes');
const questionRoutes = require('./resources/routes/question');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: process.env.REACT_APP_SERVER_URL, // Set this to your frontend URL
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  credentials: true, // Include credentials if necessary
}));

app.use(bodyParser.json());

app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

app.use('/',(req, res) => {
    res.send('This is HomePage!');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
