const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const quizRoutes = require('./resources/routes/quizzes');
const questionRoutes = require('./resources/routes/question');

const app = express();
app.use(bodyParser.json());

app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

app.use('/',(req, res) => {
    res.send('This is HomePage!');
});



mongoose.connect('mongodb+srv://anhphucpro13:123456a@cluster0.r2atg.mongodb.net/SDN_ASS1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const port = process.env.RENDER_PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost'
app.listen((port, hostname) => {
    console.log(`Server running on port ${hostname}/${port}`);
});
