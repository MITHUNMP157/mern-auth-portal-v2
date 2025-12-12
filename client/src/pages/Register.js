import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { register } from "../api/Auth";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

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
      username: form.username,
      email: form.email,
      password: form.password,
    };

    try {
      await register(userData);
      toast.success("User Register Success.");
      setForm({ username: "", email: "", password: "" });
    } catch (error) {
      setForm({ username: "", email: "", password: "" });
      console.error("Error from Register Page:", error.message);
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerMain}>
        <h1>Register</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formfiled}>
            <label htmlFor="">Username: </label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <br />
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
