import { useState } from "react";
import { Button } from "antd";
import { message } from "antd";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../stores/userInformationStore";
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
      const resultLogin = await axios.post(
        "http://192.168.2.224:4000/login", user, {
            headers:{
                "Content-Type": "application/json"
            }
        }
      );
      const {username, token} = resultLogin.data //lay token duoc truyen tu BE len FE
      if (token) {
        login(username, token); //truyen token vao store
        localStorage.setItem("token", token);
        navigate("/");
        message.success("Dang nhap thành công!");

      } else {
        message.error("Dang nhap thất bại!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi. Vui lòng Thu dang nhap lai");
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
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <Button type="primary" onClick={handleSubmitLogin}>
            Continue
          </Button>
          <p className="login-signup">
            Don't have an account? <Link to="/sign-up">Sign Up Now</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
