import React, { useState } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import config from '../config';

const Notification = () => {
    const [formData, setFormData] = useState({
        role: "STUDENT",
        mesg: "",
        scheduledTime: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.url}/admin/notification`, formData);
            setMessage(response.data);
        } catch (error) {
            setMessage("Failed to post notification.");
        }
    };

    return (
        <div style={{ fontFamily: "'Arial', sans-serif", backgroundColor: '#f5f5f5', margin: 0, padding: 0 }}>
            {/* Navigation Bar */}
            <AdminNavBar />

            {/* Post New Notification Section */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
                <div>
                    <form onSubmit={handleSubmit}className='form-container'>
                        <h3>POST NEW NOTIFICATION</h3>
                        {message && <p>{message}</p>}

                        {/* Audience Field */}
                        <div className='form-group'>
                            <label htmlFor="role" style={{ fontWeight: 'bold' }}>Audience</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange} >
                                <option value="STUDENT">To Students</option>
                                <option value="FACULTY">To Faculty</option>
                                <option value="ADMIN">To Admin</option>
                            </select>
                        </div>

                        {/* Schedule Field */}
                        <div className='form-group'>
                            <label htmlFor="scheduledTime" style={{ fontWeight: 'bold' }}>Schedule</label>
                            <input type="datetime-local" id="scheduledTime" name="scheduledTime" value={formData.scheduledTime} onChange={handleChange} />
                        </div>

                        {/* Message Field */}
                        <div className='form-group' >
                            <label htmlFor="mesg" style={{ fontWeight: 'bold' }}>Message</label>
                            <textarea id="mesg" name="mesg" placeholder="Notification Message" value={formData.mesg} onChange={handleChange} ></textarea>
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div >
                            <button type="submit" className='submit-button' style={{marginBottom:'10px',width:"30%"}}>POST</button>
                            <button type="reset" className='clear-button'  style={{marginBottom:'10px',width:"30%"}} onClick={() => setFormData({ role: "STUDENT", mesg: "", scheduledTime: "" })} >CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Notification;
