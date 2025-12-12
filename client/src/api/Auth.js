import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const register = async (userData) => {
  const userInput = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };

  try {
    const response = await axios.post(
      `${REACT_APP_API_URL}/register`,
      userInput
    );
    console.log("User Register success");
    return response;
  } catch (error) {
    console.error("Error from User register:", error.message);
    throw error;
  }
};

export const login = async (userData) => {
  const userInput = {
    email: userData.email,
    password: userData.password,
  };
  try {
    const response = await axios.post(`${REACT_APP_API_URL}/login`, userInput);
    const data = response.data;

    const token = data.token;
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Error from User Login:", error.message);
    throw error;
  }
};
