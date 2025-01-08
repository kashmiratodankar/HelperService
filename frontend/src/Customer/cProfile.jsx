import { useState, useEffect } from 'react';

function CustomerProfile() {
  const [username, setUsername] = useState(''); // Initialize state for username
  const user = 'username'; // Replace with the actual username to fetch

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${user}`);
        const result = await response.json();
        if (response.ok) {
          setUsername(result.username); // Set only the username
        } else {
          alert('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div id="customerprof">
      <div className="profile-container">
        <div className="profile-info">
          <p>Username: {username}</p>
        </div>
      </div>
      <button>View Profile</button>
      <button>Browse Services</button>
      <button>Submit Request</button>
      <button><a href='/src/Customer/custlogin'>Log out</a></button>
    </div>
  );
}

import { createRoot } from 'react-dom/client';
const chome = createRoot(document.getElementById("customerprof"));
chome.render(<CustomerProfile />);
