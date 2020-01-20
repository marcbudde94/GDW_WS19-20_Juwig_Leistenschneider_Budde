const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    firstName: String,
    street: String,
    plz: Number,
    ort: String
});

module.exports = mongoose.model('User', userSchema);