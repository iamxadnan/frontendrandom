import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import config from '../config';

export default function ViewLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetching leave requests from the backend
  useEffect(() => {
    axios.get(`${config.url}/admin/getleaverequests`)
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the leave requests!", error);
      });
  }, []);

  // Handle update leave status (approve or reject)
  const handleUpdateStatus = async (leaveId, action) => {
    const status = action === 'approve' ? 'APPROVED' : 'REJECTED';

    try {
      const response = await axios.get(`${config.url}/admin/updateLeaveStatus`, {
        params: {
          leaveId: leaveId,
          status: status
        }
      });
      // Handle response...
      if (response.status === 200) {
        alert("Leave status updated successfully.");
        setLeaveRequests(prevRequests =>
          prevRequests.map(req =>
            req.leaveId === leaveId ? { ...req, status: status } : req
          )
        );
      } else {
        alert("Failed to update leave status.");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
};

     
   

  return (
    <div>
      <AdminNavBar />
      <div className="container">
        <h1 className="page-title">View Leave Requests</h1>
        <div className="table-container">
          <table className="leave-request-table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Faculty Email</th>
                <th>Category</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((request) => (
                  <tr key={request.leaveId}>
                    <td>{request.leaveId}</td>
                    <td>{request.femail}</td>
                    <td>{request.category}</td>
                    <td>{new Date(request.startDate).toLocaleDateString()}</td>
                    <td>{new Date(request.endDate).toLocaleDateString()}</td>
                    <td>{request.leaveType}</td>
                    <td>{request.reason}</td>
                    <td>{request.status}</td>
                    <td>
                      <button 
                        className="approve-btn" 
                        onClick={() => handleUpdateStatus(request.leaveId, 'approve')}
                      >
                        Approve
                      </button>
                      <button 
                        className="reject-btn" 
                        onClick={() => handleUpdateStatus(request.leaveId, 'reject')}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No leave requests available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}