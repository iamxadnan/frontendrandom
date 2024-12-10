import React, { useEffect, useState } from "react";
import config from "../config";
import StudentNavBar from "./StudentNavBar";

const ViewTimetable = () => {
  const [studentId, setStudentId] = useState("");
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve studentId from session storage when the component loads
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setStudentId(user.studentId);
    } else {
      setErrorMessage("Student ID not found in session. Please log in again.");
    }
  }, []);

  const fetchTimetable = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setTimetableEntries([]);

    if (!studentId.trim()) {
      setErrorMessage("Student ID is missing. Please log in again.");
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
        setErrorMessage("Failed to fetch the timetable. Please check your Student ID.");
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      setErrorMessage("An error occurred while fetching the timetable.");
    }
  };

  return (
    <div >
        <StudentNavBar/>
    <div style={{ margin: "2rem" }}>
      <h1>Timetable</h1>
      {errorMessage && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</p>
      )}
      <form onSubmit={fetchTimetable}>
        {/* Hidden field to pass studentId */}
        <input type="hidden" name="studentId" value={studentId} />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          View Timetable
        </button>
      </form>

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
    <tr key={`${entry.dayOfWeek}-${entry.period.startTime}-${entry.classroom.roomNumber}`}>
      <td>{entry.dayOfWeek}</td>
      <td>{entry.period.startTime} - {entry.period.endTime}</td>
      <td>{entry.classroom.roomNumber}</td>
      <td>{entry.course.courseName}</td>
      <td>{entry.faculty.firstname} {entry.faculty.lastname}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default ViewTimetable;
