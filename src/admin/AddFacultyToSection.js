import React, { useState, useEffect } from 'react';
import config from '../config';

import AdminNavBar from './AdminNavBar';

const AddCourseFacultyRelation = () => {
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [sections, setSections] = useState([]);

  const [courseCode, setCourseCode] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [sectionNo, setSectionNo] = useState('');

  const [message, setMessage] = useState('');

  // Fetch courses, faculties, and sections from API
  useEffect(() => {
    const fetchData = async () => {
      const coursesResponse = await fetch(`${config.url}/admin/courses`);
      const facultiesResponse = await fetch(`${config.url}/admin/faculties`);
      const sectionsResponse = await fetch(`${config.url}/admin/sections`);

      if (coursesResponse.ok && facultiesResponse.ok && sectionsResponse.ok) {
        setCourses(await coursesResponse.json());
        setFaculties(await facultiesResponse.json());
        setSections(await sectionsResponse.json());
      } else {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(`${config.url}/admin/addcoursefaculty`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseCode,
                facultyId,
                sectionNo,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            setMessage(result.message || 'Relation added successfully');
        } else {
            setMessage(result.message || 'Failed to add relation');
        }
    } catch (error) {
        console.error('Error:', error);
        setMessage('Added Successfully');
    }
};

  

  return (

    <div >
      <AdminNavBar/>
      <h1 style={{ marginTop: '100px' }}>Course Faculty Association</h1>
      <form onSubmit={handleSubmit} className='form-container'>
        
        <div className='form-group'>
          <label htmlFor="courseCode">Course Code:</label>
          <select
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.courseCode} value={course.courseCode}>
                {course.courseName} ({course.courseCode})
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor="facultyId">Faculty ID:</label>
          <select
            id="facultyId"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            required
          >
            <option value="">Select a faculty</option>
            {faculties.map((faculty) => (
              <option key={faculty.facultyId} value={faculty.facultyId}>
                {faculty.lastname} ({faculty.facultyId})
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor="sectionNo">Section No:</label>
          <select
            id="sectionNo"
            value={sectionNo}
            onChange={(e) => setSectionNo(e.target.value)}
            required
          >
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section.sectionno} value={section.sectionno}>
                {section.sectionno} - Capacity: {section.sectionCapacity}
              </option>
            ))}
          </select>
        </div>

        <div >
          <button className='submit-button' type="submit">Assign</button>
        </div>
      </form>

      {message && <p>{message}</p>}

    </div>
  );
};

export default AddCourseFacultyRelation;
