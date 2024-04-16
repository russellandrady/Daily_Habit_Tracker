import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector } from "react-redux";
function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
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
          {!currentUser &&(<li>
            <Link to="/register">Register</Link>
            
          </li>)}
          <li>
            {currentUser ? <Link to="/profile">Profile</Link>:<Link to="/login">Login</Link>}
            
          </li>
          {currentUser &&<li>
             <Link to="/signout">Signout</Link>
            
          </li>}
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
