const jwt = require('jsonwebtoken');
const userModel = require('../models/user.js');

const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure the token is retrieved correctly
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No Token Provided",
                success: false
            });
        }

        // Corrected secret key name
        const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY); 
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(403).json({
                message: "User not found",
                success: false
            });
        }

        req.user = user; // Attach user to req for next middleware
        next();

    } catch (error) {
        console.error('isLogin error:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = { isLogin };
