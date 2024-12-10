import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import config from "../config"; 
 
const ViewAllSections = () => { 
    const [courses, setCourses] = useState([]); 
    const [sections, setSections] = useState([]); 
    const [selectedCourseCode, setSelectedCourseCode] = useState(null); 
 
    // Fetch all courses 
    useEffect(() => { 
        axios.get(`${config.url}/admin/allcourses`) 
            .then((response) => setCourses(response.data)) 
            .catch((error) => console.error(error)); 
    }, []); 
 
    // Fetch sections for the selected course 
    const fetchSections = (courseCode) => { 
        axios.get(`${config.url}/admin/course/${courseCode}/sections`) 
            .then((response) => { 
                console.log("Sections Data:", response.data);  
                setSections(response.data); 
            }) 
            .catch((error) => console.error(error)); 
    }; 
 
    const handleCourseSelect = (event) => { 
        const courseCode = event.target.value; 
        setSelectedCourseCode(courseCode); 
        fetchSections(courseCode); 
    }; 
 
    return ( 
        <div> 
            <h1>Admin Dashboard</h1> 
            <h2>Select a Course</h2> 
            <select onChange={handleCourseSelect}> 
                <option value="">Select a course</option> 
                {courses.map((course) => ( 
                    <option key={course.courseCode} value={course.courseCode}> 
                        {course.courseName}-{course.courseCode} 
                    </option> 
                ))} 
            </select> 
 
            {sections.length > 0 && ( 
                <div> 
                    <h2>Sections for Course {selectedCourseCode}</h2> 
                    <ul> 
                        {sections.map((section) => ( 
                            <li key={section.sectionId}> 
                                {section.sectionno} -  {section.sectionCapacity} 
                                 
                            </li> 
                        ))} 
                    </ul> 
                </div> 
            )} 
        </div> 
    ); 
}; 
 
export default ViewAllSections;