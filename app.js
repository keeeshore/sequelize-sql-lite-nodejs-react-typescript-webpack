const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./connection')
const indexRouter = require('./routes/index');
const tradesRouter = require('./routes/trades');
const port = 3000;

const app = express();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.use(express.static('dist'));
// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/trades', tradesRouter);
app.use('/', indexRouter);

module.exports = app;
