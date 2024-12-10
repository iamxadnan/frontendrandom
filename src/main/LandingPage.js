/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import './style.css';
import AboutUs from './AboutUs';

export default function LandingPage() {
  useEffect(() => {
    document.getElementById('defaultOpen').click();
    document.addEventListener("scroll", () => {
      document.querySelectorAll(".scroll-section").forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
          section.classList.add("show");
        }
      });
    });
  }, []);

  const openTab = (evt, tabName) => {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
      tablinks[i].style.color = "";
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.style.backgroundColor = "#333";
    evt.currentTarget.style.color = "white";
  };

  return (
    <div>
      <main style={{marginTop:"0px"}}>
        
        <div className="background-image-container">
          <div className="background-image">
            <div className="about-us">
              Empowering educational institutions through integrated solutions. Discover how our ERP system enhances efficiency and fosters growth.
            </div>
          </div>

          <div className="hero">
            <div className="dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <h1 style={{color:"black"}}>ERP SYSTEM</h1>
            <p>Welcome to our ERP system where you can get the required data of yours.</p>
          </div>
        </div>

        <div className="tabs">
          <div className="tab">
            <button className="tablinks" onClick={(e) => openTab(e, 'Student')} id="defaultOpen" style={{ backgroundColor: '#333', color: 'white' }}>Student</button>
            <button className="tablinks" onClick={(e) => openTab(e, 'Faculty')} style={{ backgroundColor: 'black', color: 'white' }}>Faculty</button>
          </div>

          <div id="Student" className="tabcontent">
            <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'grey', height: '6rem', borderRadius: '0.375rem', padding: '0.975rem', borderColor:"white"}}>
              <div style={{ width: '50%', borderRight: '2px solid white', padding: '0.4375rem', textAlign: 'center' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                  <h3>Login as student</h3>
                  <p>If you already have an account, login here.</p>
                </a>
              </div>
              <div style={{ width: '50%', textAlign: 'center' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                  <h3>Signup as student</h3>
                  <p>Create a new account if you don't have one yet.</p>
                </a>
              </div>
            </div>
          </div>

          <div id="Faculty" className="tabcontent">
            <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#333', height: '6rem', borderRadius: '0.375rem', padding: '0.875rem' }}>
              <div style={{ width: '50%', borderRight: '2px solid white', padding: '0.4375rem', textAlign: 'center' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                  <h3>Login as staff</h3>
                  <p>If you already have an account, login here.</p>
                </a>
              </div>
              <div style={{ width: '50%', textAlign: 'center' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
                  <h3>Signup as staff</h3>
                  <p>Create a new account if you don't have one yet.</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content for Scrolling */}
        
        <div className="scroll-section" style={{marginTop:"500px",marginBottom:"200px",width:"85%"}}>
        <h2 style={{marginLeft:"-150px"}}>About US</h2>
         <AboutUs/>
        </div>

       
      </main>
      <div className="scroll-section" style={{marginTop:"100px",marginBottom:"10px",width:"85%"}}>
        </div>
    </div>
  );
}