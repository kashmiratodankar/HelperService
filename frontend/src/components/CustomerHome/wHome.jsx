import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./cNavbar";
import Footer from "./Footer";
import carpenter from './pics/carpenter-tool.jpg';
import plumber from './pics/plumber-tool.jpg';
import painter from './pics/painter-tool.jpg';
import electrician from './pics/electrician-tool.jpg';
// import forward from './pics/arrow-right-line.png';
import reqser from './pics/request-service.jpg';
import bg from './pics/pinksofa.jpg';

const WorkerHome = () => {
    const navigate = useNavigate();

    // Redirect to login if no token is found or it's expired
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/components/cLogin'); // Redirect to login if no token
        }
    }, [navigate]);

    return (
        <div className="customer-home">
            <Navbar />
            <div id='body-space'></div>
            {/* Welcome Section */}
            <div className="homeimg">
                <img src={bg} alt='bg' className='bgimg' />
            </div>

            {/* Services Section */}
            <div className="home-section">
                
                {/* <div className="card-pagination">
                    <Link className="backward-arrow"><img src={forward}/>Previous</Link>
                    <Link className="forward-arrow">Next<img src={forward}/></Link>
                </div> */}
                <div className='req-section'><div className='req-img'>
                    <img src={reqser} className='img'/>
                </div>
                <div className="req-para">
                <div className='card-title'>
                    <h3>Optimize Your Service Requests with Helper Service</h3>
                </div>
                    <p>Easily manage your home improvement needs by connecting with skilled professionals in your area through Helper Service. 
                    Whether it’s a carpenter, electrician, or painter, our platform gives you access to verified experts committed to delivering quality services. 
                    Enjoy the convenience of scheduling services that fit your timeline and preferences. 
                    Customize your requests, from the type of service to the details of your project, all with a few clicks.</p>
                    <div className='req-list'><ul>
                        <li>Effortless access to trusted professionals</li>
                        <li>Transparent pricing with no hidden costs</li>
                        <li>Real user ratings to ensure reliability</li>
                        <li>Personalized service options to suit your needs</li>
                        <li>Feedback-driven improvements for a superior experience</li>
                    </ul></div>
                    <div className='req-button-para'>
                        <p>Transform your home projects into a hassle-free experience today.</p>
                        <button><Link className='req-button' to='/components/request'>Request a service!</Link></button>
                    </div>
                </div></div>
                <section className="home-cards">
                    <article className="card">
                        <img src={carpenter} alt="Carpenter" />
                        <h3>Carpenter</h3>
                        <p>Woodwork and repairs</p>
                        <button><Link className='card-link' to='/components/bookCarpenter'>Book</Link></button>
                    </article>
                    <article className="card">
                        <img src={plumber} alt="Plumber" />
                        <h3>Plumber</h3>
                        <p>Pipe installations and fixes</p>
                        <button><Link className='card-link' to='/components/bookPlumber'>Book</Link></button>
                    </article>
                    <article className="card">
                        <img src={painter} alt="Painter" />
                        <h3>Painter</h3>
                        <p>Wall painting and decoration</p>
                        <button><Link className='card-link' to='/components/bookPainter'>Book</Link></button>
                    </article>
                    <article className="card">
                        <img src={electrician} alt="Electrician" />
                        <h3>Electrician</h3>
                        <p>Wiring and electrical solutions</p>
                        <button><Link className='card-link' to='/components/bookElectrician'>Book</Link></button>
                    </article>
                    <article className="card">
                        <img src={electrician} alt="Mechanic" />
                        <h3>Mechanic</h3>
                        <p>Car repairs and fixes</p>
                        <button><Link className='card-link' to='/components/bookMechanic'>Book</Link></button>
                    </article>
                    <article className="card">
                        <img src={electrician} alt="House Cleaner" />
                        <h3>House Cleaner</h3>
                        <p>Cleaning services</p>
                        <button><Link className='card-link' to='/components/bookHCleaner'>Book</Link></button>
                    </article>
                    <article className="card">
                        <img src={electrician} alt="Laundry" />
                        <h3>Laundry</h3>
                        <p>Laundry and ironing</p>
                        <button><Link className='card-link' to='/components/bookLaundry'>Book</Link></button>
                    </article>
                    <article className="card">
                        <img src={electrician} alt="AC Technician" />
                        <h3>AC Technician</h3>
                        <p>Air conditioning repairs</p>
                        <button><Link className='card-link' to='/components/bookTechnician'>Book</Link></button>
                    </article>
                </section>
            </div>

            {/* Why Helper Service Section */}
            <div id='about-section' className="why-helper-service">
                <h2>Why Helper Service?</h2>
                <img src="./pics/helper-service.jpg" alt="Why Helper Service" />
                <p>
                    Helper Service connects you with skilled professionals to solve your everyday needs. From carpentry to electrical work, we ensure you get quality services delivered at your convenience.
                </p>
            </div>

            {/* FAQs Section */}
            <div id='faq-section' className="faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>How do I book a service?</h3>
                    <p>Click on the &lsquo;Book&lsquo; button under the desired service, fill in your details, and confirm the booking.</p>
                </div>
                <div className="faq-item">
                    <h3>Are the workers verified?</h3>
                    <p>Yes, all our workers are verified and have their credentials checked to ensure safety and quality.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default WorkerHome;
