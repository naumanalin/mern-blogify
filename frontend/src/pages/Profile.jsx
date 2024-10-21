import React from 'react';
import { FaUser, FaLock, FaCamera } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Profile = () => {
  // Get user details from store
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Update Profile</h1>
      <div className="profile-image-section">
        <img 
          src={`http://localhost:8000/images/upload/${user.profile}`} 
          alt={user.profile} 
          className="profile-image" 
        />
        <div className="profile-image-overlay">
          <FaCamera className="profile-camera-icon" />
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <FaUser className="profile-icon" /> 
          <span>{user.FullName}</span>
        </div>
        <div className="profile-info-item">
          <FaLock className="profile-icon" /> 
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
