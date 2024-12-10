import React, { useState } from "react";
import axios from "axios";
import config from "../config";

import AdminNavBar from "./AdminNavBar";


const CreateRoom = () => {
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomType: "",
    subcategory: "",
    capacity: 0,
    availableBeds: 0,
    price: 0,
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/addroom`, roomData);
      setMessage("Room created successfully!");
      console.log(response.data);
      setRoomData({
        roomNumber: "",
        roomType: "",
        subcategory: "",
        capacity: 0,
        availableBeds: 0,
        price: 0,
      });
    } catch (error) {
      console.error("Error creating room:", error);
      setMessage("Failed to create room. Please try again.");
    }
  };

  return (
    <div>
        <AdminNavBar/>
    <div style={{margin:'50px'}}>
      <h2>Create Room</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="form-container" style={{overflow:'scroll'}}>
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={roomData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            value={roomData.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="DELUXE">Deluxe</option>
            <option value="LUXURY">Luxury</option>
            <option value="SUPER_LUXURY">Super Luxury</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subcategory">Subcategory</label>
          <select
            id="subcategory"
            name="subcategory"
            value={roomData.subcategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Subcategory</option>
            <option name="2 BED AC"value="TWO_BED_AC">2-Bed AC</option>
            <option name="3-BED AC" value="THREE_BED_AC">3-Bed AC</option>
            <option name="2-BED NON-AC" value="TWO_BED_NON_AC">2-Bed Non-AC</option>
            <option name="SINGLE-BED AC"value="SINGLE_BED_AC">Single-Bed AC</option>
            <option name="SINGLE-BED NON-AC" value="SINGLE_BED_NON_AC">Single-Bed Non-AC</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={roomData.capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableBeds">Available Beds</label>
          <input
            type="number"
            id="availableBeds"
            name="availableBeds"
            value={roomData.availableBeds}
            onChange={handleChange}
            min="0"
            max={roomData.capacity}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={roomData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="submit-button">Create Room</button>
      </form>
    </div>
    </div>
  );
};

export default CreateRoom;