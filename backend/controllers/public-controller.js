const postModel = require('../models/Blog.js')

const GetSinglePost = async (req, res)=>{
    try {
        const id = req.params.id;
        const findPost = await postModel.findById(id)
        .populate({
            path: "comments"
            .populate({
                path:"userId"
            })
        });

        if(!findPost){
            return res.status(404).json({message:"post not found", success:ture})
        }

        res.status(200).json({success:true, post:findPost})

    } catch (error) {
         console.error(`Server Error Getting Single Post: ${error}`);
        res.status(500).json({
            message: "Internal server error while While Getting single post",
            success: false
        });
    }
}


module.exports = {
    GetSinglePost,
}