const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WoodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    }
});

module.exports = mongoose.model('Wood', WoodSchema);
