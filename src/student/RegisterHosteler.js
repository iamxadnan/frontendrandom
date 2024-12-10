import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import StudentNavBar from './StudentNavBar';



const RegisterHosteler = () => {
    const [userid, setUserid] = useState(null);
    const [roomId, setRoomId] = useState('');
    const [message, setMessage] = useState('');
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
  

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setUserid(user.studentId);
        } else {
            setMessage('User not found. Please log in.');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userid) {
            setMessage('User ID is missing. Please log in.');
            return;
        }

        const hostelerData = {
            userid: userid,
            roomId: parseInt(roomId),
            admissionDate: new Date().toISOString().split('T')[0],
            isActive: false, // Default is not active until admin approval
        };

        try {
            const response = await axios.post(`${config.url}/hosteler/create`, hostelerData);
            setMessage(`Hosteler registered successfully: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error('Error registering hosteler:', error);
            setMessage('Error registering hosteler or the room number might not exist');
        }
    };

    return (
        <div style={{marginTop:'30px'}}>
            <StudentNavBar />
            <div style={{ display: 'flex', marginTop: '70px' }}>
                {/* Left side: AvailableRooms component */}
                <div  className='form-container'style={{ flex: 1, padding: '10px', margin:'50px',borderRight: '1px solid #ccc',height:'600px',overflow:'scroll' }}>
                <div style={{marginTop:'70px'}}>
    <div >
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
                </div>

                {/* Right side: Registration form */}
                <div style={{ flex: 1, padding: '10px' }}>
                    <h2>Register as Hosteler</h2>
                    {userid ? (
                        <form className="form-container" onSubmit={handleSubmit}>
                            <div className='form-groups' style={{ margin: '10px' }}>
                                <label>User ID:</label>
                                <input
                                    type="text"
                                    value={userid}
                                    readOnly
                                />
                            </div>
                            <div className='form-groups' style={{ margin: '10px' }}>
                                <label>Room ID:</label>
                                <input
                                    type="number"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    required
                                />
                            </div>
                            <button className='submit-button' type="submit">Register</button>
                        </form>
                    ) : (
                        <p>{message}</p>
                    )}
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default RegisterHosteler;