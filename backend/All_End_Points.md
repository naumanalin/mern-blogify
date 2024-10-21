


## Auth Routes
SignUp: POST: http://localhost:8000/auth/register
Login:  POST: http://localhost:8000/auth/login
Logout:     : http://localhost:8000/auth/logout


## Blog: create, delete, get, patch
Create New:    http://localhost:8000/blog/create
Delete:        http://localhost:8000/blog/delete/:id
Get All Posts: http://localhost:8000/blog/posts
Get One Post:  http://localhost:8000/blog/posts/:id
Update patch:   http://localhost:8000/blog/update/:id
 

## Dashboard: number of users,post,comment, get / delete users
Number of users, posts, comments: GET: http://localhost:8000/dashboard

Get all users recorde: GET: http://localhost:8000/dashboard/users
Delete User: DELETE: http://localhost:8000/dashboard/deleteuser/:id

## Comment: 
Add Comment: http://localhost:8000/comment/addcomment

## Public route: 
To get single post detail: GET: http://localhost:8000/public/singlepost/:id