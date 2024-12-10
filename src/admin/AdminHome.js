import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import config from '../config';
import GetNotifications from '../faculty/GetNotifications';

export default function AdminHome() {
    const [studentCount, setStudentCount] = useState(0);
    const [facultyCount, setFacultyCount] = useState(0);
    const navigate = useNavigate(); // Initialize the navigate hook
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    const firstname = user.firstname;

    useEffect(() => {
        // Fetch student count
        
        
        fetch(`${config.url}/admin/studentcount`)
            .then(response => response.json())
            .then(data => setStudentCount(data))
            .catch(err => console.error("Error fetching student count:", err));

        // Fetch faculty count
        fetch(`${config.url}/admin/facultycount`)
            .then(response => response.json())
            .then(data => setFacultyCount(data))
            .catch(err => console.error("Error fetching faculty count:", err));
    }, []);

    // Function to handle student card button click
    const handleStudentAccess = () => {
        navigate('/studentservices'); // Navigate to student services page
    };

    // Function to handle faculty card button click
    const handleFacultyAccess = () => {
        navigate('/facultyservices'); // Navigate to faculty services page
    };

    return (
        <div className='student-home'>
            <AdminNavBar />
            <div className="header-banner">
        <div className="welcome-message">
          <p className="date">September 4, 2023</p>
          <h1>Welcome back, {firstname}!</h1>
          <p>Always stay updated in our ERP </p>
        </div>
        
      
      </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              
                <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '450px' }}>
                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                        <svg style={{ transform: 'rotate(-90deg)' }} width="120" height="120">
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#d6d6d6"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#00aaff"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray="314" // Circumference of the circle (2 * π * r)
                                strokeDashoffset={250  - (studentCount / 100) * 314} // Dynamic offset based on percentage
                                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                            />
                        </svg>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}>
                            {studentCount}
                        </div>
                    </div>
                    <h3>VIEW STUDENT PROFILES</h3>
                    <button
                        onClick={handleStudentAccess}
                        style={{ padding: '10px 20px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        ACCESS
                    </button>
                </div>

 
                <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '450px' }}>
                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                        <svg style={{ transform: 'rotate(-90deg)' }} width="120" height="120">
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#d6d6d6"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#ff5733"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray="314" // Circumference of the circle (2 * π * r)
                                strokeDashoffset={250 - (facultyCount / 100) * 300} // Dynamic offset based on percentage
                                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                            />
                        </svg>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}>
                            {facultyCount}
                        </div>
                    </div>
                    <h3>VIEW FACULTY PROFILES</h3>
                    <button
                        onClick={handleFacultyAccess}
                        style={{ padding: '10px 20px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        ACCESS
                    </button>
                </div>
            </div>
            <GetNotifications/>
        </div>
    );
}
