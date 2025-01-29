import Navbar from './cNavbar';
import Sidebar from './SideMenu';
import Footer from './Footer';

const Carpenter = () => {
    return (
        <div className='carpenter-page'>
            <Navbar />
            <div className="spaces"></div>
            <Sidebar />
            <Footer />
        </div>
    );
}

export default Carpenter;