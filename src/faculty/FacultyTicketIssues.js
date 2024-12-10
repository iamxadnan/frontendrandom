import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import StudentNavBar from '../student/StudentNavBar';
import FacultyNavBar from './FacultyNavBar';
import AdminNavBar from '../admin/AdminNavBar';
import config from '../config';


const FacultyTicketIssues = () => {
    const user = useMemo(() => {
      return JSON.parse(sessionStorage.getItem("user")) || {};
    }, []); // Empty dependency array ensures this only runs once
  
    const [formData, setFormData] = useState({
      typeofissue: "",
      issuemsg: "",
      userid: "" // Initialize as an empty string
    });
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      // Ensure userid is set in formData when user object is available
      if (user.userid) {
        setFormData((prevState) => ({
          ...prevState,
          userid: user.userid
        }));
      }
    }, [user.userid]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.url}/faculty/riseticket`, formData);
            setMessage(response.data);
        } catch (error) {
            setMessage("Failed to Rise Ticket.");
        }
    };

    const renderNavBar = () => {
        switch (user.role) {
            case 'STUDENT':
                return <StudentNavBar />;
            case 'FACULTY':
                return <FacultyNavBar />;
            case 'ADMIN':
                return <AdminNavBar />;
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: "'Arial', sans-serif", backgroundColor: '#f5f5f5', margin: 0, padding: 0 }}>
            {/* Dynamic Navigation Bar */}
            {renderNavBar()}

            {/* Post New Notification Section */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
                <div style={{
                    backgroundColor: '#6c6d6d',
                    color: '#333',
                    padding: '40px',
                    borderRadius: '10px',
                    width: '80%',
                    maxWidth: '900px',
                    border: '2px solid black',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{
                            fontFamily: "'Alike', serif",
                            textAlign: 'center',
                            marginBottom: '15px',
                            fontSize: '24px'
                        }}>RISE NEW TICKET</h3>
                        {message && <p>{message}</p>}

                        {/* Type of Issue Field */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label htmlFor="typeofissue" style={{ fontWeight: 'bold' }}>Type of Issue</label>
                            <select id="typeofissue" name="typeofissue" value={formData.typeofissue} onChange={handleChange} style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }}>
                                <option value="NETWORK">Network Issues</option>
                                <option value="ERP">ERP Issues</option>
                                <option value="ACEDAMIC">Academic</option>
                                <option value="HOSTEL">Hostel Facility</option>
                                <option value="LIBRARY">Library Issues</option>
                                <option value="TRANSPORT">Transport Services</option>
                                <option value="CAFETERIA">Cafeteria Complaints</option>
                                <option value="FEE_MANAGEMENT">Fee Management</option>
                                <option value="EXAMINATION">Examination Issues</option>
                                <option value="MAINTENANCE">Maintenance Requests</option>
                                <option value="EVENTS">Event Management</option>
                                <option value="TECHNICAL">Technical Glitches</option>
                                <option value="GENERAL_INQUIRY">General Inquiry</option>
                            </select>
                        </div>

                        {/* User ID Field */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label htmlFor="userid" style={{ fontWeight: 'bold' }}>Enter ID</label>
                            <input type="number" id="userid" name="userid" value={formData.userid} readOnly style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }} />
                        </div>

                        {/* Message Field */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label htmlFor="issuemsg" style={{ fontWeight: 'bold' }}>Message</label>
                            <textarea id="issuemsg" name="issuemsg" placeholder="Elaborate Your Issue" value={formData.issuemsg} onChange={handleChange} style={{
                                height: '90px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }}></textarea>
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                            <button type="submit" style={{
                                backgroundColor: '#333',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer'
                            }}>RISE</button>
                            <button type="reset" onClick={() => setFormData({ typeofissue: "", issuemsg: "", userid: formData.userid })} style={{
                                backgroundColor: '#aaa',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer'
                            }}>CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FacultyTicketIssues;
