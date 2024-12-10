import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function StudentNavBar() {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    // Retrieve the user email from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    const { email } = user;

    if (email) {
      // Fetch the profile picture from the backend
      fetch(`http://localhost:2001/student/profile-picture?email=${(email)}`)
        .then((response) => {
          if (response.ok) {
            return response.blob(); // Fetch as a blob to handle images
          }
          throw new Error('Failed to fetch profile picture');
        })
        .then((blob) => {
          // Create a URL for the image blob
          const imageUrl = URL.createObjectURL(blob);
          setProfileImage(imageUrl);
        })
        .catch((error) => console.error('Error fetching profile picture:', error));
    }
  }, []);

  useEffect(() => {
    // Cleanup the blob URL when the component unmounts
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  return (
    <div style={{marginTop:'50px'}}>
      

      {/* Navigation Bar */}
      <nav className="mainnav"  style={{justifyContent:'center'}}>
        <ul className="ulo">
          <li className="lio">
            <Link to="/studenthome">DASHBOARD</Link>
          </li>
          <li className="lio">
            <Link to="/viewcoursesandinternals">View Courses</Link>
          </li>
          <li className="lio">
            <Link to="/viewtimetable">View Timetable</Link>
          </li>
          <li className="lio">
            <Link to="/registerhosteler">HOSTEL</Link>
          </li>
          <li className="lio">
            <Link to="/riseticket">TICKET ISSUES</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
}
