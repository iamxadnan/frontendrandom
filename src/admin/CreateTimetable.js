import React, { useState, useEffect } from "react";
import config from "../config";
import AdminNavBar from "./AdminNavBar";

const CreateTimetable = () => {
  const [daysOfWeek, setDaysOfWeek] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [periods, setPeriods] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    periodId: "",
    roomId: "",
    courseId: "",
    sectionFaculty: "",
  });

  // Fetch courses and other data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [daysResponse, periodsResponse, roomsResponse, coursesResponse, sectionsResponse] = await Promise.all([
          fetch(`${config.url}/admin/days-of-week`).then((res) => res.json()),
          fetch(`${config.url}/admin/periods`).then((res) => res.json()),
          fetch(`${config.url}/admin/rooms`).then((res) => res.json()),
          fetch(`${config.url}/admin/courses`).then((res) => res.json()),
          fetch(`${config.url}/admin/sectionfaculty`).then((res) => res.json()),
        ]);
  
        setDaysOfWeek(daysResponse);
        setPeriods(periodsResponse);
        setRooms(roomsResponse);
        setCourses(coursesResponse);
        setSections(sectionsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Parse sectionFaculty into sectionId and facultyId
    const [sectionId, facultyId] = formData.sectionFaculty.split(",");
  
    // Construct payload
    const payload = {
      dayOfWeek: formData.dayOfWeek,
      periodId: parseInt(formData.periodId),
      roomId: parseInt(formData.roomId),
      courseId: parseInt(formData.courseId),
      sectionFaculty: `${sectionId},${facultyId}`, // For backend to handle section and faculty
    };
  
    try {
      const response = await fetch(`${config.url}/admin/savetimetable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("Timetable entry saved successfully!");
      } else {
        const errorText = await response.text();
        alert(`Failed to save timetable entry: ${errorText}`);
      }
    } catch (error) {
      console.error("Error saving timetable entry:", error);
    }
  };
  
  return (
    <div>
        <AdminNavBar/>
      <h1>Create Timetable Entry</h1>
      <form onSubmit={handleSubmit} className="form-container" style={{overflow:'scroll'}}>
        <label htmlFor="dayOfWeek">Day of the Week:</label>
        <select name="dayOfWeek" id="dayOfWeek" onChange={handleInputChange} required>
          <option value="">Select Day</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <br /><br />

        <label htmlFor="period">Period:</label>
        <select name="periodId" id="period" onChange={handleInputChange} required>
          <option value="">Select Period</option>
          {periods.map((period) => (
            <option key={period.periodId} value={period.periodId}>
              {period.startTime} - {period.endTime}
            </option>
          ))}
        </select>
        <br /><br />

        <label htmlFor="room">Room:</label>
        <select name="roomId" id="room" onChange={handleInputChange} required>
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.roomId} value={room.roomId}>
              {room.roomNumber}
            </option>
          ))}
        </select>
        <br /><br />

        <label htmlFor="course">Course:</label>
        <select name="courseId" id="course" onChange={handleInputChange} required>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </select>
        <br /><br />

        <label htmlFor="section">Section:</label>
        <select name="sectionFaculty" id="section" onChange={handleInputChange} required>
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option
              key={`${section.section.sectionId}-${section.faculty.facultyId}`}
              value={`${section.section.sectionId},${section.faculty.facultyId}`}
            >
              {section.section.sectionno} - {section.faculty.firstname}
            </option>
          ))}
        </select>
        <br /><br />

        <button  className="submit-button" type="submit">Save Timetable Entry</button>
      </form>
    </div>
  );
};

export default CreateTimetable;
