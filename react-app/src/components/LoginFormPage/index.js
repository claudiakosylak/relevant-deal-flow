import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./LoginFormPage.module.sass";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser && !history.location.state) {
    return <Redirect to="/" />;
  } else if (sessionUser && history.location.state.from === "upload") {
    return <Redirect to="/upload" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log("DATA: ", data)
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Log In</h2>
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
          {errors.password && (
            <p className={styles.errors}>{errors.password[0]}</p>
          )}
        </label>
        <button type="submit">Log In</button>
        <p className={styles.signup} onClick={() => {
          if (history.location.state) {
            history.push("/signup", { from: history.location.state.from })
          } else {
            history.push("/signup");
          }
        }
        }>Already have an account?</p>
      </form>
    </div>
  );
}

export default LoginFormPage;
