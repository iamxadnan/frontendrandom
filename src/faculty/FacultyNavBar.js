import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

export default function FacultyNavBar() {
  const [profileImage, setProfileImage] = useState('');
  const [leaveDropdownOpen, setLeaveDropdownOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    const { email } = user;

    if (email) {
      fetch(`${config.url}/faculty/profile-picture?email=${encodeURIComponent(email)}`)
        .then((response) => {
          if (response.ok) {
            return response.blob(); 
          }
          throw new Error('Failed to fetch profile picture');
        })
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setProfileImage(imageUrl);
        })
        .catch((error) => console.error('Error fetching profile picture:', error));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const toggleLeaveDropdown = () => {
    setLeaveDropdownOpen((prev) => !prev);
  };

  return (
    <div style={{marginTop:"70px"}}> 
      
      <nav className="mainnav" style={{ justifyContent: 'center', position: 'relative' }}>
        <ul className="ulo">
          <li className="lio"><Link to="/facultyhome">DASHBOARD</Link></li>
          
          <li
            className="lio"
            onMouseEnter={toggleLeaveDropdown}
            onMouseLeave={toggleLeaveDropdown}
            style={{ position: 'relative' }}
          >
            <li className='lio' style={{fontWeight:'bold',fontSize:'18px'}}>LEAVE</li>
            {leaveDropdownOpen && (
              <ul>
                <li style={{ padding: '5px 20px' }}><Link to="/applyleave">Apply Leave</Link></li>
                <li style={{ padding: '5px 20px' }}><Link to="/viewappliedleaves">Leave Status</Link></li>
              </ul>
            )}
          </li>
          
          <li className="lio"><Link to="/getfacultynotification">GET NOTIFICATION</Link></li>
          <li className="lio"><Link to="/riseticket">TICKET ISSUES</Link></li>
          <li className="lio"><Link to="/assigninternals">ASSIGN Internals</Link></li>
        </ul>
      </nav>
    </div>
  );
}
