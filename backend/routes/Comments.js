const express = require('express');
const { isLogin } = require('../middlewares/isLogin');
const { AddComent } = require('../controllers/comment-controller');
const CommentRoute = express.Router();

CommentRoute.post('/addcomment', isLogin ,AddComent )


module.exports = CommentRoute;