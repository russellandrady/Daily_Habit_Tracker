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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
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
