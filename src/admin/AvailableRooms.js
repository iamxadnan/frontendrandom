import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import AdminNavBar from "./AdminNavBar";



const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  // Fetch available rooms from the backend
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/rooms/available`);
        setRooms(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching available rooms:", err);
        setError("Failed to load available rooms. Please try again later.");
      }
    };

    fetchAvailableRooms();
  }, []);

  return (
    <div style={{marginTop:'70px'}}>
      <AdminNavBar/>
    <div style={{marginTop:'70px'}} >
      <h2>Available Rooms</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && rooms.length === 0 && <p>No available rooms found.</p>}
      {rooms.length > 0 && (
        <table className="table">
          <thead>
            <tr>

              <th>Room Number</th>
              <th>Room Type</th>
              <th>Subcategory</th>
              <th>Capacity</th>
              <th>Available Beds</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.roomType}</td>
                <td>{room.subcategory}</td>
                <td>{room.capacity}</td>
                <td>{room.availableBeds}</td>
                <td>{room.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default AvailableRooms;
