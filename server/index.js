const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// Grabbing the models to use from mongoose
const User = require('./models/User');

// Initializing the express app
const app = express();

// Creating the variable for the port to start the server on
const PORT = process.env.PORT || 4444;

// Connecting to the mongoose database
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error('Error connecting to database: ', err));

// Initializing the middelware to use to express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
}

/**
 * Request for the users
 */

// Route to register the user to the database
app.post('/api/users/register', (req, res) => {
    // Storing the new user from the req.body;
    const user = new User(req.body);

    // Saving the user to the database
    user.save((err, doc) => {
        // If there is an error then we are sending back the error message
        if (err) return res.json({ success: false, err });

        // If no error then we are sending back the registered user
        res.status(200).json({ success: true, userData: doc });
    });
});

// Route to login the user from the database
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        // If there is an error we are sending back the error
        if (err) return res.json({ loginSuccess: false, err });

        // If there is no user then we need to let them know that the email was not found
        if (!user)
            return res.json({
                loginSuccess: false,
                message: 'Email not found'
            });

        // We need to compare the password that was entered to the one in the database
        user.comparePassword(password, (err, isMatch) => {
            // If there is an error we are returning the password error
            if (err) return res.json({ loginSuccess: false, err });

            // If the password doesn't match we need to tell the user the password is incorrect
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: 'Invalid Password'
                });

            // Generating the token for the user when logging in
            user.generateToken((err, user) => {
                // If there is an error we need to send a status of 400 and then send the error
                if (err) return res.status(400).send(err);

                /**
                 * If there is no error then we need to store the token as a cookie
                 * @param { name } string version of the name of the cookie ( this name can be whatever you want )
                 * @param { value } string version of the token that is being sent back from the user
                 */
                res.cookie('w_auth', user.token)
                    .status(200)
                    .json({ loginSuccess: true });
            });
        });
    });
});

// If we are in production mode then we will serve the index.html file that is made from the build directory
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/build/index.html'));
    });
}

// Starting the express server on the specified port
app.listen(PORT, (req, res) => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
