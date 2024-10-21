const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const DBCon  = require('./utils/db.js');
const authRoute = require('./routes/authRoutes.js');
const cookiesParser = require('cookie-parser');
const blogRoute = require('./routes/Blogs.js');
const DashRoute = require('./routes/Dashboard.js');
const CommentRoute = require('./routes/Comments.js');
const publicRoute = require('./routes/PublicRoute.js');

// dotenv
require('dotenv').config();
const PORT = process.env.PORT || 8001;

// Mongoose
DBCon();

app.use(express.static('public'))
app.use(cookiesParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

app.get('/', (req, res)=>{
    res.send('hello')
})

// Routes
app.use('/auth', authRoute) // signup, login, logout
app.use('/blog', blogRoute) // create, delete, get, patch
app.use('/dashboard', DashRoute) // number of users,post,comment, get / delete users
app.use('/comment', CommentRoute) // addComment with IsLogin middleware
app.use('/public', publicRoute) // 


app.listen(PORT, ()=> console.log(`SERVER IS LISTENING AT PORT: ${PORT} ...`))
