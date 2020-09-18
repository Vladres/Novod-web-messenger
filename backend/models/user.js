const mongoose = require('mongoose');

// Get the Schema constructor
var Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        unique: true
    }, 
    phone: String,
    email: String,
    disabled: Boolean,
    online: Boolean,
    avatarImg: String,
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Contact",
        }
    ],
    messeges: [
        {
            type: Schema.Types.ObjectId,
            ref: "Messege"
        }
    ]
});

module.exports = mongoose.model('User', user)