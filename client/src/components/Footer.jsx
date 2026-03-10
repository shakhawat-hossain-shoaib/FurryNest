import React from "react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-grid">
        <div>
          <h4>About FurryNest</h4>
          <p>Finding loving homes for pets in need. Join us in making a difference in the lives of animals.</p>
          <div className="social-icons">
            <a href="." aria-label="facebook"><SiFacebook /></a>
            <a href="." aria-label="instagram"><SiInstagram /></a>
            <a href="." aria-label="tiktok"><SiTiktok /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/adopt-dog">Adopt a Dog</a></li>
            <li><a href="/adopt-cat">Adopt a Cat</a></li>
            <li><a href="/ways-to-help">Ways to Help</a></li>
            <li><a href="/shop">Shop</a></li>
          </ul>
        </div>
        <div>
          <h4>Get Involved</h4>
          <ul className="footer-links">
            <li><a href="/volunteer">Volunteer</a></li>
            <li><a href="/donate">Donate</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>© {new Date().getFullYear()} FurryNest. Designed by Shoaib, Hasan, Rifat</p>
      </div>
    </div>
  </footer>
);

export default Footer;
