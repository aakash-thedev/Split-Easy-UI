import React from 'react';
import './Sidenav.css';
import { NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { JWT_TOKEN, removeCookie } from '../../services/cookieService';

const Sidenav: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    removeCookie(JWT_TOKEN);
    window.open('/auth', '_self');
  }

  return (
    <div className="sidenav">
      <div className="app-name">Split Easy</div>
      <button className="create-group-btn">
        <FaPlus className="plus-icon" />
        Create a Group
      </button>

      <div className="option-group">
        <div className="group-label">Transactions</div>
        <div className='group-tabs'>
          <NavLink to="/groups" className={(navData) => navData.isActive ? 'active' : ''}>Groups</NavLink>
          <NavLink to="/friends">Friends</NavLink>
          <NavLink to="/activity">Activity</NavLink>
        </div>
      </div>

      <div className="option-group">
        <div className="group-label">Account</div>
        <div className='group-tabs'>
          <NavLink to="/my-account">My Account</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <NavLink to="/premium">Switch to Premium</NavLink>
          <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
