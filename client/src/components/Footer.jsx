import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
function Header() {
  return (
    <footer>
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="social_icon">
        <li>
          <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
        </li>
        <li>
          <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
        </li>
        <li>
          <a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
        </li>
        <li>
          <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
        </li>
      </ul>
      {/* <ul className="menu">
        <li><a><Link to="/">Home</Link></a></li>
      </ul> */}

      {/* <div>
        &copy; All rights reserved
      </div> */}
    </footer>
  );
}

export default Header;
