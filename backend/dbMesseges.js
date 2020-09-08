const mongoose = require('mongoose');

const webmessengerSchema=mongoose.Schema({
    messege:String,
    name:String,
    timestamp:String,
    recieved:Boolean
});

module.exports =  mongoose.model('messegecontents',webmessengerSchema)