import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faPinterestP, faYoutube, faLinkedinIn,  faTiktok} from "@fortawesome/free-brands-svg-icons";
import "@/styles/TopHeader.css";

function TopHeader() {
  return (
    <nav className="top-navbar">
      <ul>
        <li><a href="https://www.facebook.com/giftopiia" target="_blank" className="top-icon"><FontAwesomeIcon icon={faFacebookF}/></a></li>
        <li><a href="https://x.com/i/flow/login?redirect_after_login=%2Fgiftopiia" target="_blank" className="top-icon"><FontAwesomeIcon icon={faTwitter} /></a></li>
        <li><a href="https://www.instagram.com/giftopiia" target="_blank" className="top-icon"><FontAwesomeIcon icon={faInstagram} /></a></li>
        <li><a href="https://www.pinterest.com/giftopiia/_saved/" target="_blank" className="top-icon"><FontAwesomeIcon icon={faPinterestP} /></a></li>
        <li><a href="https://www.youtube.com/channel/UC5whQ0r5_IfLHXeWZU9-2ug" target="_blank" className="top-icon"><FontAwesomeIcon icon={faYoutube} /></a></li>
        <li><a href="https://www.linkedin.com/company/giftopiia/" target="_blank" className="top-icon"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
        <li><a href="https://www.tiktok.com/@giftopiia" target="_blank" className="top-icon"><FontAwesomeIcon icon={faTiktok} /></a></li>
      </ul>
    </nav>
  );
}

export default TopHeader;