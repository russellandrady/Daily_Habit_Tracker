import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
function Header() {
  return (
    <div className="custom-footer">
    <footer>
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col footercontext text-dark">
            Grow Slowly Like a Tree
          </div>
          <div className="col">
            <ul className="social_icon">
              {/* <li>
                <a href="#">
                  <ion-icon name="logo-whatsapp"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="logo-github"></ion-icon>
                </a>
              </li> */}
              <li>
                <a href="https://www.linkedin.com/in/russellandrady/" target="_blank">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
              {/* <li>
                <a href="#">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li> */}
            </ul>
          </div>
          <div className="col footercontext text-dark">
            <div>&copy; All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Header;
