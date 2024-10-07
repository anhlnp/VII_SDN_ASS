const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const quizRoutes = require('./resources/routes/quizzes');
const questionRoutes = require('./resources/routes/question');

const port = process.env.PORT;

const app = express();

const allowedOrigins = [process.env.REACT_APP_SERVER_URL];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error('Not allowed by CORS')); // Origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  credentials: true,
};

// Use the `corsOptions` for CORS middleware
app.use(cors(corsOptions));
// Handle preflight requests with the same `corsOptions`
app.options('*', cors(corsOptions));


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
