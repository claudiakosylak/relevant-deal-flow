import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "./AddSecondAccount.module.sass";
import { addInvestorAccount } from "../../store/session";

function AddSecondAccount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState({});

  if (!user || (user.is_startup && user.is_investor)) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(addInvestorAccount(company));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Add Investor Account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Company Name
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className={styles.inputs}
          />
          {errors.company && <p className={styles.errors}>{errors.company[0]}</p>}
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default AddSecondAccount;
