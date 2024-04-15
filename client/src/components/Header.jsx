import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
function Header() {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <header className={menuActive ? "open" : ""}>
      <Link to="/" className="logo">
        Daily Habit Tracker
      </Link>
      <div className="group">
        <ul className="navigation">
          <li>
            <a>
              <Link to="/">Home</Link>
            </a>
          </li>
          <li>
            <a>
              <Link to="/about">About</Link>
            </a>
          </li>
          <li>
            <a>
              <Link to="/register">Register</Link>
            </a>
          </li>
          <li>
            <a>
              <Link to="/login">Login</Link>
            </a>
          </li>
          <li>
            <a>
              <Link to="/profile">Profile</Link>
            </a>
          </li>
        </ul>
        <ion-icon
          name="menu-outline"
          class="menuToggle"
          onClick={() => setMenuActive(!menuActive)}
        ></ion-icon>
      </div>
    </header>
  );
}

export default Header;
