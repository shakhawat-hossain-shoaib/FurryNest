import React from "react";
import { SiInstagram } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
import { SiTiktok } from "react-icons/si";

const Footer = () => (
  <footer>
    <div className="social-icons">
      <a href="."><span aria-label="facebook"><SiFacebook /></span></a>
      <a href="."><span aria-label="instagram"><SiInstagram /></span></a>
      <a href="."><span aria-label="tiktok"><SiTiktok /></span></a>
    </div>
    <p>| Designed by Shoaib, Hasan, Rifat |</p>
  </footer>
);

export default Footer;
