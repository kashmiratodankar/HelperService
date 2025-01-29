import { useState, useEffect } from "react";
import Navbar from "./cNavbar";
import Footer from "./Footer";
import Sidebar from "./SideMenu";
import './RequestPage.css';

const Requests = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    ratings: '',
    availability: false,
    verifiedProfessionals: false,
    priceRange: 0
  });

  useEffect(() => {
    // Fetch workers from the API (replace the URL with your API endpoint)
    const fetchWorkers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workersrequest');
        if (!response.ok) {
          throw new Error('Failed to fetch workers');
        }
        const data = await response.json();
        setWorkers(data);
        setFilteredWorkers(data); // Initially, show all workers
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []); // Empty dependency array ensures this effect runs once on page load

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    let filtered = workers.filter(worker => {
      // Filter by selected category
      if (selectedCategory && worker.category !== selectedCategory) {
        return false;
      }

      // Filter by location
      if (filters.location && !worker.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Filter by ratings
      if (filters.ratings && worker.ratings < parseInt(filters.ratings)) {
        return false;
      }

      // Filter by availability
      if (filters.availability && !worker.available) {
        return false;
      }

      // Filter by verified professionals
      if (filters.verifiedProfessionals && !worker.verified) {
        return false;
      }

      // Filter by price range
      if (worker.price > filters.priceRange) {
        return false;
      }

      return true;
    });

    setFilteredWorkers(filtered);
  }, [selectedCategory, filters, workers]);

  return (
    <div className="requests">
      <Navbar />
      <Sidebar onCategorySelect={handleCategorySelection} onFilterChange={handleFilterChange} filters={filters} />
      <div className="worker-list">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => (
            <div key={worker.id} className="worker-card">
              <h3>{worker.firstName} {worker.lastName}</h3>
              <p>Category: {worker.category}</p>
              <p>Location: {worker.location}</p>
              <p>Ratings: {worker.ratings} stars</p>
              <p>{worker.available ? 'Available Now' : 'Not Available'}</p>
              <p>{worker.verified ? 'Verified Professional' : 'Not Verified'}</p>
              <p>Price: ₹{worker.price}</p>
            </div>
          ))
        ) : (
          <p>No workers available for the selected filters.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Requests;
