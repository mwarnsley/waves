// Function to make sure the user is an admin
const admin = (req, res, next) => {
    if (req.user.role === 0) {
        // If the user is not an admin then they are not allowed to make admin request
        return res.send('You are not allowed to perform this action.');
    }
    next();
};

module.exports = admin;
