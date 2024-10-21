const express = require('express');
const { GetSinglePost } = require('../controllers/public-controller');
const publicRoute = express.Router();

publicRoute.get('/singlepost/:id', GetSinglePost)


module.exports = publicRoute;