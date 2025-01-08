import { useState, useEffect } from 'react';

const AutoSlider = () => {
    const images = [
        "banner1.jpg", // Add paths to your images
        "banner2.jpg",
        "banner3.jpg",
        "banner4.jpg",
        "banner5.jpeg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <div className="auto-slider">
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="slide-image"
            />
        </div>
    );
};

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/src/Customer/custhome">Helper Service</a>
            </div>
            <div className="search">
                <input type="text" placeholder="Search for a service or worker..." />
                <button>Search</button>
            </div>
            <div className="nav-links">
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/service">Services</a></li>
                    <li><a href="/src/Customer/custprofile">Profile</a></li>
                </ul>
            </div>
        </nav>
    );
};

const CardSlider = () => {
    
    const slides = [
        {
            img: "banner5.jpeg",
            title: "Expert Electricians",
            description: "Hire trusted electricians for all your needs.",
            button: "Book Now",
            link: "/services/electrician"
        },
        {
            img: "banner1.jpg",
            title: "Skilled Carpenters",
            description: "Custom furniture, repairs, and more.",
            button: "Explore Services",
            link: "/services/carpenter"
        },
        {
            img: "banner2.jpg",
            title: "Professional Painters",
            description: "Give your walls a fresh, vibrant look.",
            button: "Get a Quote",
            link: "/services/painter"
        },
        {
            img: "banner4.jpg",
            title: "Home Cleaning Services",
            description: "Sparkling clean spaces, hassle-free.",
            button: "Book Now",
            link: "/services/cleaning"
        },
        {
            img: "banner3.jpg",
            title: "Reliable Plumbers",
            description: "Fix leaks, install fixtures, and handle all plumbing issues.",
            button: "Hire Now",
            link: "/services/plumber"
        }
        
    ];

    return (

        <div className="card-slider">
            {slides.map((slide, index) => (
                <div key={index} className="card">
                    <img src={slide.img} alt={slide.title} className="card-image" />
                    <div className="card-content">
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                        {slide.button && (
                            <a href={slide.link} className="button">
                                {slide.button}
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 Helper Service. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
}


import { createRoot } from 'react-dom/client';
const csign = createRoot(document.getElementById("customerhome"));
csign.render(<Navbar />);
const autoSlide = createRoot(document.getElementById("auto-slider"));
autoSlide.render(<AutoSlider />);
const cslide = createRoot(document.getElementById("slider"));
cslide.render(<CardSlider />);
const foot=createRoot(document.getElementById("footer"));
foot.render(<Footer />);
