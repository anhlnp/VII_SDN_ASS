const express = require('express');
const mongoose = require('mongoose');
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
