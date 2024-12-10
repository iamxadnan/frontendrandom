import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacultyNavBar from './FacultyNavBar';
import config from '../config';

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        femail: "", // Changed from facultyId to femail
        category: "Casual Leave",
        leaveType: "Paid",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [message, setMessage] = useState("");

    // Fetch faculty email from session storage
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user')); // Parse session data
        if (user && user.role === 'FACULTY') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                femail: user.email, // Set femail instead of facultyId
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format dates to yyyy-MM-dd format
        const formattedStartDate = new Date(formData.startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(formData.endDate).toISOString().split('T')[0];

        const requestData = {
            ...formData,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        };

        try {
            const response = await axios.post(`${config.url}/faculty/applyleave`, requestData);
            setMessage(response.data);
        } catch (error) {
            console.error(error);
            setMessage("Failed to submit leave application.");
        }
    };

    // Internal CSS
    const styles = {
        container: {
            fontFamily: "'Arial', sans-serif",
            backgroundColor: '#f5f5f5',
            margin: 0,
            padding: 0,
        },
        formContainer: {
            display: 'flex',
            justifyContent: 'center',
            margin: '50px 0',
        },
        formWrapper: {
            backgroundColor: '#6c6d6d',
            color: '#fff',
            padding: '40px',
            borderRadius: '10px',
            width: '80%',
            maxWidth: '900px',
            border: '2px solid black',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        title: {
            fontFamily: "'Alike', serif",
            textAlign: 'center',
            marginBottom: '15px',
            fontSize: '24px',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        label: {
            fontWeight: 'bold',
        },
        input: {
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        textarea: {
            height: '90px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
        },
        submitButton: {
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
        },
        cancelButton: {
            backgroundColor: '#aaa',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <FacultyNavBar />
            <div style={styles.formContainer}>
                <div style={styles.formWrapper}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <h3 style={styles.title}>APPLY FOR LEAVE</h3>
                        {message && <p>{message}</p>}

                        <div style={styles.inputGroup}>
                            <label htmlFor="femail" style={styles.label}>Faculty Email</label>
                            <input
                                type="text"
                                id="femail"
                                name="femail"
                                value={formData.femail}
                                readOnly
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="category" style={styles.label}>Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Emergency Leave">Emergency Leave</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="leaveType" style={styles.label}>Leave Type</label>
                            <select
                                id="leaveType"
                                name="leaveType"
                                value={formData.leaveType}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="startDate" style={styles.label}>Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="endDate" style={styles.label}>End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label htmlFor="reason" style={styles.label}>Reason</label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                style={styles.textarea}
                            ></textarea>
                        </div>

                        <div style={styles.buttonGroup}>
                            <button
                                type="reset"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        category: "Casual Leave",
                                        leaveType: "Paid",
                                        startDate: "",
                                        endDate: "",
                                        reason: "",
                                    })
                                }
                                style={styles.cancelButton}
                            >
                                CANCEL
                            </button>
                            <button type="submit" style={styles.submitButton}>APPLY</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;
