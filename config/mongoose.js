const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost:27017/test');

// acquire connection to check whether connection is succesful or not
const db= mongoose.connection;

db.on('error',console.error.bind(console,'error in conneting to db'));

db.once('open',function(){
    console.log("Succesfully connected to db");
})

module.exports= db;