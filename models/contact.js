const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true // String,Number,Date,Boolean,Array,buffer .. this are data types we can take from user.
    },
    phone:{
        type:String,
        required: true
    }
})

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;