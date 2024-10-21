const express = require('express');
const { Create, DeletePost, GetPosts, UpdatePost, GetOnePost } = require('../controllers/blog-controllers');
const { isAdmin } = require('../middlewares/isAdmin');
const upload = require('../middlewares/Multer');
const blogRoute = express.Router();

blogRoute.post('/create',isAdmin ,upload.single('blogimage') ,Create );
blogRoute.delete('/delete/:id' ,isAdmin ,DeletePost )
blogRoute.get('/posts', GetPosts)
blogRoute.get('/posts/:id', GetOnePost)
blogRoute.patch('/update/:id' ,isAdmin ,upload.single('blogimage') ,UpdatePost)


module.exports = blogRoute;