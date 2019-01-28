const express = require('express');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const config = require('./database/DB');
const routes = require('./routes');
mongoose.Promise = global.Promise;
const PORT = 4200;

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  function () { console.log('Database is connected'); },
  err => {
    console.log('Can not connect to the database' + err);
  });;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes)

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null; //что бы вьхи менялись без перегрузки сервера;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.listen(PORT, function () {
  console.log('Server is running on Port: ', PORT);
});