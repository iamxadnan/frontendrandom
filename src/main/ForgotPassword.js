import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Forgot Password OTP",
    message: "Please use the OTP to reset your password.",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${config.url}/email/send`, formData);
      setResponseMessage("OTP sent successfully!");
      navigate("/validate-otp", { state: { email: formData.email } });
    } catch (error) {
      setResponseMessage("Error sending email. Please try again.");
    }
  };

  return (
    <div className="forgot-password" style={{ marginTop: "190px" }}>
    <h2>Forgot Password</h2>
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
  
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
  
      <button className="submit-button" type="submit">
        Send OTP
      </button>
    </form>
    {responseMessage && <p>{responseMessage}</p>}
  </div>
  
  );
};

export default ForgotPassword;
