import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import StudentNavBar from './StudentNavBar';

export default function ViewAssignedCourse() {
  const [studentId, setStudentId] = useState('');
  const [courses, setCourses] = useState([]);
  const [internalsList, setInternalsList] = useState([]);
  const [totalMarks, setTotalMarks] = useState(null);
  const [message, setMessage] = useState('');

  // Retrieve studentId from sessionStorage on component mount
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setStudentId(user.studentId);
    } else {
      setMessage('No session found. Please log in to view your courses and internals.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setCourses([]);
    setInternalsList([]);
    setTotalMarks(null);

    if (!studentId.trim()) {
      setMessage('Please enter a valid Student ID.');
      return;
    }

    try {
      const response = await axios.post(
        `${config.url}/student/viewallcourses`, 
        null, 
        { params: { studentId } }
      );
      console.log(response.data);

      setCourses(response.data.stucoufaclist || []);
      if (response.data.internalsList) {
        setInternalsList(response.data.internalsList);
        setTotalMarks(response.data.totalMarks || 0);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage('No courses or internals found for this student ID.');
      } else if (error.response?.status === 400) {
        setMessage('Invalid Student ID provided.');
      } else {
        setMessage('An error occurred while fetching data. Please try again.');
      }
    }
  };

  if (!studentId) {
    // If there is no student ID, show a message and don't render the rest of the UI
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>View Assigned Courses</h2>
        <div style={styles.message}>{message}</div>
      </div>
    );
  }

  return (
    <div >
      <StudentNavBar/>
    <div style={{marginTop:'80px'}}>
      <h2 >View Assigned Courses</h2>

      {/* Form for Student ID Input */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className='form-group'
          style={{width:'300px'}}
        />
        <button type="submit" style={{ ...styles.button, display: 'none' }}>
          View Courses
        </button>
      </form>

      {/* Display Results */}
      {message && <div style={styles.message}>{message}</div>}

      {courses.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th >Course Code</th>
              <th >Course Name</th>
              <th >Faculty</th>
              <th >Section</th>
            </tr>
          </thead>
          <tbody>
  {courses.map((course) => (
    <tr key={course.course.courseCode}>
      <td>{course.course.courseCode}</td>
      <td>{course.course.courseName}</td>
      <td>{`${course.faculty.firstname} ${course.faculty.lastname}`}</td>
      <td>{course.section.sectionno}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}

      {internalsList.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={styles.heading}>Internals</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th >Course Code</th>
                <th >Course Name</th>
                <th >Assignments</th>
                <th >Quizzes</th>
                <th >Attendance</th>
                <th >MOOCs</th>
                <th >In-sem Theory</th>
                <th >In-sem Lab</th>
                <th >Total</th>
              </tr>
            </thead>
            <tbody>
  {internalsList.map((internal) => (
    <tr key={internal.course.courseCode}>
      <td>{internal.course.courseCode}</td>
      <td>{internal.course.courseName}</td>
      <td>{internal.assignments}</td>
      <td>{internal.quizzes}</td>
      <td>{internal.attendance}</td>
      <td>{internal.moocs}</td>
      <td>{internal.insemTheory}</td>
      <td>{internal.insemLab}</td>
      <td>
        {internal.assignments + internal.moocs + internal.insemTheory + internal.insemLab + internal.quizzes + internal.attendance}
      </td>
    </tr>
  ))}
</tbody>

          </table>
          <p style={{ ...styles.message, fontWeight: 'bold' }}>
            Total Marks: {totalMarks}
          </p>
        </div>
      )}
    </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    color: '#333',
    textAlign: 'center',
  },
  heading: {
    color: '#4CAF50',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '30px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    fontSize: '18px',
    marginTop: '20px',
    color: '#555',
  },
  table: {
    width: '80%',
    margin: '20px auto',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  th: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  td: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
};
