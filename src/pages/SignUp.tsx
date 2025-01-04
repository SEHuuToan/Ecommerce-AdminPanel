import React, { useState } from "react";
import { Button, message } from 'antd';
import './css/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

interface User {
    username: string,
    password: string,
}
const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        username: '',
        password: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleSignUpAccount = async () => {
        try {
            const resultSignup = await axios.post("hhttps://ecommerce-backend-utuk.onrender.com/sign-up", user, {
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if (resultSignup.data.__v === 0) {
                message.success("Create Successfull!");
                navigate("/login")
            } else {
                message.error("Create Fail. Please try again!");
            }
        } catch {
            message.error("Something wrong with server.");
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