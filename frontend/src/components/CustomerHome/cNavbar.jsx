import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';
import user from './pics/user-line.png';
import menu from './pics/menu-line.png';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation(); // Get the current path

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleAboutClick = () => {
    if (location.pathname === '/components/cHome') {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = () => {
    if (location.pathname === '/components/cHome') {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="navbar">
      <div className="navleft">
        <div className="logo">
          <Link to="/components/cHome">
            <img
              className="HomeLogo"
              src="../hplogo.png"
              alt="Home Logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </Link>
        </div>
        <div className="search">
          <input type="search" placeholder="Search Here" />
          <i className="ri-search-line"></i>
          <div className="searchclose">
            <i className="ri-close-line"></i>
          </div>
        </div>
      </div>
      <div className={`rightnav ${menuVisible ? 'show' : ''}`}>
        <Link to="/components/cCart" className="navitem" id="cart-item">
          Cart
        </Link>

        {/* About */}
        <div
          className="navitem"
          onClick={handleAboutClick}
        >
          {location.pathname === '/components/cHome' ? (
            <a href='#about-section'>About</a>
          ) : (
            <Link to='/components/About'>About</Link> // Navigate to a dedicated About page
          )}
        </div>

        {/* Contact */}
        <div
          className="navitem"
          onClick={handleContactClick}
        >
          {location.pathname === '/components/cHome' ? (
            <a href='#about-section'>Contact</a>
          ) : (
            <Link to='/components/Contact'>Contact</Link> // Navigate to a dedicated Contact page
          )}
        </div>
        <a href="#faq-section" className="navitem">
          FAQ
        </a>
      </div>
      <div className="menulist">
        <img src={menu} alt="menu" onClick={toggleMenu} />
      </div>
      <div
        className={`navclose ${menuVisible ? 'show' : ''}`}
        onClick={toggleMenu}
      >
        <i className="ri-close-line"></i>
      </div>
      <div className="profile" id="profile-item">
        <Link to="/components/cProfile">
          <img className="profilePic" src={user} alt="Profile" />
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
