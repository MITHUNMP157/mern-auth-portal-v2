import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../api/Auth";
import Register from "./Register";
import { TbLogout } from "react-icons/tb";
import { SiAuthelia } from "react-icons/si";
import { RiShieldUserLine } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:7070/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;

      setUserData(data.user);
    } catch (error) {}
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    <Navigate to="/login" />;
  };

  return (
    <div className={styles.container}>
      <span className={styles.authLogo}>
        <SiAuthelia />
      </span>

      <h2>Welcome to MERN Authentication</h2>

      <div className={styles.userDetails}>
        <p>
          Username: <b>{userData.username}</b>
        </p>
        <p>
          Email: <b>{userData.email}</b>{" "}
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
          <b>{userData.username}</b>
        </span>
      </div>
    </div>
  );
};

export default Home;
