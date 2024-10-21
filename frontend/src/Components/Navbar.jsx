import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../redux/AuthSlice'

const Navbar = () => {
  const user = useSelector((state)=>state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async ()=>{
    try {
      const response = await axios.post('http://localhost:8000/auth/logout')
      const data = response.data
      if(response.status==200){
        toast.success(data.message)
        dispatch(logout())
        navigate('/')
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
    <nav className="navbar ">
      <div className="container d-flex justify-content-between align-items-center p-3 text-white">
        <Link to='/' ><h1 className="mx-5 text-white fs-2 fw-bold">Blogify</h1></Link>
        <div className="d-flex align-items-center">

          {!user ? <Link to='/login'><button className="btn_sign mx-3">Sign in</button></Link> : (
            <div className="dropdown" title={user.FullName} >
            <div className="avatar-container pointer rounded-circle overflow-hidden bg-info" data-bs-toggle="dropdown" aria-expanded="false" style={{width: '40px', height:'40px', cursor:'pointer'}}>
              <img src={`http://localhost:8000/images/upload/${user.profile}`} alt="profile image" className="img-fluid h-100 w-100" style={{objectFit:"cover"}} />
            </div>
            <ul className='dropdown-menu dropdown-menu-end dropdown-menu-dark text-white'>
              {user && user.role=='admin'? <li><Link to={'/dashboard'} className='dropdown-item'>Dashboard</Link></li>:""}
              <li><Link to={`/profile/${user._id}`} className='dropdown-item'>Profile</Link></li>
              <li><a className='dropdown-item' onClick={handleLogout} >Sign Out</a></li>
            </ul>
          </div>
          )}
                   
        </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar