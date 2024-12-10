import React, { useState, useEffect } from "react";
import config from "../config";
import AdminNavBar from "./AdminNavBar";

const AddSection = () => {
  const [sectionNo, setSectionNo] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [sectionCapacity, setSectionCapacity] = useState(20);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [courses, setCourses] = useState([]); // State to store courses

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${config.url}/admin/courses`);
      const data = await response.json(); // Parse the response as JSON
  
      // Assuming the response is an array of courses (not inside a 'courses' key)
      if (Array.isArray(data)) {
        setCourses(data); // Set the courses state with the array of courses
      } else {
        setMessage("No courses available.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setMessage("Failed to load courses.");
      setIsSuccess(false);
    }
  };
  

  useEffect(() => {
    fetchCourses(); // Call the fetch function when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!sectionCapacity || isNaN(sectionCapacity) || sectionCapacity <= 0) {
      setMessage("Please enter a valid section capacity.");
      setIsSuccess(false);
      return;
    }

    const sectionData = {
      sectionNo,
      courseCode,
      sectionCapacity,
    };

    console.log("Sending data:", sectionData);

    try {
      const response = await fetch(`${config.url}/admin/addsections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Section added successfully!");
        setSectionNo("");
        setCourseCode("");
        setSectionCapacity(20);
      } else {
        const errorData = await response.json();
        setIsSuccess(false);
        setMessage(errorData.error || "Failed to add section.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setIsSuccess(false);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <AdminNavBar/>
    <div className="container">
      <h1>Add New Section</h1>
      {message && <p className={`message ${isSuccess ? "success" : "error"}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="sectionNo">Section Number:</label>
          <input
            type="text"
            id="sectionNo"
            value={sectionNo}
            onChange={(e) => setSectionNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code:</label>
          <select
  id="courseCode"
  value={courseCode}
  onChange={(e) => setCourseCode(e.target.value)}
  required
>
  <option value="">Select Course</option>
  {courses.length > 0 ? (
    courses.map((course) => (
      <option key={course.courseCode} value={course.courseCode}>
        {course.courseName} - {course.courseCode}
      </option>
    ))
  ) : (
    <option value="">No courses available</option>
  )}
</select>

        </div>
        <div className="form-group">
          <label htmlFor="sectionCapacity">Section Capacity:</label>
          <input
            type="number"
            id="sectionCapacity"
            value={sectionCapacity}
            onChange={(e) => setSectionCapacity(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Section</button>
      </form>

    </div>
    </div>
  );
};

export default AddSection;
