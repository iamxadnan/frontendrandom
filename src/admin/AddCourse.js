import React, { useEffect, useState } from "react";
import config from "../config";
import AdminNavBar from "./AdminNavBar";


const AddCourse = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      courseCode,
      courseName,
      courseDesc,
      courseCredits,
    };

    try {
      const response = await fetch(`${config.url}/admin/addcourses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        alert("Course added successfully!");
        setCourseCode("");
        setCourseName("");
        setCourseDesc("");
        setCourseCredits("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error adding course.");
      }
    } catch (err) {
      setError("An error occurred while adding the course.");
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div style={styles.container}>
        {/* View All Courses Section */}
        <div style={styles.leftSection}>
        <div>
      
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
        </div>

        {/* Add Course Section */}
        <div style={styles.rightSection}>
          <h2>Add Course</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="courseCode">Course Code:</label>
              <input
                type="text"
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseName">Course Name:</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseDesc">Course Description:</label>
              <input
                type="text"
                id="courseDesc"
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseCredits">Course Credits:</label>
              <input
                type="text"
                id="courseCredits"
                value={courseCredits}
                onChange={(e) => setCourseCredits(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "20px",
  },
  leftSection: {
    flex: 2,
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
  },
  rightSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
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

export default AddCourse;
