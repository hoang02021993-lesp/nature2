import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./admin.module.css";
import Axios from "axios";

function LoginPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState("");

  const onLogin = () => {
    setIsLoading(true);
    Axios.post("/api/login", {
      password: pass,
    }).then((res) => {
      if (res.data.success) {
        window.location.reload();
      } else {
        alert(res.data.msg);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.formGroup}>
          <label htmlFor="password">PASSWORD:</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={onLogin}
            className={`${styles.button} ${
              isLoading ? styles.buttonDisable : {}
            }`}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
