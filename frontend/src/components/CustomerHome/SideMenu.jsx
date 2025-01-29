import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Service Categories</h2>
      <ul>
        <li><a href="#">Carpentry</a></li>
        <li><a href="#">Electrical</a></li>
        <li><a href="#">Plumbing</a></li>
        <li><a href="#">Painting</a></li>
        <li><a href="#">House Cleaning</a></li>
        <li><a href="#">Appliance Repair</a></li>
      </ul>

      <h2>Filters</h2>
      <ul>
        <li>
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" placeholder="Enter location" />
        </li>
        <li>
          <label htmlFor="ratings">Ratings</label>
          <select id="ratings" name="ratings">
            <option value="">Select</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="2">2 Stars & Up</option>
            <option value="1">1 Star & Up</option>
          </select>
        </li>
        <li>
          <input type="checkbox" id="availability" name="availability" />
          <label htmlFor="availability"> Available Now</label>
        </li>
        <li>
          <input type="checkbox" id="verifiedProfessionals" name="verifiedProfessionals" />
          <label htmlFor="verifiedProfessionals"> Verified Professionals</label>
        </li>
        <li>
          <label htmlFor="priceRange">Price Range</label>
          <input type="range" id="priceRange" name="priceRange" min="0" max="10000" step="100" />
        </li>
      </ul>
      </div>
  );
};

export default Sidebar;
