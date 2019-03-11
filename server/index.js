const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// Initializing the express app
const app = express();

// Creating the variable for the port to start the server on
const PORT = process.env.PORT || 4444;

// Connecting to the mongoose database
mongoose.connect(process.env.MONGO_URI);

// Initializing the middelware to use to express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ ok: 'OK' });
});

// Starting the express server on the specified port
app.listen(PORT, (req, res) => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
