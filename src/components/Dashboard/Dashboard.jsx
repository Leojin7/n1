import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // Add this import
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();  // Add this hook

  const stats = [
    {
      id: 'streak',
      icon: '🔥',
      title: 'Learning Streak',
      value: '1',
      unit: 'days',
      footer: 'Longest streak: 1 days'
    },
    {
      id: 'points',
      icon: '⭐',
      title: 'Total Points',
      value: '0',
      unit: 'pts',
      footer: 'Rank: Beginner'
    },
    {
      id: 'courses',
      icon: '🎓',
      title: 'Courses',
      value: '0',
      unit: 'completed',
      footer: '0 courses in progress'
    },
    {
      id: 'time',
      icon: '⏱️',
      title: 'Time Spent',
      value: '0',
      unit: 'hours',
      footer: '0 minutes today'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'React Fundamentals',
      icon: '⚛️',
      progress: 65,
      type: 'course'
    },
    {
      id: 2,
      title: 'Memory Match',
      icon: '🎮',
      score: 850,
      type: 'game'
    },
    {
      id: 3,
      title: 'Node.js Basics',
      icon: '💻',
      progress: 40,
      type: 'course'
    },
    {
      id: 4,
      title: 'Algorithm Challenge',
      icon: '🧮',
      type: 'challenge'
    }
  ];

  const learningPaths = [
    { id: 1, title: 'Web Development', progress: 45, icon: '🌐' },
    { id: 2, title: 'Data Structures', progress: 72, icon: '📊' },
    { id: 3, title: 'Cloud Computing', progress: 30, icon: '☁️' },
    { id: 4, title: 'Machine Learning', progress: 0, icon: '🤖' }
  ];

  const handleContinueLearning = () => {
    navigate('/learning');  // Add this function
  };

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back, Learner!</h1>
          <p>Your personalized learning dashboard is ready. Continue your learning journey!</p>
          <div className="welcome-actions">
            <motion.button 
              className="continue-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinueLearning}  // Add this handler
            >
              Continue Learning
            </motion.button>
            <motion.button 
              className="progress-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Progress
            </motion.button>
          </div>
        </div>
        <div className="profile-preview">
          <motion.div 
            className="profile-avatar"
            whileHover={{ scale: 1.1 }}
          >
            👤
          </motion.div>
        </div>
      </motion.div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className={`stat-card ${stat.id}`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value">
              {stat.value}
              <span className="stat-unit">{stat.unit}</span>
            </div>
            <div className="stat-footer">{stat.footer}</div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <motion.div 
          className="recent-activity"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="section-header">
            <h2>Recent Activity <span className="live-badge">Live</span></h2>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                className="activity-item"
                whileHover={{ x: 10 }}
              >
                <div className="activity-info">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-details">
                    <div className="activity-title">{activity.title}</div>
                    {activity.score && <div className="activity-score">Score: {activity.score}</div>}
                  </div>
                </div>
                {activity.progress && (
                  <div className="progress-bar">
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${activity.progress}%` }}
                    />
                  </div>
                )}
                <button className="play-btn">▶</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="learning-path"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="section-header">
            <h2>Learning Path Progress</h2>
          </div>
          <div className="path-list">
            {learningPaths.map((path) => (
              <motion.div
                key={path.id}
                className="path-item"
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="path-info">
                  <div className="path-icon">{path.icon}</div>
                  <div className="path-title">{path.title}</div>
                </div>
                <div className="path-progress">
                  <div className="progress-bar">
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${path.progress}%` }}
                    />
                  </div>
                  <span className="progress-text">{path.progress}%</span>
                </div>
                <motion.button 
                  className="continue-link"
                  whileHover={{ scale: 1.1 }}
                >
                  Continue
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;