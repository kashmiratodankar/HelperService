import { Routes, Route } from 'react-router-dom';
import Landing from '../LoginSignup/Landing';
import CustomerLogin from '../LoginSignup/cLogin';
import WorkerLogin from '../LoginSignup/wLogin';
import CustomerSignup from '../LoginSignup/cSignup';
import WorkerSignup from '../LoginSignup/wSignup';

import Navbar from './cNavbar';
import Sidebar from './SideMenu';
import Footer from './Footer';
import CustomerProfile from './cProfile';
import CustomerHome from './cHome';
import CustomerCart from './cCart';
import AboutUs from './About';
import ContactUs from './Contact';

import Requests from './request';

import Carpenter from './bookCarpenter';
import Plumber from './bookPlumber';
import Painter from './bookPainter';
import Electrician from './bookElectrician';
import Mechanic from './bookMechanic';
import HCleaner from './bookHCleaner';
import Laundry from './bookLaundry';
import ACTech from './bookACTechnician';

import WorkerHome from './wHome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/components/cLogin" element={<CustomerLogin />} />
      <Route path="/components/wLogin" element={<WorkerLogin />} />
      <Route path="/components/cSignup" element={<CustomerSignup />} />
      <Route path="/components/wSignup" element={<WorkerSignup/>}/>

      <Route path="/components/cNavbar" element={<Navbar />} />
      <Route path="/components/SideMenu" element={<Sidebar />} />
      <Route path="/components/Footer" element={<Footer />} />
      <Route path="/components/cHome" element={<CustomerHome />} />
      <Route path="/components/cProfile" element={<CustomerProfile />} />
      
      <Route path="/components/cCart" element={<CustomerCart />} />
      <Route path="/components/About" element={<AboutUs />} />
      <Route path="/components/Contact" element={<ContactUs />} />

      <Route path="/components/request" element={<Requests />} />

      <Route path="/components/bookCarpenter" element={<Carpenter />} />
      <Route path="/components/bookPlumber" element={<Plumber />} />
      <Route path="/components/bookPainter" element={<Painter />} />
      <Route path="/components/bookElectrician" element={<Electrician />} />
      <Route path="/components/bookMechanic" element={<Mechanic />} />
      <Route path="/components/bookHCleaner" element={<HCleaner />} />
      <Route path="/components/bookLaundry" element={<Laundry />} />
      <Route path="/components/bookACTechnician" element={<ACTech />} />

      <Route path="/components/wHome" element={<WorkerHome />} />
    </Routes>
  );
}

export default App;
