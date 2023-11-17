import React, { useState } from "react";
import styles from "../assets/userCss/login.module.css";
import Navbar from "../userInterface/Navbar";
import Footer from "../userInterface/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const login = () => {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleGet = async () => {
    if (email.length < 1) {
      setError("Enter your email address");
    } else {
      setError("");
      const data = {
        email: email,
      };
      try {
        const response = await axios.post("http://localhost:8000/user/forgotPassword", data);
        console.log(response.data);

        localStorage.setItem("userDataFront", JSON.stringify(response.data.userDataFront));
        const userEmail = response.data.userDataFront.email.toLowerCase().trim();
        const enteredEmail = email.toLowerCase().trim();
        if (userEmail === enteredEmail) {
          navigate(`/userforgotpasswordid/${response.data.userDataFront.id}`);
          setInvalid("");
        } else {
          console.log("error");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setInvalid("Email is Wrong");
        }
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.mainBox}>
        <div className={styles.box}>
          <div className={styles.box2}>
            <h2 className={styles.head}>M3 Autocare</h2>
            <p className={styles.text}>Work Simple - Smooth Driving</p>
          </div>
          <div className={styles.forms}>
            <br />
            <div>
              <p className={styles.text}>Enter your registerd email to get the otp</p>
            </div>
            <form>
              <label className={styles.text}>Email</label>
              <br />
              <div className={styles.box3}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  style={{ textTransform: "lowercase" }}
                  type="name"
                ></input>
                <br />
              </div>
              <p style={{ marginTop: "0", color: "red", fontSize: "11px" }}>{error}</p>

              {invalid && (
                <p style={{ marginTop: "0", color: "red", fontSize: "11px" }}>{invalid}</p>
              )}
            </form>
          </div>
          <br />
          <div className={styles.btnbox}>
            <button onClick={handleGet} className={styles.btn}>
              Get Otp
            </button>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default login;
