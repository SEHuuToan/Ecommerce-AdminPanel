import React, { useState } from 'react';
import './Navbar.css'
import logo from '../../assets/logo/logo.png'
import profile from '../../assets/logo/profile.png'
import { Dropdown, MenuProps, Button } from 'antd';
import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../stores/userInformationStore';
const Navbar: React.FC = () => {
    const { logout, user } = useAuthStore();
    const [open, setOpen] = useState<boolean[]>([false]);
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            label: (
                <div className='navbar-view-profile'>
                    <Button className='navbar-view-profile' type='text' icon={<ProfileOutlined style={{ fontSize: '20px', color: '#0307fc' }} />}>
                        Profile
                    </Button>
                </div>
            ),
        },
        {
            key: 'logout',
            label: (
                <div>
                    <Button className='navbar-logout' type='text' onClick={() => Logout()} icon={<LogoutOutlined style={{ fontSize: '20px', color: '#fc1c03' }} />}>
                        Log out
                    </Button>
                </div>
            ),
        }
    ]
    const Logout = () => {
        logout();
        navigate("/login");
    }
    const handleOpenProfile = () => {
        setOpen(open)
    }
    return (
        <div className="navbar">
            <Link to={"/"}>
                <img src={logo} alt="navbar-logo" className="nav-logo" />
            </Link>
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={handleOpenProfile} className='nav-profile-container'>
                    <img src={profile} alt="" className="nav-profile" />
                    <div>
                        {user?.username}
                    </div>
                </a>
            </Dropdown>
        </div>
    );
}
export default Navbar