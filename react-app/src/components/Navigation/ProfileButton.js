import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout, switchAccountThunk } from "../../store/session";
import { NavLink } from "react-router-dom";
import styles from "./ProfileButton.module.sass";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 474 ? true : false
  );
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 474) setIsMobile(true);
      else setIsMobile(false);
    });
    return () =>
      window.removeEventListener("resize", () => {
        if (window.innerWidth <= 474) setIsMobile(true);
        else setIsMobile(false);
      });
  });

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    dispatch(logout());
  };

  const switchAccount = () => {
    if (user.default_startup && !user.is_investor) {
      history.push("/add-investor-account");
    } else {
      dispatch(switchAccountThunk());
      history.push("/");
    }
    closeMenu();
  };

  const ulClassName = showMenu ? styles.profile_dropdown : styles.hidden;
  const darkBackground = showMenu ? styles.dark : styles.hidden;
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className={styles.icon}>
        {user ? (
          <i className="fas fa-user-circle" />
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>
      <div className={darkBackground} onClick={closeMenu}></div>
      <ul className={ulClassName} ref={ulRef}>
        {isMobile && (
          <div className={styles.close}>
            <i className="fa-solid fa-xmark" onClick={closeMenu}></i>
          </div>
        )}
        {user ? (
          <>
            <NavLink to="/" className={styles.my_startups} onClick={closeMenu}>
              Feed
            </NavLink>
            {user.default_startup && (
              <>
                <NavLink
                  to="/upload"
                  className={styles.my_startups}
                  onClick={closeMenu}
                >
                  Upload a Deck
                </NavLink>
                <NavLink
                  to="/my-startups"
                  className={styles.my_startups}
                  onClick={closeMenu}
                >
                  My Startups
                </NavLink>
              </>
            )}
            <li className={styles.name}>
              Logged in as {user.default_startup ? "Startup" : "Investor"}
              <br></br>
              {!user.default_startup && (
                <>
                <br></br>
                {user.investor_company}
                </>
              )}
              <br></br>
              {user.email}
            </li>
            <li className={styles.my_startups} onClick={switchAccount}>
              {!user.default_startup ? "Startup Account" : "Investor Account"}
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className={styles.logout}
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <NavLink to="/" className={styles.my_startups} onClick={closeMenu}>
              Feed
            </NavLink>
            <li
              className={styles.my_startups}
              onClick={() => {
                history.push("/signup", { from: "upload" });
                closeMenu();
              }}
            >
              Upload a Deck
            </li>
            <NavLink to="/login" className={styles.login} onClick={closeMenu}>
              Login
            </NavLink>
            <NavLink to="/signup" className={styles.login} onClick={closeMenu}>
              Sign Up as Startup
            </NavLink>
            <NavLink
              to="/investor-signup"
              className={styles.login}
              onClick={closeMenu}
            >
              Sign Up as Investor
            </NavLink>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
