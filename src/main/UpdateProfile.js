import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import config from "../config";

const UpdateProfile = () => {
  const location = useLocation();
  const email = location.state?.email; // Get email from navigation state
  const [profileData, setProfileData] = useState({
    email: email || "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    gender: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Optionally, fetch existing profile data
    if (email) {
      axios
        .get(`${config.url}/faculty/profile?email=${email}`)
        .then((response) => {
          setProfileData((prev) => ({ ...prev, ...response.data }));
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    }
  }, [email]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profileData)
      const response = await axios.put(
        `${config.url}/faculty/update-profile`,
        profileData
      );
      
      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="update-profile" style={{ marginTop: "190px" }}>
  <h2>Update Profile</h2>
  <form className="form-container" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="firstname">First Name:</label>
      <input
        id="firstname"
        type="text"
        name="firstname"
        value={profileData.firstname}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="lastname">Last Name:</label>
      <input
        id="lastname"
        type="text"
        name="lastname"
        value={profileData.lastname}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="dateOfBirth">Date of Birth:</label>
      <input
        id="dateOfBirth"
        type="date"
        name="dateOfBirth"
        value={profileData.dateOfBirth}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={profileData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        name="password"
        value={profileData.password}
        onChange={handleChange}
        required
      />
    </div>

    <button className="submit-button" type="submit">
      Update Profile
    </button>
  </form>
  {responseMessage && <p>{responseMessage}</p>}
</div>

  );
};

export default UpdateProfile;
