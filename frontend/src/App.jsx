

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserLayout from './Layouts/UserLayout'
import Dashboard from './pages/Admin/Dashboard'
import AdminLayout from './Layouts/AdminLayout'
import Addpost from './pages/Admin/Addpost'
import Allposts from './pages/Admin/Allposts'
import Users from './pages/Admin/Users'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdatePost from './pages/Admin/UpdatePost'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<UserLayout/>}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>

        <Route path='/dashboard' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='addpost' element={<Addpost />} />
          <Route path='update/:id' element={<UpdatePost />} />
          <Route path='allposts' element={<Allposts />} />
          <Route path='users' element={<Users />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
    </>
  )
}

export default App
