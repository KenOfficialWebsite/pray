const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mainRouter = require('./routes/routes');
const apiRouter = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('src'));

app.use('/', mainRouter);
app.use('/', apiRouter);

app.listen(3000, () => {
  console.log('server started');
});