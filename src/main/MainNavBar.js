import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import LandingPage from './LandingPage';
import Login from './Login';
import UserRegistration from './UserRegistration';
import StudentHome from '../student/StudentHome';
import Facultyhome from '../faculty/Facultyhome';
import AdminHome from '../admin/AdminHome';
import ViewRegistrationRequests from '../admin/ViewRegistrationRequests';
import Notification from '../admin/Notification';
import ViewFaculty from '../admin/ViewFaculty';
import ViewStudents from '../admin/ViewStudents';
import GetNotifications from '../faculty/GetNotifications';
import AboutUs from './AboutUs';
import AddCourse from './../admin/AddCourse';
import AddCourseFacultyRelation from './../admin/AddFacultyToSection';
import ViewAllCourses from './../admin/ViewAllCourses';
import ViewLeaveRequests from '../admin/ViewLeaveRequests';
import FacultyTicketIssues from './../faculty/FacultyTicketIssues';
import ApplyLeave from './../faculty/ApplyLeave';
import CreateRoom from '../admin/CreateRoom';
import AvailableRooms from '../admin/AvailableRooms';
import RegisterHosteler from '../student/RegisterHosteler';
import AddSection from './../admin/AddSection';
import StudentCourseReg from '../admin/StudentCourseReg';
import CreateTimetable from '../admin/CreateTimetable';
import ViewTimetable from '../student/ViewTimetable';
import ViewStudentTimeTable from '../admin/ViewStudentTimeTable';
import FacultyAssignedCourses from '../faculty/AssignInternals';
import ViewAppliedLeaves from './../faculty/ViewAppliedLeaves';
import ViewATickets from './../admin/ViewTickets';
import ViewAssignedCourse from '../student/viewassignedcourse';
import ForgotPassword from './ForgotPassword';
import OtpValidation from './OtpValidation';
import UpdateProfile from './UpdateProfile';


const MainNavBar = () => {
  const navigate = useNavigate();

  
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    sessionStorage.removeItem('user'); 
    navigate('/login');
  };

  return (
    <div>
      <header>
        <div className="large-circle"></div>
        <div className="circle">
          <img src="./images/logo-removebg-preview.png" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/service">Services</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            {user ? (
              <li>
                <button onClick={handleLogout} className="sign-in-btn"  style={{marginTop:'-10px'}}>
                  LOGOUT
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="sign-in-btn">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <Routes>
      <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userregistration" element={<UserRegistration />} />
        <Route path="/studenthome" element={<StudentHome />} />
        <Route path="/facultyhome" element={<Facultyhome />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/forgotpass" element={<ForgotPassword/>}/>
        <Route path="/validate-otp" element={<OtpValidation/>} />
        <Route path="/update-profile" element={<UpdateProfile/>} />
        {/* admin */}
        <Route path="/regrequests" element={<ViewRegistrationRequests />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/facultyservices" element={<ViewFaculty />} />
        <Route path="/studentservices" element={<ViewStudents />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/createsection" element={<AddSection />} />
        <Route path="/facultytosection" element={<AddCourseFacultyRelation />} />
        <Route path="/viewallcourses" element={<ViewAllCourses />} />
        <Route path="/addstudenttosection" element={<StudentCourseReg />} />
        <Route path="viewleaveapplications"  element={<ViewLeaveRequests/>} />
        <Route path="viewalltickets"  element={<ViewATickets/>} />
        <Route path="createroom"  element={<CreateRoom/>} />
        <Route path="availablerooms"  element={<AvailableRooms/>} />
        <Route path="/registerhosteler"  element={<RegisterHosteler/>} />
        <Route path="/createtimetable"  element={<CreateTimetable/>} />
        <Route path="/viewtimetable"  element={<ViewTimetable/>} />
        <Route path="/viewstudenttimetable"  element={<ViewStudentTimeTable/>} />
        <Route path="/assigninternals" element={<FacultyAssignedCourses/>}/>
        <Route path="/viewcoursesandinternals" element={<ViewAssignedCourse/>}/>
        <Route path="/getstudentnotification" element={<GetNotifications/>} />


        {/* faculty */}
        <Route path="/getfacultynotification" element={<GetNotifications/>} />
        <Route path="/riseticket" element={<FacultyTicketIssues/>}/>
        <Route path="/applyleave" element={<ApplyLeave/>}/>
        <Route path = "/viewappliedleaves" element={<ViewAppliedLeaves/>}/>
        
      </Routes>
    </div>
  );
};

export default MainNavBar;
