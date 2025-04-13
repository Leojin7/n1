import React from 'react';
import { FaSun, FaMoon, FaHome, FaBook, FaChartBar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-logo">
        <h2>NeuroLearn</h2>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">
          <FaHome className="sidebar-icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/courses" className="sidebar-link">
          <FaBook className="sidebar-icon" />
          <span>Courses</span>
        </Link>
        <Link to="/progress" className="sidebar-link">
          <FaChartBar className="sidebar-icon" />
          <span>Progress</span>
        </Link>
      </nav>

      <button 
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <><FaSun className="theme-icon" /> Light Mode</>
        ) : (
          <><FaMoon className="theme-icon" /> Dark Mode</>
        )}
      </button>
    </div>
  );
};

export default Sidebar;