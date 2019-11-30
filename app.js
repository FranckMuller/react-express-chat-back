const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./routes/auth');
const messageRouter = require('./routes/message');
const userRouter = require('./routes/user');

dotenv.config();

const app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(cors());

app.use(authRouter);
app.use(messageRouter);
app.use(userRouter);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database connected');
});

mongoose.connection.on('error', error => {
  console.log(`Database disconnected, error: ${error.message}`);
});

app.listen(process.env.PORT, () => {
  console.log(`application listening on ${process.env.PORT} port`);
});
