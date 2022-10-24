require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const subscribeRoute = require('./routes/subscribeRoute');

const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/user', userRoute);
app.use('/subscribe', subscribeRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port} \n\n\n\n`);
});
