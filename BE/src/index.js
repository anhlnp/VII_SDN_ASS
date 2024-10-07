const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const quizRoutes = require('./resources/routes/quizzes');
const questionRoutes = require('./resources/routes/question');

const port = process.env.PORT || 3000;

const app = express();

app.use(function (req, res, next) {
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_SERVER_URL);
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
// Pass to next layer of middleware
next();
    
});

app.use(cors(
//     {
// origin: process.env.REACT_APP_SERVER_URL,
// methods: ['GET', 'POST', 'PUT'],
// allowedHeaders: ['Content-Type', 'Authorization'],
// }
));
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
