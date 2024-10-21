import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Addpost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data for file upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('blogimage', image);

    try {
      const res = await axios.post('http://localhost:8000/blog/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      setDesc("")
      setImage(null)
      setTitle("")
      setPreview(null)

    } catch (error) {
      console.error('Error uploading the post:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Add New Post</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <div className="mb-4">
                  <label htmlFor="postImage" className="form-label">Upload Image</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="postImage" 
                    onChange={handleImageChange} 
                  />
                  {preview && (
                    <img src={preview} alt="preview" style={{ width: '250px', height: '250px', margin: '10px' }} />
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="postTitle" className="form-label">Title</label>
                  <input 
                    type="text" 
                    id="postTitle" 
                    className="form-control" 
                    placeholder="Enter Post Title" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="postDescription" className="form-label">Description</label>
                  <textarea 
                    id="postDescription"
                    className="form-control" 
                    placeholder="Enter Post Description" 
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)} 
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Submit Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addpost;
