const mongoose = require('mongoose');

const lebensmittelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    istAbzugeben: Boolean,
    reserviertVon: String,
    protein: Number,
    fett: Number,
    kohlenhydrate: Number,
    kcal: Number
});

module.exports = mongoose.model('Lebensmittel', lebensmittelSchema);