const User = require('../models/User');

/**
 * Authentication function for checking authentication for the user
 */
const authentication = (req, res, next) => {
    const { cookies } = req;

    // Checking the token that we get from the request
    const token = cookies.w_auth;

    // Method to find the user by their token ( Name is custom name but can be whatever you decide )
    User.findByToken(token, (err, user) => {
        if (err) throw err;

        // If there is no user then they are not authenticated and we send back an error
        if (!user) return res.json({ isAuth: false, error: true });

        // Adding the token back to the request
        req.token = token;

        // Attaching the user to the request
        req.user = user;

        next();
    });
};

module.exports = authentication;
