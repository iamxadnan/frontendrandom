import React, { useState } from "react";
import config from "../config";
import AdminNavBar from "./AdminNavBar";

const ViewStudentTimeTable = () => {
  const [studentId, setStudentId] = useState("");
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const fetchTimetable = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setTimetableEntries([]);

    if (!studentId.trim()) {
      setErrorMessage("Please enter a valid Student ID.");
      return;
    }

    try {
      const response = await fetch(`${config.url}/student/viewtimetable`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ studentId }),
      });

      if (response.ok) {
        const data = await response.json();
        setTimetableEntries(data);
      } else {
        setErrorMessage("Failed to fetch the timetable. Please check the Student ID.");
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setErrorMessage("An error occurred while fetching the timetable.");
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
        <AdminNavBar/>
      <h1>View Timetable</h1>
      <form onSubmit={fetchTimetable} className="form-container">
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          value={studentId}
          onChange={handleInputChange}
          required
          className="form-groups"
        />
        <button type="submit" className="submit-button"style={{marginTop:'20px'}}>
          View Timetable
        </button>
      </form>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
      )}

      {timetableEntries.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Your Timetable</h2>
          <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Day</th>
                <th>Period</th>
                <th>Room</th>
                <th>Course</th>
                <th>Faculty</th>
              </tr>
            </thead>
            <tbody>
  {timetableEntries.map((entry) => (
    <tr key={entry.id}> {/* Use a unique field like `entry.id` */}
      <td>{entry.dayOfWeek}</td>
      <td>
        {entry.period.startTime} - {entry.period.endTime}
      </td>
      <td>{entry.classroom.roomNumber}</td>
      <td>{entry.course.courseName}</td>
      <td>
        {entry.faculty.firstname} {entry.faculty.lastname}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ViewStudentTimeTable;
