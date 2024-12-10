import React, { useState } from 'react';
import axios from 'axios';
import './UserRegistration.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function UserRegistration() {
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        contact: '',
        dateOfBirth: '',
        department: '',
        role: '',
        designation: '',
        joinyear: '',
        parentName: '',
        regstatus: 'waiting',
        cgpa: 0.00,
        feeStatus: false,
        image: null  
    });

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);
        setFormData((prevState) => ({
            ...prevState,
            role: selectedRole,
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

   
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
     
        const data = new FormData();
        
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        
        try {
            let response;
            if (formData.role === 'STUDENT') {
                response = await axios.post(`${config.url}/student/register`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else if (formData.role === 'FACULTY') {
                response = await axios.post(`${config.url}/faculty/register`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            if (response.status === 200) {
                setMessage(formData.role === 'STUDENT' ? "Student Added Successfully" : "Faculty Added Successfully");
                setTimeout(() => navigate('/login'), 5000);
            }
        } catch (error) {
            console.error('Error registering:', error);
        }
    };
    const validateDOB = () => {
        const dob = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        return age >= 15 || (age === 15 && today >= new Date(dob.setFullYear(today.getFullYear())));
    };

    return (
        <div>
            <h1 align="center" style={{ marginTop: "20px" }}>USER REGISTRATION</h1>
          
            <section className="login-section">
                {message ? <p style={{ color: "green", fontWeight: "bolder" }}>{message}</p> : <p></p>}
                
                <div className="form-container" align="center" style={{ height: "500px", overflow: "scroll", borderWidth: "2px" }}>
                    <form id="userForm" onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname"  >Last Name:</label>
                            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" >Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
  title="Enter a valid email address." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" >Password:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}" 
  title="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="" disabled>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact:</label>
                            <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange}  pattern="^[6-9]\d{9}$" 
  title="Contact number must start with 6, 7, 8, or 9 and be exactly 10 digits long." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth}  onChange={(event) => {
      handleChange(event);
      if (!validateDOB()) {
          alert("User must be at least 18 years old.");
      }
  }}  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                                <option value="" disabled>Select department</option>
                                <option value="CSE">Computer Science Engineering (CSE)</option>
                                <option value="CSIT">Computer Science & Information Technology (IT)</option>
                                <option value="ECE">Electronics and Communication Engineering (ECE)</option>
                                <option value="ME">Artificial Intelligence & Data Science (AIDS)</option>
                                <option value="CIVIL">Civil Engineering</option>
                                <option value="EE">Electrical Engineering (EE)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role:</label>
                            <select id="role" name="role" value={formData.role} onChange={handleRoleChange} required>
                                <option value="">Select your role</option>
                                <option value="STUDENT">Student</option>
                                <option value="FACULTY">Faculty</option>
                            </select>
                        </div>
                        
                        {/* Image upload field */}
                        <div className="form-group">
                            <label htmlFor="image">Profile Picture:</label>
                            <input type="file" id="image" name="image" onChange={handleFileChange}  accept="image/jpeg, image/png" 
  required/>
                        </div>

                        {role === 'STUDENT' && (
                            <div id="studentFields" className="conditional-form">
                                <h3>Student Information</h3>
                                <div className="form-group">
                                    <label htmlFor="joinyear">Joining Year:</label>
                                    <input type="text" id="joinyear" name="joinyear" value={formData.joinyear} onChange={handleChange} pattern="^(20[0-9]{2})$" 
  title="Joining year must be a valid year between 2000 and 2099."  required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="parentName">Parent name:</label>
                                    <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} pattern="[A-Za-z ]{2,50}" 
  title="Parent name must contain only alphabets and spaces (2-50 characters)."  required />
                                </div>
                                <input type="hidden" id="cgpa" name="cgpa" value="0.00" />
                                <input type="hidden" id="feeStatus" name="feeStatus" value="false" />
                            </div>
                        )}

                        {role === 'FACULTY' && (
                            <div id="facultyFields" className="conditional-form">
                                <h3>Faculty Information</h3>
                                <div className="form-group">
                                    <label htmlFor="designation">Designation:</label>
                                    <select
                                        id="designation"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select designation</option>
                                        <option value="Professor">Professor</option>
                                        <option value="HOD">HOD</option>
                                        <option value="Deputy HOD">Deputy HOD</option>
                                        <option value="Lecturer">Lecturer</option>
                                        <option value="Assistant Professor">Assistant Professor</option>
                                        <option value="Senior Professor">Senior Professor</option>
                                    </select>
                                </div>
                                <input type="hidden" id="salary" name="salary" value="0.00" />
                                <input type="hidden" id="reg_status" name="reg_status" value="WAITING" />
                                <input type="hidden" id="regstatus" name="regstatus" value="WAITING" />
                            </div>
                        )}

                        <div>
                            <button type="submit" className="submit-button">Register</button>
                        </div>

                    </form>
                    
                </div>
                <div className="login-right">
                        <img src="./images/hero.png" alt="Books" />
                    </div>
            </section>
            
        </div>
    );
}

export default UserRegistration;
