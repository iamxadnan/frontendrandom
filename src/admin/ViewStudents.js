import React, { useEffect, useState } from 'react';
import './FacultyCard.css';
import AdminNavBar from './AdminNavBar';
import config from '../config';

function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${config.url}/admin/viewallstudents`)
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, []);

  const deleteStudent = (email) => {
    fetch(`${config.url}/admin/deletestudent?email=${email}`, { method: 'GET' })
      .then(response => response.text())
      .then(message => {  
        alert(message);
        setStudents(students.filter(stu => stu.email !== email));
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  return (
    <div>
      <AdminNavBar />
      <div className="faculty-container">
        {students.map((stu) => (
          <div className="faculty-card" key={stu.userStuId}>
            {stu.base64Image && (
              <img
                src={`data:image/jpeg;base64,${stu.base64Image}`}
                alt={`${stu.firstname} ${stu.lastname}`}
                className="card-image"
              />
            )}
            <h3>{stu.firstname} {stu.lastname}</h3>
            <ul className='ful'>
              {Object.entries(stu).map(([key, value]) => (
                key !== 'base64Image' && (
                  <li className='fli' key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                )
              ))}
            </ul>
            <button className="delete-btn" onClick={() => deleteStudent(stu.email)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewStudents;
