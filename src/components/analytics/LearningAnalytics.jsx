import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LearningAnalytics.css';

const LearningAnalytics = () => {
  const [activeTab, setActiveTab] = useState('LEARNING PATTERNS');
  
  const tabs = ['COGNITIVE PERFORMANCE', 'LEARNING PATTERNS', 'PREDICTIVE MODELS', 'PEER COMPARISON'];
  
  // Fixed data to match the image
  const dailyData = [65, 85, 95, 65, 55, 65, 70, 85, 75, 65, 60, 65];
  const weeklyData = [65, 85, 95, 85, 65, 55, 65];

  const renderContent = () => {
    switch(activeTab) {
      case 'LEARNING PATTERNS':
        return (
          <motion.div 
            className="analytics-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>Optimal Learning Times</h3>
              <p>Hours of the day when your learning productivity is highest.</p>
              <div className="bar-chart-container">
                <div className="bar-chart">
                  {dailyData.map((height, index) => (
                    <motion.div 
                      key={index}
                      className={`bar ${index === 2 || index === 8 ? 'peak' : ''}`}
                      style={{ '--bar-height': `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  ))}
                </div>
                <div className="peak-label">Peak</div>
              </div>
              <div className="time-labels">
                <span>9 AM</span>
                <span>8 PM</span>
              </div>
            </motion.div>

            <motion.div 
              className="chart-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Weekly Productivity Pattern</h3>
              <p>Your learning effectiveness throughout the week.</p>
              <div className="bar-chart-container">
                <div className="bar-chart">
                  {weeklyData.map((height, index) => (
                    <motion.div 
                      key={index}
                      className={`bar ${index === 2 ? 'best' : ''}`}
                      style={{ '--bar-height': `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  ))}
                </div>
                <div className="best-label">Best</div>
              </div>
              <div className="day-labels">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <div className="placeholder-content">
            <p>Select Learning Patterns to view analytics</p>
          </div>
        );
    }
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Learning Analytics</h2>
        <div className="analytics-tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${tab === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
};

export default LearningAnalytics;