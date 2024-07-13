import React, { useState } from "react";
import { Button, message } from 'antd';
import './css/SignUp.css';
import { Link } from 'react-router-dom';
import axios from "axios";

interface User {
    username: string,
    password: string,
}
const SignUp: React.FC = () => {
    const [user, setUser] = useState<User>({
        username: '',
        password: '',
    });
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleSignUpAccount = async () => {
        const formData = new FormData();
        formData.append("user", JSON.stringify(user))
        try {
            const resultLogin = await axios.post("http://192.168.1.7:4000/sign-up", formData);
            if (resultLogin.data.success) {
                message.success("Dang nhap thành công!");
            } else {
                message.error("Dang nhap thất bại!");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi. Vui lòng Thu dang nhap lai");
        }
    }
    return (
        <div className="signup">
            <div className="signup-container">
                <h1>Sign Up</h1>
                <div className="signup-field">
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Your Name" 
                        value={user.username}   
                        onChange={handleInputChange}/>
                    <input 
                        type="password"  
                        name="password" 
                        placeholder="Password" 
                        value={user.password}   
                        onChange={handleInputChange}/>
                </div>
                <Button type="primary" onClick={handleSignUpAccount}>
                    Continue
                </Button>
                <p className="signup-login">Already have an account? <Link to="/login">Login</Link></p>
                <div className="signup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continue, i agree to the term of use & privacy policy.</p>
                </div>
            </div>
        </div>
    );
}
export default SignUp