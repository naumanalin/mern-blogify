const commentModel = require('../models/comments.js');
const postModel = require('../models/Blog.js');

const AddComent = async (req, res) => {
    try {
        const { postId, comment } = req.body;

        // Ensure postId and comment are provided
        if (!postId || !comment) {
            return res.status(400).json({
                message: "Post ID and comment text are required",
                success: false
            });
        }

        // Create the new comment
        const newComment = await commentModel.create({
            postId,
            userId: req.user._id, // Get userId from the middleware
            comment
        });

        // Find the post and ensure it exists
        const existPost = await postModel.findById(postId);
        if (!existPost) {
            return res.status(404).json({
                message: "Post not found to comment",
                success: false
            });
        }

        // Push the new comment's ID to the post's comments array
        existPost.comments.push(newComment._id); 
        await existPost.save();

        // Send success response with the new comment
        res.status(201).json({
            message: "Comment added successfully",
            success: true,
            comment: newComment
        });

    } catch (error) {
        console.error(`AddComent Server Error: ${error}`);
        res.status(500).json({
            message: "Internal server error while adding comment",
            error: error.message, 
            success: false,
        });
    }
};

module.exports = {
    AddComent,
};
