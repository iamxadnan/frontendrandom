import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewRegistrationRequests.css';
import AdminNavBar from './AdminNavBar';
import config from '../config';

export default function ViewRegistrationRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/admin/getRegistrationRequests`)
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the registration requests!", error);
      });
  }, []);

  const handleUpdateStatus = async (email, action) => {
    const regstatus = action === 'approve' ? 'approved' : 'rejected';

    try {
      const response = await axios.get(`${config.url}/admin/updateRegistrationStatus`, {
        params: {
          email: email,
          regstatus: regstatus
        }
      });

      if (response.status === 200) {
        alert("Registration status updated successfully.");
        setRequests(prevRequests =>
          prevRequests.map(req =>
            req.email === email ? { ...req, regstatus } : req
          )
        );
      } else {
        alert("Failed to update registration status.");
      }
    } catch (error) {
      console.error("Error updating registration status:", error);
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="container">
        <h1 className="page-title">View Registration Requests</h1>
        <div className="table-container">
          <table className="request-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <tr key={request.id}>
                    <td>{index + 1}</td>
                    <td>{request.firstname}</td>
                    <td>{request.lastname}</td>
                    <td>{request.email}</td>
                    <td>{request.role}</td>
                    <td>{request.department}</td>
                    <td>{request.regstatus}</td>
                    <td>
                      <button 
                        className="approve-btn" 
                        onClick={() => handleUpdateStatus(request.email, 'approve')}
                      >
                        Approve
                      </button>
                      <button 
                        className="reject-btn" 
                        onClick={() => handleUpdateStatus(request.email, 'reject')}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No registration requests available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
