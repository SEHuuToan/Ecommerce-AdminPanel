import React, { useState } from "react";
import { Button } from "antd";
import { message } from "antd";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/userInformationStore";
import { axiosPost } from "../utils/axiosUtils";
interface User {
  username: string;
  password: string;
}
const Login: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSubmitLogin = async () => {
    try {
      const resultLogin = await axiosPost('auth/login', user);
      const { accessToken } = resultLogin.data; //lay token duoc truyen tu BE len FE
      if (accessToken) {
        login(user.username, accessToken); //truyen token vao store
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
        message.success("Login Successfull!");

      } else {
        message.error("Login Fail. Please try again!");
      }
    } catch {
      message.error("Something wrong with server.");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitLogin();
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-container">
          <h1>Login</h1>
          <div className="login-field">
            <input
              type="email"
              name="username"
              placeholder="Email Address"
              value={user.username}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}

            />
          </div>
          <Button type="primary" onClick={handleSubmitLogin}>
            Continue
          </Button>
          <p className="login-signup">
            Don&apos;t have an account? <Link to="/sign-up">Sign Up Now</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
