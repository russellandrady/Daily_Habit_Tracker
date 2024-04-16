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
      <div class="container text-center">
        <div class="row">
          <div class="col footercontext text-white">
            Grow Slowly Like a Tree
          </div>
          <div class="col">
            <ul className="social_icon">
              <li>
                <a href="#">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
          <div class="col footercontext text-white">
            <div>&copy; All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Header;
