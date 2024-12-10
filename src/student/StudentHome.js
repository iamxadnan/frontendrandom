import React, { useEffect, useState } from 'react';
import GetStudNotifications from './GetStudNotifications'
import './StudentHome.css';
import StudentNavBar from './StudentNavBar';
import config from '../config';


const StudentHome = () => {
  const [profileImage, setProfileImage] = useState('');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [studentId,setStudentId]=useState("");
  const [courses,setCourses]=useState("");

  // Retrieve user data from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user')) || {};
  const { firstname = "John" } = user; // Default to "John" if no user data

  useEffect(() => {
    // Retrieve the user email from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    const { email } = user;
    console.log(user); 
    setStudentId(user.studentId);

    if (email) {
      // Fetch the profile picture from the backend
      fetch(`${config.url}/student/profile-picture?email=${(email)}`)
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
  useEffect(() => { 
    if (studentId) { 
        console.log("Fetching courses for facultyId:", studentId); 
        fetch(`${config.url}/student/courses/${studentId}`) 
            .then((response) => { 
                console.log("Response:", response); 
                if (!response.ok) { 
                    throw new Error(`HTTP error! status: ${response.status}`); 
                } 
                return response.json(); 
            }) 
            .then((data) => { 
                console.log("Courses data:", data); 
                setCourses(data); 
            }) 
            .catch((error) => console.error("Error fetching courses:", error)); 
    } 
}, [studentId]);

  // Data for the calendar
  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 }, // Adjust for leap year if necessary
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
  ];

  // Important dates and their corresponding events
  const importantDates = {
    "January": [
      { date: 1, event: "New Year's Day (Holiday)" },
      { date: 15, event: "Republic Day Preparations (Cultural activity)" },
      { date: 26, event: "Republic Day (Holiday)" },
      { date: 31, event: "End of Semester Exams Begin (Exam)" }
    ],
    "February": [
      { date: 14, event: "Valentine's Day (Cultural Event)" },
      { date: 28, event: "Mid-Semester Break Starts (Vacation)" }
    ],
    "March": [
      { date: 8, event: "International Women's Day (Special Celebration)" },
      { date: 17, event: "Holi (Festival Holiday)" },
      { date: 25, event: "End of Semester Exams End (Exam)" }
    ],
    "April": [
      { date: 2, event: "Good Friday (Holiday)" },
      { date: 14, event: "Ambedkar Jayanti (Holiday)" },
      { date: 22, event: "Sports Day (Sports Event)" }
    ],
    "May": [
      { date: 1, event: "Labour Day (Holiday)" },
      { date: 10, event: "Summer Vacation Starts (Vacation)" },
      { date: 15, event: "Summer Classes Begin (Academic Event)" }
    ],
    "June": [
      { date: 5, event: "World Environment Day (Cultural Activity)" },
      { date: 20, event: "End of Summer Classes (Academic Event)" },
      { date: 30, event: "University Cultural Festival Begins (Cultural Event)" }
    ],
    "July": [
      { date: 1, event: "Monsoon Session Begins (Academic Event)" },
      { date: 15, event: "Annual Sports Meet (Sports Event)" },
      { date: 22, event: "Eid al-Adha (Holiday)" }
    ],
    "August": [
      { date: 15, event: "Independence Day (Holiday)" },
      { date: 25, event: "College Cultural Night (Cultural Event)" },
      { date: 30, event: "Mid-Semester Exams Begin (Exam)" }
    ],
    "September": [
      { date: 5, event: "Teacher's Day (Special Celebration)" },
      { date: 15, event: "Start of Diwali Preparations (Cultural Activity)" },
      { date: 30, event: "End of Mid-Semester Exams (Exam)" }
    ],
    "October": [
      { date: 2, event: "Gandhi Jayanti (Holiday)" },
      { date: 15, event: "Annual College Fest Begins (Cultural Event)" },
      { date: 20, event: "Start of End Semester Exams (Exam)" },
      { date: 31, event: "Halloween (Fun Activity)" }
    ],
    "November": [
      { date: 5, event: "Diwali (Holiday)" },
      { date: 15, event: "Post-Diwali Break (Vacation)" },
      { date: 25, event: "Sports Competition Finals (Sports Event)" }
    ],
    "December": [
      { date: 1, event: "College Reopens (End of Vacation)" },
      { date: 15, event: "Christmas Preparations (Cultural Activity)" },
      { date: 25, event: "Christmas (Holiday)" },
      { date: 31, event: "Year-End Party (Fun Activity)" }
    ]
  };

  const handleNext = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const renderCalendar = (month) => {
    const days = Array.from({ length: month.days }, (_, i) => i + 1);
  
    return (
      <div className="month" key={month.name}>
        <h3>{month.name}</h3>
        <div className="calendar-grid">
          {days.map((day) => {
            const dateDetails = importantDates[month.name]?.find(d => d.date === day);
            const isHighlighted = dateDetails ? 'highlighted' : '';
  
            return (
              <div
                key={day}
                className={`calendar-cell ${isHighlighted}`}
                title={dateDetails?.event || ''}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  

  return (
    <div className="student-home">
      <StudentNavBar />
      <div className="header-banner">
        <div className="welcome-message">
          <p className="date">September 4, 2023</p>
          <h1>Welcome back, {firstname}!</h1>
          <p>Always stay updated in our ERP </p>
        </div>
        <div className="profile-image-container" style={{ textAlign: 'right', padding: '10px' }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              style={{ width: '200px', height: '200px', borderRadius: '70%' }}
            />
          ) : (
            <div style={{ fontSize: '14px', color: '#666', width: '200px', height: '200px', borderRadius: '70%' }}>
              No Profile Picture
            </div>
          )}
        </div>
      </div>
      <div className="dashboard-content">
      <section className="enrolled-courses"> 
          <h2> 
            Enrolled Courses <span className="see-all">See all</span> 
          </h2> 
          <div className="courses-list"> 
            {courses.length > 0 ? ( 
              courses.map((course) => ( 
                <div key={course.courseCode} className="course-card"> 
                  {course.courseCode} - {course.courseName} 
                </div> 
              )) 
            ) : ( 
              <p>No courses enrolled yet.</p> 
            )} 
          </div> 
        </section>
      <section className="additional-info">
        <div>
            {renderCalendar(months[currentMonthIndex])}
            <div className="pagination-controls">
              <button onClick={handlePrevious} disabled={currentMonthIndex === 0}>Previous</button>
              <button onClick={handleNext} disabled={currentMonthIndex === months.length - 1}>Next</button>
            </div>
          </div>
          <div className="daily-notice">
           <GetStudNotifications/>
          </div>
        </section>
        
        <section className="finance">
          <div className="finance-cards">
            <div className="finance-card">
              <h2>CGPA</h2>
              <p>9.6</p>
              <span>As per now</span>
            </div>
            <div className="finance-card selected">
              <h2>ATTENDENCE</h2>
              <p>96%</p>
              <span>As per now</span>
            </div>
            <div className="finance-card">
              <h2>NEXT CLASS AT</h2>
              <p>9:30</p>
              <span>DBMS</span>
            </div>
          </div>
        </section>
        
       
      </div>
    </div>
  );
};

export default StudentHome;
