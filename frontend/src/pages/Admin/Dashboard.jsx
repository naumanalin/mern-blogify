import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard', { withCredentials: true });
        const data = response.data;
        if (response.status === 200 && data.success) {
          setTotalUsers(data.users);
          setTotalPosts(data.posts);
        } else {
          toast.error(data.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error(`Error fetching dashboard data: ${error}`);
        toast.error('Error fetching data');
      }
    };

    getData();
  }, []);

  return (
    <>
      <div>
        <h2 className="mb-4 text-white">Dashboard</h2>
        <div className="row">
          {/* Total Users */}
          <div className="col-sm-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="cart-title">Total Users</h5>
                <p className="card-text">{totalUsers}</p>
              </div>
            </div>
          </div>

          {/* Total Posts */}
          <div className="col-sm-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="cart-title">Total Posts</h5>
                <p className="card-text">{totalPosts}</p>
              </div>
            </div>
          </div>

          {/* Total Comments */}
          <div className="col-sm-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="cart-title">Total Comments</h5>
                <p className="card-text">0</p> {/* Adjust this when you add comments */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
