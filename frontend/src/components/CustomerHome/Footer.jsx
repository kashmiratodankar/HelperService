const Footer = () => {
    return (
        <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 Helper Service. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="/terms">Terms of Service</a>
                        <a href="/privacy">Privacy Policy</a>
                        <div id="contact-section">
                            <a>Contact Us</a>
                            <div>
                            <p>Email: support@helperservice.com</p>
                            <p>Phone: +91-9136760124</p>
                            <p>Address: 123, Helper Street, Mumbai, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    );
}

export default Footer;