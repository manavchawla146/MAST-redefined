import React, { useState, useEffect } from "react";
import "./Footer.css";
import { MapPin, Instagram, Facebook, Mail, CreditCard } from "lucide-react";

function Footer() {
  // State to track screen size
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(window.innerWidth <= 480);

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      setIsVerySmallScreen(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className={`footer ${isSmallScreen ? "small-screen" : ""} ${isVerySmallScreen ? "very-small-screen" : ""}`}>
      <div className="footer-container">
        {/* Column 1: ADDRESS */}
        <div className="footer-column">
          <h4 className="footer-heading">
            <MapPin className="footer-icon" size={18} />
            ADDRESS
          </h4>
          <a 
            href="https://www.google.com/maps/place/MAST+by+K.+AASTHA/..."
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="footer-text" style={{ fontWeight: 'bold' }}>B-240, 2nd Floor,</p>
            <p className="footer-text" style={{ fontWeight: 'bold' }}>Sumel Business Park-3 (Safal-3),</p>
            <p className="footer-text" style={{ fontWeight: 'bold' }}>Raipur, Ahmedabad-380 002</p>
          </a>
        </div>

        {/* Column 2: DETAILS */}
        <div className="footer-column">
          <h4 className="footer-heading">
            <CreditCard className="footer-icon" size={18} />
            DETAILS
          </h4>
          <p className="footer-text">
            <span className="contact-label">Sales:</span> <a href="tel:7600091717" className="footer-link">76000 91717</a>
          </p>
          <p className="footer-text">
            <span className="contact-label">Accounts:</span> <a href="tel:6353008913" className="footer-link">63530 08913</a>
          </p>
          
        </div>

        {/* Column 3: CONNECT */}
        <div className="footer-column">
          <h4 className="footer-heading">
            <Mail className="footer-icon" size={18} />
            CONNECT
          </h4>
          <p className="footer-text social-link">
            <Instagram className="social-icon" size={16} />
            <a href="https://www.instagram.com/mast_garments?utm_source=qr&igsh=M2doYjVubmh5a29s" className="footer-link">@MAST_GARMENTS</a>
          </p>
          <p className="footer-text social-link">
            <Facebook className="social-icon" size={16} />
            <a href="https://m.facebook.com/mastsuits/" className="footer-link">@mastsuits</a>
          </p>
          
          {/* New Email Link */}
          <p className="footer-text social-link">
            <Mail className="social-icon" size={16} />
            <a href="mailto:mastsuits@gmail.com" className="footer-link">mastsuits@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p className="footer-copyright-text">© 2025 Kaastha. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
