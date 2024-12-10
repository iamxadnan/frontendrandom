import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import FacultyNavBar from "./FacultyNavBar";

function FacultyAssignedCourses() {
  const [facultyId, setFacultyId] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [selectedCourseCode, setSelectedCourseCode] = useState(""); // To track selected course
  const [message, setMessage] = useState("");


  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setFacultyId(user.facultyId);
    } else {
      setMessage("Faculty ID not found in session. Please log in again.");
    }
  }, []);
  const handleViewCourses = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/faculty/viewAssignedCourses`, { facultyId });
      if (response.data.courses) {
        setCourses(response.data.courses);
        setMessage("");
      } else {
        setMessage(response.data.message || "No courses found.");
        setCourses([]);
      }
      setStudents([]);
    } catch (error) {
      console.error(error);
      setMessage("Error fetching courses.");
    }
  };

  const handleViewStudents = async (courseCode) => {
    try {
      setSelectedCourseCode(courseCode); // Track the selected course code
      const response = await axios.post(`${config.url}/faculty/viewAssignedStudents`, {
        facultyId,
        courseCode,
      });
      if (response.data.students) {
        const initialMarksData = response.data.students.reduce((acc, student) => {
          acc[student.id] = {
            assignments: student.assignments,
            quizzes: student.quizzes,
            attendance: student.attendance,
            moocs: student.moocs,
            insemTheory: student.insemTheory,
            insemLab: student.insemLab,
            edited: false, // Track if the student was edited
          };
          return acc;
        }, {});
        setMarksData(initialMarksData);
        setStudents(response.data.students);
        setMessage("");
      } else {
        setMessage(response.data.message || "No students found.");
        setStudents([]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error fetching students.");
    }
  };

  const handleMarksChange = (studentId, field, value) => {
    setMarksData((prevState) => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [field]: value,
        edited: true, // Mark as edited
      },
    }));
  };

  const handleSaveAll = async () => {

    const updatedStudents = Object.entries(marksData)
      .filter(([_, marks]) => marks.edited)
      .map(([id, marks]) => ({
        studentId: id, // Send studentId directly
        courseCode: selectedCourseCode, // Include courseCode
        assignments: marks.assignments,
        quizzes: marks.quizzes,
        attendance: marks.attendance,
        moocs: marks.moocs,
        insemTheory: marks.insemTheory,
        insemLab: marks.insemLab,
      }));

      try {
        const response = await axios.post(`${config.url}/faculty/assignOrUpdateInternals`, {
          students: updatedStudents,
        });
      
        if (response.data.success) {
          setMessage("All changes saved successfully.");
        } else {
          setMessage(response.data.message );
        }
      } catch (error) {
        console.error("Error saving changes:", error);
        setMessage("Error saving changes. Please try again later.");
      }
      
  };

  return (
    <div>
      <FacultyNavBar/>
    <div className="faculty-assigned-courses">
      <h3>Enter Faculty ID to View Assigned Courses</h3>
      <form onSubmit={handleViewCourses}>
        <input
          type="text"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          placeholder="Enter Faculty ID"
          required
        />
        <button type="submit">View Courses</button>
      </form>

      {message && <p className="message">{message}</p>}

      {courses.length > 0 && (
        <>
          <h4>Assigned Courses</h4>
          <ul>
            {courses.map((course) => (
              <li key={course.courseCode}>
                {course.courseName} ({course.courseCode})
                <button onClick={() => handleViewStudents(course.courseCode)}>
                  View Students
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {students.length > 0 && (
        <>
          <h4>Students Assigned to Course: {selectedCourseCode}</h4>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Assignments (Max 10)</th>
                <th>Quizzes (Max 15)</th>
                <th>Attendance (Max 5)</th>
                <th>MOOCs (Max 5)</th>
                <th>InSem Theory (Max 15)</th>
                <th>InSem Lab (Max 10)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="number"
                      value={marksData[student.id]?.assignments || ""}
                      max="10"
                      step="0.1"
                      onChange={(e) =>
                        handleMarksChange(student.id, "assignments", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={marksData[student.id]?.quizzes || ""}
                      max="15"
                      step="0.1"
                      onChange={(e) =>
                        handleMarksChange(student.id, "quizzes", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={marksData[student.id]?.attendance || ""}
                      max="5"
                      step="0.1"
                      onChange={(e) =>
                        handleMarksChange(student.id, "attendance", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={marksData[student.id]?.moocs || ""}
                      max="5"
                      step="0.1"
                      onChange={(e) =>
                        handleMarksChange(student.id, "moocs", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={marksData[student.id]?.insemTheory || ""}
                      max="15"
                      step="0.1"
                      onChange={(e) =>
                        handleMarksChange(student.id, "insemTheory", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={marksData[student.id]?.insemLab || ""}
                      max="10"
                      step="0.1"
                      onChange={(e) =>
                        handleMarksChange(student.id, "insemLab", parseFloat(e.target.value))
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSaveAll}>Save All Changes</button>
        </>
      )}
    </div>
    </div>
  );
}

export default FacultyAssignedCourses;
