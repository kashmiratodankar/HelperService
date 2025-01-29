import { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
    } = formData;

    // Validate fields
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (phoneNumber.length < 10) {
      setError('Phone number must be 10 digits long');
      return;
    }

    // Validate email if provided
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Invalid email format');
        return;
      }
    }

    try {
      // Send the form data to the backend
      const response = await fetch('http://localhost:5000/api/customersignup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          email: email || undefined, // Only send email if it's provided
          password,
          phoneNumber,
          address,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Signup successful! Please log in.');
        window.location.href = '/components/cLogin';
      } else {
        alert('Signup failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="email"
              placeholder="Email (Optional)"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="textbox">
            <input
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="textbox">
            <textarea
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn-signup">
            Sign Up
          </button>
          <br />
          <br />
          <div>
            Already have an account? <Link to="/components/cLogin">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
