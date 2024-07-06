import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Use cases</h4>
          <p>UI design</p>
          <p>Prototyping</p>
        </div>
        <div className="footer-section">
          <h4>Explore</h4>
          <p>Design</p>
          <p>Development</p>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <p>Blog</p>
          <p>Best practices</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
