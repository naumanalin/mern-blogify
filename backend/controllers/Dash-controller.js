const userModel = require('../models/user.js');
const blogModel = require('../models/Blog.js');
const fs = require('fs')
const path = require('path')

// ------------------------- Function to get all data (users and posts) ----------------------
const GetAllData = async (req, res) => {
    try {
        const users = (await userModel.find()).length;
        const posts = (await blogModel.find()).length;

        // Check if there are no users or posts
        if (users === 0 && posts === 0) {
            return res.status(404).json({ message: "No Data Found", success: false });
        }
        
        res.status(200).json({ success: true, users, posts });

    } catch (error) {
        console.error(`Get Dashboard Data Error: ${error}`);
        res.status(500).json({ message: "Internal server error while getting dashboard data", success: false });
    }
};


// ----------------------------- get all users -------------------------------
const GetUser = async (req, res) => {
    try {
        const users = await userModel.find();

        // Check if users are empty
        if (users.length === 0) {
            return res.status(404).json({ message: "No User Data Found", success: false });
        }

        // Send successful response
        res.status(200).json({ success: true, users });

    } catch (error) {
        console.error(`GetUser Error: ${error}`);
        res.status(500).json({ message: "Internal server error while getting user data", success: false });
    }
};

// ----------------------------- Delete user by id -------------------------------
const DeleteUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const ExistUser = await userModel.findById(id);
        if(!ExistUser){
            return res.status(404).json({message:"No User Found to Delete", success:false})
        }
        if(ExistUser.role == 'admin'){
            return res.status(400).json({message:"Sorry, Admin Cann't delete Admin Account", success:false})
        }
        // ----------------- unlink image ------------------------------
        if(ExistUser.profile){
            const profilePath = path.join('public/images/upload', ExistUser.profile);
            fs.promises.unlink(profilePath)
            .then(()=> console.log('user profile image deleted'))
            .catch(()=> console.log('Error Deleting Profile image...'))
        }

        const deleteUser = await userModel.findByIdAndDelete(id);
        res.status(200).json({message:"User Delete Successfully", success:true, user:deleteUser})
        
    } catch (error) {
        console.error(`DeleteUser Error: ${error}`);
        res.status(500).json({ message: "Internal server error while Deleting user data", success: false });    
    }
}

module.exports = {
    GetAllData,
    GetUser,
    DeleteUser,
};
