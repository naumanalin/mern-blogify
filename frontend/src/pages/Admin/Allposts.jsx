import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Allposts = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Fetch all posts from the server
  const fetchAllPosts = async () => {
    try {
      const req = await axios.get("http://localhost:8000/blog/posts", {
        withCredentials: true
      });
      setAllPosts(req.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts');
    }
  };

 

  // --------------------------- deleting a post -------------------------------------
  const handleDelete = async (id, title) => {
    const confirmation = window.confirm(`Acknowledgement, For Deleting post with Title "${title}"`);
    if (confirmation) {
      try {
        const req = await axios.delete(`http://localhost:8000/blog/delete/${id}`, {
          withCredentials: true
        });
        toast.success(req.data.message);

        // Update the state to remove the deleted post from the list
        setAllPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Error deleting post');
      }
    }
  };

  // ---------------------------------------------------------------------------
  useEffect(() => {
    fetchAllPosts();
  }, [handleDelete]);

  return (
    <div className="container">
      <h1 className="text-center mb-4 text-white">All Posts</h1>
      <div className="row">
        {allPosts && allPosts.map((post, index) => (
          <div className="col-md-4 col-lg-4 col-12 mb-4" key={post._id}>
            <div className="card h-100">
              <img 
                src={`http://localhost:8000/images/upload/${post.image}` || "/vite.svg"} 
                alt="Post Image" 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.desc}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(post._id, post.title)}
                >
                  <FaTrashAlt /> Delete
                </button>
                <Link 
                  to={`/dashboard/update/${post._id}`}
                  className="btn btn-warning" 
                >
                  <FaEdit /> Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div> {/* end row */}
    </div>
  );
};

export default Allposts;
