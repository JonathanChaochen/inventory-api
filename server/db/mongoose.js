const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Inventory';

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
mongoose.connect(url, (err, res) => {
  if (err) {
    console.log(`ERROR connecting to: ${url}  ${err}`);
  } else {
    console.log(`Succeeded connected to: ${url}`);
  }
});

module.exports = { mongoose };
