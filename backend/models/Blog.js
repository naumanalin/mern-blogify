const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type: String
    },
    desc: {
        type: String
    },
    image:{
        type: String
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
}, {timestamps:true});



module.exports = mongoose.model('blog', postSchema)