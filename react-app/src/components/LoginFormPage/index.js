import React, { useState } from "react";
import { login, switchAccountThunk } from "../../store/session";
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
  const [errors, setErrors] = useState("");

  if (
    sessionUser &&
    (!history.location.state ||
      (sessionUser.is_investor &&
        !sessionUser.default_startup &&
        history.location.state.from === "favorite"))
  ) {
    return <Redirect to="/" />;
  } else if (sessionUser && history.location.state.from === "upload") {
    return <Redirect to="/upload" />;
  } else if (
    sessionUser &&
    !sessionUser.is_investor &&
    sessionUser.default_startup &&
    history.location.state.from === "favorite"
  ) {
    history.push("/add-investor-account");
  } else if (
    sessionUser &&
    sessionUser.is_investor &&
    sessionUser.default_startup &&
    history.location.state.from === "favorite"
  ) {
    dispatch(switchAccountThunk());
    history.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      if (data.email) {
        setErrors(data.email[0]);
      }
      if (data.password) {
        setErrors(data.password[0]);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {errors && <p className={styles.errors}>{errors}</p>}

        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputs}
          />
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
        <button type="submit">Log In</button>
        <p
          className={styles.signup}
          onClick={() => {
            if (history.location.state) {
              history.push("/signup", { from: history.location.state.from });
            } else {
              history.push("/signup");
            }
          }}
        >
          Don't have an account yet?
        </p>
      </form>
    </div>
  );
}

export default LoginFormPage;
