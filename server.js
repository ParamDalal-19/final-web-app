const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./router.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Middleware to set the MIME type for JavaScript files
app.use('/public', (req, res, next) => {
  res.setHeader('Content-Type', 'text/javascript');
  next();
});

app.use('/api', indexRouter);

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
