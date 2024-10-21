import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const Users = () => {
  const [users, setUsers] = useState([])

  const fetchAllUsers = async()=>{
    const res = await axios("http://localhost:8000/dashboard/users",{
      withCredentials: true
    })
    const data = res.data;
    setUsers(data.users)
  }

  useEffect(()=>{
    fetchAllUsers();
  }, [])

  // --------------------------- -/-/- --------------------------------------------------------------------------
  const handleDelete = async (id, name) => {
    try {
      const confirmation = window.confirm(`Are You Sure You Want TO Delete This User: "${name}"`);
      if (confirmation) {
        const res = await axios.delete(`http://localhost:8000/dashboard/deleteuser/${id}`, {
          withCredentials: true,
        });
  
        const message = res.data.message;
        toast.success(message);
  
        // Refetch the users or update the state after successful deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error('Error while deleting user:', error);
      toast.error(`Error while deleting user: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className="container">
      <h1 className="text-white mb-4">All Users</h1>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </thead>
          <tbody>
          {users.map((data, index)=>{
            return (
              <tr key={index} scope="row">
            <td>{index + 1}</td>
            <td>{data.FullName}</td>
            <td>{data.email}</td>
            <td>
              <button className="btn btn-danger" onClick={()=> handleDelete(data._id, data.FullName)}>
                <FaTrashAlt /> Delete
              </button>
            </td>
          </tr>
            )
          })}
           

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users