import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../Services/EndPoints';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Post = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const user = useSelector(state => state.auth.user);
  const [comment, setComment] = useState('');

  // Fetch the post based on the ID from the URL
  const getThatPost = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/blog/posts/${id}`);
      setSinglePost(response.data.post);
      console.log('Single post data:', response.data);
    } catch (error) {
      console.error(`Error fetching post with ID: ${id}`, error);
      toast.error('Failed to fetch the post.');
    }
  };

  useEffect(() => {
    getThatPost();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async e => {
    e.preventDefault();

    if (!user) {
      return toast.error('Please, First Login');
    }

    try {
      const value = {
        postId: id,
        comment
      };

      const response = await axios.post(
        `${BaseUrl}/comment/addcomment`,
        value,
        {
          withCredentials: true
        }
      );

      // Reset comment field after submission
      setComment('');
      toast.success(response.data.message); // Show success message

      // Optionally, you can refetch the post to get the latest comments
      getThatPost();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment'); // Show error message
    }
  };

  return (
    <div className='container text-white mt-5 mb-5'>
      <div className='row'>
        <div className='col-md-12'>
          {singlePost ? (
            <>
              <h1 className='fw-bold text-white mb-4 display-4'>
                {singlePost.title}
              </h1>
              <img
                src={`${BaseUrl}/images/upload/${singlePost.image}`}
                alt='post'
                className='img-fluid mb-4'
                style={{ width: '50%', height: 'auto', marginInline: 'auto' }}
              />
              <p className='mb-5'>{singlePost.desc}</p>
              <hr />
              <h3 className='mt-5 mb-4'>Leave a Comment</h3>
              <form onSubmit={handleCommentSubmit}>
                <div className='mb-3'>
                  <label htmlFor='comment' className='form-label'>
                    Comment
                  </label>
                  <textarea
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    name='comment'
                    id='comment'
                    rows='4'
                    placeholder='Write your comment here'
                    required
                    className='form-control'
                  />
                </div>
                <button className='btn btn-primary' type='submit'>
                  Submit Comment
                </button>
              </form>
              <hr />
              <h3 className='mt-5 mb-4'>Comments</h3>

              {singlePost.comments && singlePost.comments.length > 0 ? (
                singlePost.comments.map((elem, index) => (
                  <div key={index} className='bg-secondary p-3 rounded mb-3 d-flex'>
                    <img
                      src={`http://localhost:8000/images/upload/${elem.userId.profile}`}
                      alt={elem.userId.FullName}
                      className='rounded-circle me-3'
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <h5 className='mb-1'>{elem.userId.FullName}</h5>
                      <p className='mb-0'>{elem.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </>
          ) : (
            <p>Loading post...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
