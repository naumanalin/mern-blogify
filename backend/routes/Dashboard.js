const express = require('express');
const { isAdmin } = require('../middlewares/isAdmin.js');
const { GetAllData, GetUser, DeleteUser } = require('../controllers/Dash-controller.js');
const DashRoute = express.Router();

DashRoute.get('/', isAdmin, GetAllData); // Number of users, posts, comments
DashRoute.get('/users', isAdmin, GetUser); // Get all users recorde 
DashRoute.delete('/deleteuser/:id', isAdmin, DeleteUser)

module.exports = DashRoute;



