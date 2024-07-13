import {useState} from 'react';
import { Button } from 'antd';
import {message} from 'antd';
import './css/Login.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
interface User{
    usename: string,
    password: string,
}
const Login: React.FC = () => {
    const [user, setUser] = useState<User>({
        usename: '',
        password: '',
      });
    const handleSubmitLogin = async () => {
        const formData = new FormData();
        formData.append("user", JSON.stringify(user))
        try {
            const resultLogin = await axios.post("", formData);
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
        <>
            <div className="login">
                <div className="login-container">
                    <h1>Login</h1>
                    <div className="login-field">
                        <input type="email" placeholder="Email Address" value={user.usename}/>
                        <input type="password" placeholder="Password" value={user.password}/>
                    </div>
                    <Button type="primary" onClick={handleSubmitLogin}>
                        Continue
                    </Button>
                    <p className="login-signup">Don't have an account? <Link to="/sign-up">Sign Up Now</Link></p>
                </div>
            </div>
        </>
    );
}
export default Login