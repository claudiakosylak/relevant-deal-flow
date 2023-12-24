import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./SignupFormPage.module.sass";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser && !history.location.state) {
    return <Redirect to="/" />;
  } else if (sessionUser && history.location.state.from === "upload") {
    return <Redirect to="/upload" />
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors({ match: "Passwords do not match." });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Sign Up {location.pathname === "/investor-signup" ? "as Investor" : "as Startup"}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputs}
          />
          {errors.email && (
            <p className={styles.errors}>{errors.email[0]}</p>
          )}
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputs}
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.inputs}
          />
          {errors.match && (
            <p className={styles.errors}>{errors.match}</p>
          )}
          {errors.password && (
            errors.password.map((error, index) => (
              <p className={styles.errors} key={index}>{error}</p>
            ))
          )}
        </label>
        <button type="submit">Sign Up</button>
        <p className={styles.login} onClick={() => {
          if (history.location.state) {
            history.push("/login", { from: history.location.state.from })
          } else {
            history.push("/login");
          }
        }
        }>Already have an account?</p>
      </form>
    </div>
  );
}

export default SignupFormPage;
