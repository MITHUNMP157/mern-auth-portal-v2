import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { login, register } from "../api/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(() => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: form.email,
      password: form.password,
    };
    console.log(userData);

    try {
      await login(userData);
      toast.success("User Login Success.");
      setForm({ email: "", password: "" });

      navigate("/");
    } catch (error) {
      setForm({ email: "", password: "" });
      console.error("Error from Register Page:", error.message);
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerMain}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formfiled}>
            <label htmlFor="">Email: </label>
            <input
              type="email"
              placeholder="Enter username"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={styles.formfiled}>
            <label htmlFor="">Password: </label>
            <input
              type="password"
              placeholder="Enter username"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
