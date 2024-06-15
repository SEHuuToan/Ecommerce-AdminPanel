import React from 'react';
import './Navbar.css'
import logo from '../../assets/logo/logo.png'
import profile from '../../assets/logo/profile.png'

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <img src={logo} alt="navbar-logo" className="nav-logo" />
            <img src={profile} alt="" className="nav-profile" />
        </div>
    );
}
export default Navbar