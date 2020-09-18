const mongoose = require('mongoose');

const contacts = mongoose.Schema({
    name: {type: String,unique: true},
    phone: String,
    email: String,
    disabled: Boolean,
    online: Boolean,
    avatarImg: String
});

module.exports = mongoose.model('Contact', contacts)