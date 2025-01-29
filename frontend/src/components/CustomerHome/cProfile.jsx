import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Navbar from './cNavbar';
import Footer from './Footer';

const CustomerProfile = () => {
  const [userData, setUserData] = useState(null);
  const [imageFile, setImageFile] = useState(null);  // State to store the selected image
  const [imagePreview, setImagePreview] = useState(null);  // State to store image preview
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please login first.');
      navigate('/components/cLogin'); // Redirect to login
      return;
    }

    fetch(`http://localhost:5000/api/customerprofile/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert('Error fetching profile.');
        } else {
          setUserData(data);
        }
      })
      .catch((error) => console.error('Error fetching profile:', error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/components/cLogin'); // Redirect to login after logout
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview for the selected image
    }
  };

  const handleImageUpload = () => {
    if (!imageFile) {
      alert('Please select an image to upload');
      return;
    }

    // Handle the image upload to the server here
    // For example, you can send a POST request to upload the image
    const formData = new FormData();
    formData.append('image', imageFile);

    // Example: Replace with your API to upload the image
    fetch('http://localhost:5000/api/uploadImage', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Image uploaded successfully');
          // Optionally, update userData with the new image URL
        } else {
          alert('Error uploading image');
        }
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      });
  };

  return (
    <div>
    <Navbar />
    <div className="profile-container">
      <h2>Customer Profile</h2>
      {userData ? (
        <div className="profile-box">
          {/* Profile Image */}
          <div className="profile-image">
            <img
              src={imagePreview || 'https://via.placeholder.com/150'}
              alt="Upload Photo"
            />
          </div>

          {/* Image Upload Button */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleImageUpload}>Upload Image</button>

          {/* Username */}
          <p className="username"><strong>{userData.username || 'No username provided'}</strong></p>

          {/* Profile Fields */}
          <div className="profile-fields">
            <p><strong>First Name:</strong> {userData.firstName || 'Not provided'}</p>
            <p><strong>Last Name:</strong> {userData.lastName || 'Not provided'}</p>
            <p><strong>Phone Number:</strong> {userData.phoneNumber || 'Not provided'}</p>
            <p><strong>Address:</strong> {userData.address || 'Not provided'}</p>
          </div>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default CustomerProfile;
