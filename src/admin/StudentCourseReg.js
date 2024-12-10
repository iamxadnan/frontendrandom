import React, { useEffect, useState } from "react";
import config from "../config";
import "./StudentCourseReg.css";
import AdminNavBar from "./AdminNavBar";

export default function StudentCourseReg() {
  const [facultyAndSections, setFacultyAndSections] = useState([]);
  const [selectedSections, setSelectedSections] = useState({});
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetch(`${config.url}/student/studentandsection`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch faculty and section data");
        }
        return response.json();
      })
      .then((data) => {
        setFacultyAndSections(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error fetching faculty and section data.");
      });
  }, []);

  // Handle section selection change
  const handleSectionChange = (courseCode, sectionNo, facultyId) => {
    setSelectedSections((prev) => ({
      ...prev,
      [courseCode]: { sectionNo, facultyId },
    }));
  };

  const handleSubmit = (event) => { 
    event.preventDefault(); 
 
    if (!studentId) { 
      setMessage("Please enter a valid Student ID."); 
      return; 
    } 
 
    // Structure the payload for multiple courses 
    const payload = { 
      studentId, 
      courses: Object.keys(selectedSections).map((courseCode) => ({ 
        courseCode, 
        sectionNo: selectedSections[courseCode].sectionNo, 
        facultyId: selectedSections[courseCode].facultyId, 
      })), 
    }; 
 
    console.log("Payload Before Submit:", JSON.stringify(payload, null, 2)); // Debug log 
 
    fetch(`${config.url}/student/addsectionstudent`, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(payload), 
    }) 
      .then((response) => { 
        if (!response.ok) { 
          return response.text().then((errorText) => { 
            throw new Error(`Server responded with: ${response.status} - ${errorText}`); 
          }); 
        } 
        return response.text(); 
      }) 
      .then((result) => { 
        setMessage(result); 
        setSelectedSections({}); 
        setStudentId(""); 
      }) 
      .catch((error) => { 
        console.error("Error submitting data:", error.message); 
        setMessage(error.message); 
      }); 
  };
  return (
    <div>
      <AdminNavBar/>
    <div className="student-course-reg-container">
      <h2>Student Course Registration</h2>

      {message && <p className="student-course-reg-message" style={{color:'green'}}>{message}</p>}

      <form onSubmit={handleSubmit} className="student-course-reg-form" >
        {/* Student ID Input */}
        <div style={{margin:'30px'}}>
          <label htmlFor="studentId" className="student-course-reg-label" >
            Student ID:
          </label>
          <input
          
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="form-groups" style={{width:'500px'}}
          />
        </div>

        {/* Faculty and Section Selection */}
        <div>
          {(() => {
            const renderedCourses = new Set(); // Track rendered courses
            return facultyAndSections.map((entry) => {
              if (renderedCourses.has(entry.course.courseCode)) {
                return null; // Skip if course is already rendered
              }
              renderedCourses.add(entry.course.courseCode); // Mark course as rendered

              return (
                <div
                  key={entry.course.courseCode}
                  className="form-container" 
                  style={{width:"400px",margin:"10px",height:"200px",}}
                >
                  <h3 className="form-groups">
                    {entry.course.courseCode} - {entry.course.courseName}
                  </h3>
                  <p className="student-course-reg-card-info">
                    <strong>LTPS Structure:</strong> {entry.course.courseCredits}
                  </p>

                  <p className="student-course-reg-card-label">Select Section:</p>
                  <select
                    className="student-course-reg-card-select"
                    onChange={(e) =>
                      handleSectionChange(
                        entry.course.courseCode,
                        e.target.value,
                        entry.faculty.facultyId
                      )
                    }
                    required
                  >
                    <option value="">Select a Section</option>
                    {facultyAndSections
                      .filter((item) => item.course.courseCode === entry.course.courseCode)
                      .map((sectionEntry) => (
                        <option
                          key={sectionEntry.section.sectionno}
                          value={sectionEntry.section.sectionno}
                        >
                          {sectionEntry.section.sectionno} - {sectionEntry.faculty.lastname}
                        </option>
                      ))}
                  </select>
                </div>
              );
            });
          })()}
        </div>

        <button type="submit" className="submit-button" style={{width:"200px",margin:"20px"}}>
          Submit Sections
        </button>
      </form>
    </div>
    </div>
  );
}