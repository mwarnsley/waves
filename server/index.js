const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// Grabbing the models to use from mongoose
const User = require('./models/User');
const Brand = require('./models/Brand');
const Wood = require('./models/Wood');
const Guitar = require('./models/Guitar');

// Middelware
const authentication = require('./middleware/authentication');
const admin = require('./middleware/admin');

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

/***********************************
        Request for the guitars
        
 ***********************************/

// Route to post a new guitar
app.post('/api/product/guitar', authentication, admin, (req, res) => {
    const guitar = new Guitar(req.body);

    guitar.save((err, doc) => {
        // If there is an error we are sending back the error
        if (err) return res.json({ success: false, err });

        // If there is no error we send a status of 200 and the document
        res.status(200).json({ success: true, guitar: doc });
    });
});

// Route for getting all of the guitars
app.get('/api/product/guitars', (req, res) => {
    // Finding all of the guitars in the database
    Guitar.find({}, (err, guitars) => {
        // If there is an error we are sending back the error
        if (err) return res.json({ success: false, err });

        // If there is no error we send back all the guitars
        res.status(200).send(guitars);
    });
});

// Route for getting the guitars by one id or multiple ids
app.get('/api/product/guitar_by_id', (req, res) => {
    const type = req.query.type;
    let items = req.query.id;

    // If the type is an array of ids then we need to do some logic to get the ids
    if (type === 'array') {
        const ids = req.query.id.split(',');
        items = [];
        // Mapping through the items and setting it as an array of the ids from the database
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        });
    }

    /**
     * We either pass a single value or an array and find it using the $in notation for mongo and finding by _id
     * We are also populating the brand and wood from the ObjectId in the database
     */
    Guitar.find({ _id: { $in: items } })
        .populate('brand')
        .populate('wood')
        .exec((err, docs) => {
            // If there is an error we are sending back the error
            if (err) return res.json({ success: false, err });

            // If there is no error then we send a status of 200 and the docs of the guitars
            return res.status(200).send(docs);
        });
});

/***********************************
        Request for the woods
        
 ***********************************/

// Route for saving the wood
app.post('/api/product/wood', authentication, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        // If there is an error we are sending back the error
        if (err) return res.json({ success: false, err });

        // If there is no error we send a status of 200 and the document
        res.status(200).json({ success: true, wood: doc });
    });
});

// Route for getting all of the woods
app.get('/api/product/woods', (req, res) => {
    // Finding all of the woods in the database
    Wood.find({}, (err, woods) => {
        // If there is an error we are sending back the error
        if (err) return res.json({ success: false, err });

        // If there is no error we send back all the woods
        res.status(200).send(woods);
    });
});

/***********************************
        Request for the brands
        
 ***********************************/

// Route for saving the new brand
app.post('/api/product/brand', authentication, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        // If there is an error we are sending back the error
        if (err) return res.json({ success: false, err });

        // If there is no error we send back a status code of 200 and success true with the brand
        res.status(200).json({ success: true, brand: doc });
    });
});

// Route to get the brands
app.get('/api/product/brands', (req, res) => {
    // Fetching all of the brands
    Brand.find({}, (err, brands) => {
        // If there is an error we are sending back the error
        if (err) return res.status(400).json({ success: false, err });

        // If there is no error we send a status of 200 and send back all the brands
        res.status(200).send(brands);
    });
});

/***********************************
        Request for the users

 ***********************************/

// Checking the authentication for the user
app.get('/api/users/auth', authentication, (req, res) => {
    const { user } = req;

    // If we have authenticated the user to make the request then we will send the status and json
    res.status(200).json({
        isAdmin: user.role === 0 ? false : true,
        isAuth: true,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        cart: user.cart,
        history: user.history
    });
});

// Route to register the user to the database
app.post('/api/users/register', (req, res) => {
    // Storing the new user from the req.body;
    const user = new User(req.body);

    // Saving the user to the database
    user.save((err, doc) => {
        // If there is an error then we are sending back the error message
        if (err) return res.json({ success: false, err });

        // If no error then we are sending back the registered user
        res.status(200).json({ success: true });
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

// Route for logging the user out
app.get('/api/user/logout', authentication, (req, res) => {
    const { user } = req;

    User.findOneAndUpdate({ _id: user._id }, { token: '' }, (err, doc) => {
        // If there is an error loggint he user out we will send back the error
        if (err) return res.json({ success: false, err });

        // If no error we are returning the status of 200 and success to true
        return res.status(200).send({ success: true });
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
