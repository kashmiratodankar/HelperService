// import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

// Landing Component
const Landing = () => {
  return (
    <div className="landingpage">
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Helpers Service</h1>
        <p>Connecting you with skilled workers like carpenters, electricians, painters, and more.</p>
      </header>

      <section className="info-section">
        <div className="info-card">
          <h2>For Customers</h2>
          <p>Browse skilled workers, check their ratings, and submit requests for work. Secure payments and feedback options available.</p>
          <Link to="/components/cLogin">
            <button className="btn">Get Started as a Customer</button>
          </Link>
        </div>
        <div className="info-card">
          <h2>For Workers</h2>
          <p>Create a profile, showcase your skills, receive job requests, and get rated for your work.</p>
          <Link to="/components/wLogin">
            <button className="btn">Join as a Worker</button>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Helper Service | All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}

export default Landing;