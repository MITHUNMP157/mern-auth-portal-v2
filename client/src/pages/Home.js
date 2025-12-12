import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { SiAuthelia } from "react-icons/si";
import { RiShieldUserLine } from "react-icons/ri";

const Home = () => {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  console.log(`${REACT_APP_API_URL}/profile`);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://mern-auth-portal-v2.onrender.com/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;

      setUserData(data.user);
    } catch (error) {
      console.log("Error from verifytoken:", error.message);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    <Navigate to="/" />;
  };

  const firstCaptial = (text) => {
    if (!text) {
      return "";
    } else {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.authLogo}>
        <SiAuthelia />
      </span>

      <h2>Welcome to MERN Authentication</h2>

      <div className={styles.userDetails}>
        <p>
          Username: <b>{firstCaptial(userData.username)}</b>
        </p>
        <p>
          Email: <b>{firstCaptial(userData.email)}</b>{" "}
        </p>

        <TbLogout
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className={styles.logout}
        />
        <span className={styles.userLogDetails}>
          <RiShieldUserLine style={{ marginTop: "5px" }} />
          <b>{firstCaptial(userData.username)}</b>
        </span>
      </div>
    </div>
  );
};

export default Home;
