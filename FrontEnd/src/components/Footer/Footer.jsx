// src/components/Footer/Footer.jsx (NEW FILE)

import React from "react";
import "./Footer.css"; // We will create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column-main">
          {/* You can put your logo component here */}
          <h3 className="footer-logo-text">PinDar</h3>
          <p>
            Get loans instantly, without the hassle. Flexible, secure, and made
            for you.
          </p>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/press">Press</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          {/* Add social media links/icons here later */}
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PinDar. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
