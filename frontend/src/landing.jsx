import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Helpers Service</h1>
        <p>Connecting you with skilled workers like carpenters, electricians, painters, and more.</p>
      </header>

      <section className="info-section">
        <div className="info-card">
          <h2>For Customers</h2>
          <p>Browse skilled workers, check their ratings, and submit requests for work. Secure payments and feedback options available.</p>
          <a href="/src/Customer/custlogin">
            <button className="btn">Get Started as a Customer</button>
          </a>
        </div>
        <div className="info-card">
          <h2>For Workers</h2>
          <p>Create a profile, showcase your skills, receive job requests, and get rated for your work.</p>
          <a href="/src/Worker/worklogin">
            <button className="btn">Join as a Worker</button>
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Helper Service | All rights reserved.</p>
      </footer>
    </div>
  );
}

const root = createRoot(document.getElementById('headerbar'));

root.render(
    <Landing />
);