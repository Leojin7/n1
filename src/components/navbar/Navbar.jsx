import studentLogo from '../../assets/LOGO/ChatGPT Image Apr 10, 2025, 05_18_25 PM.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        {/* ... other navbar content ... */}
        <div className="user-profile">
          <img 
            src={studentLogo} 
            alt="Student Profile"
            className="profile-logo"
          />
          <div className="user-info">
            <span className="student-name">Student Name</span>
            <span className="learning-level">Learning Level: 5</span>
          </div>
        </div>
      </div>
    </nav>
  );
};