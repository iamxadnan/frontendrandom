import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FacultyNavBar from './FacultyNavBar';
import config from '../config';

export default function ViewAppliedLeaves() {
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    const { email } = user;

    if (email) {
      axios.get(`${config.url}/faculty/ViewAppliedLeaves?email=${encodeURIComponent(email)}`)
        .then(response => {
          setAppliedLeaves(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching applied leaves!", error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const styles = {
    container: {
      padding: '20px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
      backgroundColor: '#f5f5f5',
      padding: '10px',
      borderRadius: '8px 8px 0 0',
      marginBottom: '10px',
    },
    cardBody: {
      margin: '5px 0',
    },
  };

  return (
    <div>
      <FacultyNavBar />
      <div style={styles.container}>
        <h1 style={styles.title}>Applied Leaves</h1>
        <div style={styles.cardContainer}>
          {appliedLeaves.length > 0 ? (
            appliedLeaves.map((leave) => (
              <div style={styles.card} key={leave.leaveId}>
                <div style={styles.cardHeader}>
                  <h3>Leave ID: {leave.leaveId}</h3>
                  <p>Status: {leave.status}</p>
                </div>
                <div>
                  <p><strong>Category:</strong> {leave.category}</p>
                  <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
                  <p><strong>Leave Type:</strong> {leave.leaveType}</p>
                  <p><strong>Reason:</strong> {leave.reason}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No applied leaves found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
