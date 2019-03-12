const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuitarSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000
        },
        price: {
            type: Number,
            required: true,
            maxlength: 255
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true
        },
        shipping: {
            type: Boolean,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        },
        wood: {
            type: Schema.Types.ObjectId,
            ref: 'Wood',
            required: true
        },
        frets: {
            type: Number,
            required: true
        },
        sold: {
            type: Number,
            maxlength: 10000,
            default: 0
        },
        publish: {
            type: Boolean,
            required: true
        },
        publish: {
            type: Boolean,
            required: true
        },
        images: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Guitar', GuitarSchema);
