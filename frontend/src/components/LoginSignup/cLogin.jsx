import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const CustomerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/customerlogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId) {
          console.log('Login Successful:', data.userName);

          // Store user ID in localStorage for profile retrieval
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userName', data.userName);

          navigate('/components/cHome'); // Redirect to home
        } else {
          alert(data.message || 'Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
          <br />
          <br />
          <div>
            Don&apos;t have an account?{' '}
            <Link to="/components/cSignup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
