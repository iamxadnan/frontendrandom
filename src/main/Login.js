import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import config from '../config';


  export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    sessionStorage.clear(); // Clear existing session

    try {
      const response = await axios.post(`${config.url}/checkuserlogin`, null, {
        params: { email, password }
      });

      const user = response.data;

      if (user.role) {
        sessionStorage.setItem('user', JSON.stringify(user)); // Save user to session storage

        if (user.role === 'ADMIN') {
         
          navigate('/adminhome');
        } else if (user.role === 'FACULTY') {
        
          navigate('/facultyhome');
        } else if (user.role === 'STUDENT') {
          
          navigate('/studenthome');
        }
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <main>
        <section className="login-section">
          <div className="login-left">
            <h1 align="center">LOG IN</h1>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">ENTER EMAIL:</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />

              <label htmlFor="password">ENTER PASSWORD:</label>
              <div className="password-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />

                <button 
                className="toggle-password" 
                onClick={togglePasswordVisibility} 
                style={{ cursor: 'pointer', background: 'none', border: 'none' }} 
                aria-label="Toggle password visibility"
              >
                {/* Icon or text for toggling */}
              </button>
              </div>

              <button type="submit" className="login-btn">LOGIN</button>
            </form>

            {message && <p align="center" style={{ color: 'red' }}>{message}</p>}
            <p align="center">
  New User? <Link to="/userregistration">Register here</Link>
</p>
<p align="center">
  Forgot Password? <Link to="/forgotpass">Forgot Password</Link>
</p>
          </div>

          <div className="login-right">
            <img src="./images/hero.png" alt="Books" />
          </div>
        </section>
      </main>
    </div>
  );
}
