const blogModel = require('../models/Blog.js');
const fs = require('fs')
const path = require('path')

// ---------------------- create ------------------------------------
const Create = async (req, res) => {
    try {
        const { title, desc } = req.body;
        // const blogimage = req.file.filename;
        const blogimage = req.file ? req.file.filename : null;


        if (!title || !desc) {
            return res.json({ message: "All Fields Are Required", success: false });
        }

        if (!blogimage) {
            return res.json({ message: "Image Field Is Required", success: false });
        }

        // create new blog    
        const newBlog = await blogModel.create({
            title,
            desc,
            image: blogimage 
        });

        res.status(201).json({ message: "New Blog Created Successfully", success: true });
        
    } catch (error) {
        console.error(`blog create error: ${error}`);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ---------------------- delete post ------------------------------------
const DeletePost = async (req, res) => {
    try {
        const id = req.params.id;
        
        const deletedPost = await blogModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found", success: false });
        }

        if(deletedPost.image){
            const imgpath = path.join('public/images/upload', deletedPost.image)
            fs.promises.unlink(imgpath)
            .then(()=> console.log(`post deleted successfully`))
            .catch((error)=> console.log(`Error deleting image: ${error}`))
        }               

        res.status(200).json({ message: "Post deleted successfully", success: true });
        
    } catch (error) {
        console.error(`Blog delete error: ${error}`);

        // Check if the error is due to invalid ObjectId format
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid post ID", success: false });
        }

        res.status(500).json({ message: "Internal server error", success: false });
    }
};


// ---------------------- get all posts ------------------------------------
const GetPosts = async (req, res) => {
    try {
        const posts = await blogModel.find({});

        if (posts.length === 0) {
            return res.status(200).json({
                message: "No Posts Found",
                success: true,
                posts: []
            });
        }

        res.status(200).json({
            message: "Posts retrieved successfully",
            success: true,
            posts
        });
        
    } catch (error) {
        console.error(`Get All Posts Error: ${error}`);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ---------------------- get by id ------------------------------------
const GetOnePost = async (req, res) => {
    try {
        const id = req.params.id;

        const findPost = await blogModel.findById(id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId',
                    select: 'FullName profile' // Select only the fields you need
                }
            })
            .exec();

        if (!findPost) {
            return res.status(404).json({ message: "No Post found", success: false });
        }

        res.status(200).json({ success: true, post: findPost });
    } catch (error) {
        console.error(`Error Fetching One Post: ${error}`);
        res.status(500).json({ message: "Internal server error to get that post", success: false });
    }
};
// ---------------------- update post ------------------------------------
const UpdatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, desc } = req.body;

        const updatePost = await blogModel.findById(id);

        if (!updatePost) {
            return res.status(404).json({ message: "Post not found", success: false });
        }

        // Update fields only if they are provided
        if (title) {
            updatePost.title = title;
        }
        if (desc) {
            updatePost.desc = desc;
        }
        if (req.file) {
            updatePost.image = req.file.filename;
        }
        await updatePost.save();

        res.status(200).json({ message: "Post updated successfully", success: true, post: updatePost });

    } catch (error) {
        console.error(`Update Posts Error: ${error}`);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ---------------------- update ------------------------------------


module.exports = {
    Create,
    DeletePost,
    GetPosts,
    UpdatePost,
    GetOnePost
};
