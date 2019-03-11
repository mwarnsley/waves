const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
require('dotenv').config({ path: '../../.env' });

// Creating the Users Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

// Hash the password so if someone has access to database it can't be seen
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    });
});

// Need to compare the passwords when the user is trying to login
UserSchema.methods.comparePassword = function(userPassword, callback) {
    bcrypt.compare(userPassword, this.password, function(err, isMatch) {
        // If there is an error then we are passing the error to the callback
        if (err) return callback(err);

        // We are passing the isMatch to the callback letting the server know if there is a match or not in passwords
        callback(null, isMatch);
    });
};

// Need to generate the user token when they are authenticated
UserSchema.methods.generateToken = function(callback) {
    const user = this;
    /**
     * Signing the JWT token to give to the user
     * @param { user._id } string ID of the user in the database
     * @param { SECRET } string Secret supplied in the .env files as a secret for no one else to know
     */
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save(function(err, user) {
        // If there is an error saving the token then we pass the error back
        if (err) return callback(err);

        // If there is not an error saving the token then we pass back the user
        callback(null, user);
    });
};

/**
 * Need to add a method to find the user by their token if there is one
 * We use statics because it is a custom defined method by us
 */
UserSchema.statics.findByToken = function(token, callback) {
    const user = this;

    /**
     * Verifying that the token is correct
     * @param { token } string version of the token being passed in
     * @param { SECRET } string version of our secret that is not present to anyone else
     * Callback function gives an error or the decoded token
     */
    jwt.verify(token, process.env.SECRET, function(err, decode) {
        // Finding the user by the decoded id and the token
        user.findOne({ _id: decode, token: token }, function(err, user) {
            // If there is no error then we need to return the rror
            if (err) return callback(err);

            // If there is a user, we will return the user that was found
            callback(null, user);
        });
    });
};

// Exporting the Users Sceham as a mongoose model
module.exports = mongoose.model('User', UserSchema);
