const express = require('express');
const { Register, Login, Logout } = require('../controllers/auth.js');
const upload = require('../middlewares/Multer.js');

const authRoute = express.Router();

authRoute.post('/register', upload.single('profile'), Register);
authRoute.post('/login', Login);
authRoute.post('/logout', Logout)


module.exports = authRoute;