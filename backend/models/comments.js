const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    comment:{
        type: String,
        require: true
    }
},{timestamps:true})


module.exports = mongoose.model('comment', commentsSchema)