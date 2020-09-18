const mongoose = require('mongoose');

const webmessengerSchema=mongoose.Schema({
    messege:String,
    fromName:String,
    toName:String,
    timestamp:{type : Date ,default : Date.now()} ,
    recieved:Boolean
});

module.exports =  mongoose.model('Messege',webmessengerSchema)