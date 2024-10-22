import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate()
  
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Create FormData object
    const formData = new FormData();
    formData.append("FullName", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "admin");

    // Check if an image is selected before appending
    if (image) {
      formData.append("profile", image);
    }

    try {
      const req = await axios.post("http://localhost:8000/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        withCredentials: true,
      });
      const message = req.data.message;
      toast.success(message);
      setName("")
      setEmail("")
      setPassword("")
      setImage(null)
      setPreview(null)
      navigate('/')

    } catch (error) {
      console.log("Signup Error: ", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <section className="bg-light">
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
          <a href="#" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
            <img className="me-2" src="/vite.svg" alt="logo" width="32" height="32" />
            <Link to={'/'}> <span className="h4 mb-0 fw-bold">Blogify</span></Link>
          </a>
          <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
            <div className="card-body p-4">
              <h1 className="h5 fw-bold text-dark">Create an account</h1>
              <form onSubmit={handleRegistration}>
                <div className="mb-3 text-center">
                  <label htmlFor="image" className="form-label">Profile Picture</label>
                  <div className="d-flex justify-content-center mb-3">
                    {preview ? (
                      <img
                        src={preview}
                        alt="avatar preview"
                        className="rounded-circle border border-secondary"
                        style={{ objectFit: 'cover', width: '100px', height: '100px' }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-light border border-secondary"
                        style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <span className="text-muted">No Image</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={(e)=>handleImage(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign up</button>
              </form>
              <p className="mt-3 mb-0 text-muted">
                Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
