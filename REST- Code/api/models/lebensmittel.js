const mongoose = require('mongoose');

const lebensmittelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    name: {type: String, required: true},
    istAbzugeben: Boolean,
    reserviertVon: String,
    protein: { type: Number, default: 0 },
    fett: { type: Number, default: 0 },
    kohlenhydrate: { type: Number, default: 0 },
    kcal: { type: Number, default: 0 }
});

module.exports = mongoose.model('Lebensmittel', lebensmittelSchema);