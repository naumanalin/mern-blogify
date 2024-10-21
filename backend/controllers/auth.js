const userModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// ---------------------------------------------------------------------------------------
const Register = async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "File upload error: No file uploaded or invalid file format."
        });
    }

    const profile = req.file.filename;  
    console.log(req.file);  // Log the file information for debugging

    if (profile) {
        const { FullName, email, password, role } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "Email already exists, please login."
            });
        }

        if (!FullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields: FullName, email, and password."
            });
        }

        try {
            // Hash the password
            const hashPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await userModel.create({
                FullName,
                email,
                profile: profile,  // Uploaded file's filename
                password: hashPassword,
                role: role || 'user'  // Default role if not provided
            });

            // Save user to DB
            await newUser.save();

            return res.status(201).json({
                success: true,
                message: "Registration successful",
                user: newUser
            });
        } catch (error) {
            console.error(`INTERNAL SERVER ERROR: ${error}`);
            return res.status(500).json({
                success: false,
                message: "Internal server error occurred while processing the registration.",
                error: error.message
            });
        }

    } else {
        console.log('File processing error');
        return res.status(500).json({
            success: false,
            message: "File processing error: Unable to store file."
        });
    }
};

// ---------------------------------------------------------------------------------------

const Login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const findUser = await userModel.findOne({email})
        
        if(!findUser){
            return res.status(400).json({message:"User not found", success: false})
        }

    const comPassword = await bcrypt.compare(password, findUser.password);

    if(!comPassword){
        return res.status(400).json({message:"password did not match", success: false})
    }
    // --------------------- jwt token $ cookies ---------------------------
    const token = jwt.sign({userId:findUser._id}, process.env.JWT_SECERT_KEY, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        path:'/',
        secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
    })

    res.status(200).json({message:"login successfully.", success:true, user:findUser, token})

    } catch (error) {
        console.log(`Internal server error: ${error}`)
        res.status(500).json({message:"Internal server error.", success:false})
    }
}

// ---------------------------------------------------------------------------------------
const Logout = async (req, res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message:"Logout successfully.", success:true})
    } catch (error) {
        console.error(`LOGOUT ERROR: ${error}`)
        res.status(500).json({message:"internal server error", success: false})
    }
}


module.exports = {
    Register,
    Login,
    Logout
};
