import React, { useState } from "react";
import styles from "../assets/userCss/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../userInterface/Navbar";
import Footer from "../userInterface/Footer";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [contact, setContact] = useState("");
  const [password, setpassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const HandleChnage = () => {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  };

  const HandleAdd = async () => {
    const data = {
      username: username,
      email: email,
      contact: contact,

      password: password,
    };

    try {
      await axios.post("http://localhost:8000/user/userAdd", data);
      console.log("posted ");
      navigate("/user-login");
    } catch (err) {
      console.error(err);
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
            <form>
              <label className={styles.text}>Username</label>
              <br />
              <div className={styles.box3}>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  type="name"
                ></input>
                <br />
              </div>
              <label className={styles.text}>Email</label>
              <br />
              <div className={styles.box3}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ textTransform: "lowercase" }}
                  className={styles.input}
                  type="email"
                ></input>
                <br />
              </div>
              <label className={styles.text}>Contact</label>
              <br />
              <div className={styles.box3}>
                <input
                  onChange={(e) => setContact(e.target.value)}
                  className={styles.input}
                  type="number"
                ></input>
                <br />
              </div>
              <label className={styles.text}>Password</label>
              <br />
              <div className={styles.box3}>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  className={styles.input}
                  type={type}
                ></input>
                <FontAwesomeIcon onClick={HandleChnage} className={styles.icon} icon={icon} />
              </div>
            </form>
          </div>
          <br />
          <div className={styles.btnbox}>
            <button onClick={HandleAdd} className={styles.btn}>
              Sign Up
            </button>
          </div>
          <br />
          <div className={styles.btnbox}>
            <p className={styles.text}>
              {" "}
              If you already have an account? <Link to={"/user-login?" + Date.now()}>Sign In.</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
