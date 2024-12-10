import React, { useState, useEffect } from 'react';
import config from '../config';
import AdminNavBar from './AdminNavBar';



const ViewAllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${config.url}/admin/courses`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data); // Set the courses in state
        } else {
          setError('Failed to fetch courses');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <AdminNavBar/>
      <div style={{ marginTop: '100px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
  <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Courses</h1>
  {(() => {
    if (loading) {
      return <p style={{ textAlign: 'center' }}>Loading courses...</p>;
    }
    if (error) {
      return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
    }
    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Course Code</th>
              <th style={styles.th}>Course Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Credits</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.courseCode} style={styles.row}>
                  <td style={styles.td}>{course.courseCode}</td>
                  <td style={styles.td}>{course.courseName}</td>
                  <td style={styles.td}>{course.courseDesc}</td>
                  <td style={styles.td}>{course.courseCredits}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.td}>
                  No courses available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  })()}
</div>

    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f5f5f5', // Light grey background for the table
    color: '#333', // Dark grey text for contrast
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    animation: 'fadeIn 0.8s ease-in-out',
  },
  th: {
    backgroundColor: '#d3d3d3', // Slightly darker grey for headers
    color: '#000', // Black text for headers
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #ccc',
    transition: 'background-color 0.3s ease',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc', // Subtle border
    backgroundColor: '#fff', // White for table rows
    transition: 'background-color 0.3s ease',
  },
  row: {
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#e8e8e8', // Light grey on hover
    },
  },
};

// Add keyframe animations
const globalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject the keyframe animations into the DOM
const styleSheet = document.createElement('style');
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default ViewAllCourses;
