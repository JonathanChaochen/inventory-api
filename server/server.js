const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');

const inventoryRouter = require('./routes/inventory');

const app = express();

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', inventoryRouter);

app.listen(5000, () => {
  console.log('Started on port 5000');
});

module.exports = { app };