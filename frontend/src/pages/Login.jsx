import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { setUser } from '../redux/AuthSlice';
import { toast } from 'react-toastify';

const Login= ()=> {
    const user = useSelector((state) => state.auth.user);
    console.log('redux store wala user', user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [value, setValue] = useState({
        email:"",
        password:""
    })
    const handleChange =(e)=>{
        setValue({
            ...value,
            [e.target.name]:e.target.value
        })
    }
    console.log(value)
    // -------------------
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/auth/login', value, {
            withCredentials: true
        });
        const data = response.data;
        console.log('Dispatching user data:', data.user);
        console.log('data::', JSON.stringify(data, null, 2));

        if (response.status === 200) {
            dispatch(setUser(data.user));
            toast.success(data.message);
            navigate('/'); 
        } 
    } catch (error) {
        // If the error response contains a message, show it in the toast
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            // Fallback for other unexpected errors
            toast.error('Something went wrong, please try again.');
        }
        console.log(`Login Catch Error:: ${error}`);
    }
};

    
   

    return (
        <>
            <section className="bg-light">
                <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
                    <span className="mb-4 text-dark text-decoration-none d-flex align-items-center">
                        <img className="me-2" src="/vite.svg" alt="logo" width="32" height="32" />
                        <Link to={'/'}> <span className="h4 mb-0 fw-bold">Blogify</span></Link>
                    </span>
                    <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
                        <div className="card-body p-4">
                            <h1 className="h5 mb-4 fw-bold text-dark">Sign in to your account</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        value={value.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="email"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        value={value.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="password"
                                        placeholder="••"
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    {/* Optional content can be added here */}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Sign in</button>
                            </form>
                            <p className="mt-3 mb-0 text-muted">
                                Don’t have an account yet? <Link to="/register" className="text-primary">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default  Login;