import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from 'react-router-dom';
import styles from "./ProfileButton.module.sass";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 474 ? true : false)
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 474) setIsMobile(true)
      else setIsMobile(false)
    })
    return () => window.removeEventListener("resize", () => {
      if (window.innerWidth <= 474) setIsMobile(true)
      else setIsMobile(false)
    })
  })

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = showMenu ? styles.profile_dropdown : styles.hidden
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className={styles.icon}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {isMobile && (
          <div className={styles.close}>
            <i className="fa-solid fa-xmark" onClick={closeMenu}></i>
          </div>
        )}
        {user ? (
          <>
            <li className={styles.name}>{user.username}</li>
            <NavLink to="/" className={styles.my_startups}>Feed</NavLink>
            <NavLink to="/my-startups" className={styles.my_startups}>My Startups</NavLink>
            <li>
              <button onClick={handleLogout} className={styles.logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <NavLink to="/login" className={styles.login}>Login</NavLink>
            <NavLink to="/signup" className={styles.login}>Sign Up</NavLink>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
