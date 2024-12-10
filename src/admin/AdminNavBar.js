import React from 'react'
import { Link } from 'react-router-dom'
import './AdminHome.css'

export default function AdminNavBar() {
  return (
    <div style={{marginTop:'50px'}}>
        <div>
  
      <nav className="mainnav">
        <ul className="ulo">
          <li className="lio"><Link  to="/adminhome">DASHBOARD</Link></li>

          <li className="lio"><Link  to="/regrequests">Regsistrion requests</Link></li>
          <li className="lio"><Link  to="/viewleaveapplications">LEAVES</Link></li>

          <li className="lio" ><Link to="/studentservices">STUDENT SERVICES</Link></li>
          <li className="lio" ><Link to="/facultyservices">FACULTY SERVICES</Link></li>
          <li className="lio" ><Link to="/notifications">NOTIFICATIONS</Link></li>
          <li className="lio"><Link  to="/viewalltickets">TICKETS</Link></li>


          <li className="lio"><Link  to="/createsection">CREATE SECTION</Link></li>
          <li className="lio"><Link to="/createroom">CREATE ROOM</Link></li>
          <li className="lio"><Link to="/availablerooms">AVAILABLE ROOMS</Link></li>
          <li className="lio"><Link  to="/addcourse">ADD A COURSE</Link></li>
          <li className="lio"><Link to="/facultytosection">ASSIGN FACULTY TO SECTION</Link></li>
          <li className="lio"><Link to="/viewallcourses">View All Courses</Link></li>
          <li className="lio"><Link to="/addstudenttosection">Add Student in Section</Link></li>
          <li className="lio"><Link to="/createtimetable">Create Timetable</Link></li>
          <li className="lio"><Link to="/viewstudenttimetable">Student Timetable</Link></li>
          
        </ul>
      </nav>
  </div>
    </div>
  )
}
