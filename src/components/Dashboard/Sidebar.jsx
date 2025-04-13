import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sidebar.css';
import studentLogo from '../../assets/LOGO/ChatGPT Image Apr 10, 2025, 05_18_25 PM.png';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/learning', label: 'Learning', icon: '📚' },
    { path: '/games', label: 'Games', icon: '🎮' },
    { path: '/video-lectures', label: 'Video Lectures', icon: '🎥' },
    { path: '/study-tools', label: 'Study Tools', icon: '🛠️' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { 
      path: '/next-gen', 
      label: 'Next-Gen Features', 
      icon: '🚀',
      badge: 'NEW'  // This will show the NEW badge
    }
  ];

  return (
    <motion.div 
      className="sidebar"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo-section">
        <h1>NeuroLearn</h1>
        <p>AI Learning Platform</p>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="nav-content"
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="user-section">
        <div className="user-avatar">
          <img src={studentLogo} alt="User Avatar" className="avatar-image" />
        </div>
        <div className="user-info">
          <h3>Student Name</h3>
          <p>Learning Level: 5</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;