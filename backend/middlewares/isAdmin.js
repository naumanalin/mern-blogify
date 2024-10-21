const jwt = require('jsonwebtoken');
const userModel = require('../models/user.js')

const isAdmin = async (req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:"Unathorized Person, No Token Provided",
                success: false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY);
        const user = await userModel.findById(decoded.userId);

        if(!user){
            return res.status(403).json({message:"user not found", success: false})
        }

        if(user.role != 'admin'){
            return res.status(403).json({message:"unathourized: user is not admin", success:false})
        }
        // res.status(200).send('welcome admin')
        next();

    } catch (error) {
        console.error('isAdmin error:', error)
        res.status(500).json({message:"internal server error", success:false})
    }
}


module.exports = {
    isAdmin,
}
