import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSignOut = async()=>{//to use fetch this should be async
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
      setMenuActive(false)
    } catch (error) {
      console.log(error);
    }
  }
  const handleLinkClick = () => {
    setMenuActive(false);
  };
  return (
    <header className={menuActive ? "open" : ""}>
      <Link to="/" onClick={handleLinkClick} className="logo">
        Daily Habit Tracker
      </Link>
      <div className="group">
        <ul className="navigation">
          <li>
            <Link to="/" onClick={handleLinkClick}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={handleLinkClick}>About</Link>
          </li>
          {!currentUser &&(<li>
            <Link to="/register" onClick={handleLinkClick}>Register</Link>
            
          </li>)}
          <li>
            {currentUser ? <Link to="/profile" onClick={handleLinkClick}>Profile</Link>:<Link to="/login" onClick={handleLinkClick}>Login</Link>}
            
          </li>
          {currentUser &&<li>
             <Link to="/habits" onClick={handleLinkClick}>Habits</Link>
            
          </li>}
          {currentUser &&<li>
             <Link onClick={handleSignOut}>Signout</Link>
            
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
