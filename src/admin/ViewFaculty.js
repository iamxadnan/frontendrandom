import React, { useEffect, useState } from 'react';
import './FacultyCard.css';
import AdminNavBar from './AdminNavBar';
import config from '../config';

function ViewFaculty() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    fetch(`${config.url}/admin/viewallfaculty`)
      .then(response => response.json())
      .then(data => setFaculty(data))
      .catch(error => console.error('Error fetching faculty data:', error));
  }, []);

  const deleteFaculty = (email) => {
    fetch(`${config.url}/admin/deletefaculty?email=${email}`, { method: 'GET' })
      .then(response => response.text())
      .then(message => {
        alert(message);
        setFaculty(faculty.filter(fac => fac.email !== email));
      })
      .catch(error => console.error('Error deleting faculty:', error));
  };

  return (
    <div>
      <AdminNavBar />
      <div className="faculty-container">
        {faculty.map((fac) => (
          <div className="faculty-card" key={fac.email}>
            <img
              src={`data:image/jpeg;base64,${fac.base64Image}`}
              alt={`${fac.firstname}'s profile`}
              className="card-image"
            />
            <h3>{fac.firstname} {fac.lastname}</h3>
            <p>Email: {fac.email}</p>
            <p>Contact: {fac.contact}</p>
            <p>Designation: {fac.designation}</p>
            <button className="delete-btn" onClick={() => deleteFaculty(fac.email)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewFaculty;
