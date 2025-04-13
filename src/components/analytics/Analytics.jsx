import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Analytics.css';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // Simulate data loading when tab changes
  useEffect(() => {
    setIsLoading(true);
    setData(null);
    
    // Simulate API call
    const timer = setTimeout(() => {
      setData(generateTabData(activeTab));
      setIsLoading(false);
    }, 1200); // Simulate loading delay
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Generate mock data based on active tab
  const generateTabData = (tab) => {
    switch(tab) {
      case 'learning':
        return {
          title: 'Learning Patterns',
          charts: [
            {
              id: 'study-time',
              title: 'Study Time Distribution',
              description: 'Hours spent studying different subjects over time',
              type: 'bar',
              color: '#3b82f6'
            },
            {
              id: 'completion-rate',
              title: 'Course Completion Rate',
              description: 'Percentage of courses completed vs. started',
              type: 'line',
              color: '#10b981'
            },
            {
              id: 'learning-style',
              title: 'Learning Style Analysis',
              description: 'Your preferred learning methods based on engagement',
              type: 'radar',
              color: '#8b5cf6'
            },
            {
              id: 'topic-mastery',
              title: 'Topic Mastery Progression',
              description: 'How your understanding of key topics has evolved',
              type: 'line',
              color: '#f59e0b'
            }
          ]
        };
      case 'predictive':
        return {
          title: 'Predictive Models',
          charts: [
            {
              id: 'success-prediction',
              title: 'Success Prediction',
              description: 'Likelihood of mastering upcoming topics based on current progress',
              type: 'bar',
              color: '#3b82f6'
            },
            {
              id: 'knowledge-gaps',
              title: 'Knowledge Gap Analysis',
              description: 'Areas that may require additional focus',
              type: 'heatmap',
              color: '#ef4444'
            },
            {
              id: 'optimal-path',
              title: 'Optimal Learning Path',
              description: 'Recommended sequence of topics for maximum efficiency',
              type: 'line',
              color: '#10b981'
            },
            {
              id: 'retention-forecast',
              title: 'Knowledge Retention Forecast',
              description: 'Predicted retention of learned material over time',
              type: 'line',
              color: '#8b5cf6'
            }
          ]
        };
      case 'peer':
        return {
          title: 'Peer Comparison',
          charts: [
            {
              id: 'progress-comparison',
              title: 'Progress Comparison',
              description: 'Your progress compared to peers in similar learning paths',
              type: 'bar',
              color: '#3b82f6'
            },
            {
              id: 'engagement-ranking',
              title: 'Engagement Ranking',
              description: 'How your platform engagement compares to others',
              type: 'line',
              color: '#f59e0b'
            },
            {
              id: 'collaborative-performance',
              title: 'Collaborative Performance',
              description: 'Effectiveness in group learning activities',
              type: 'radar',
              color: '#10b981'
            },
            {
              id: 'community-contribution',
              title: 'Community Contribution',
              description: 'Your impact on the learning community',
              type: 'bar',
              color: '#8b5cf6'
            }
          ]
        };
      case 'cognitive':
        return {
          title: 'Cognitive Performance',
          charts: [
            {
              id: 'focus-duration',
              title: 'Focus Duration',
              description: 'Average length of focused study sessions',
              type: 'line',
              color: '#3b82f6'
            },
            {
              id: 'memory-retention',
              title: 'Memory Retention',
              description: 'Performance on recall exercises over time',
              type: 'bar',
              color: '#10b981'
            },
            {
              id: 'problem-solving',
              title: 'Problem-Solving Efficiency',
              description: 'Time taken to solve problems of similar difficulty',
              type: 'line',
              color: '#f59e0b'
            },
            {
              id: 'cognitive-load',
              title: 'Cognitive Load Analysis',
              description: 'Optimal study intensity based on performance metrics',
              type: 'heatmap',
              color: '#8b5cf6'
            }
          ]
        };
      default:
        return null;
    }
  };

  // Render chart based on type
  const renderChart = (chart) => {
    switch(chart.type) {
      case 'bar':
        return (
          <div className="bar-chart-container" style={{ '--chart-color': chart.color }}>
            <div className="placeholder-chart">
              {/* In a real app, you would render an actual chart library here */}
              <svg width="100%" height="100%" viewBox="0 0 300 200">
                <rect x="10" y="150" width="40" height="40" fill={chart.color} opacity="0.7" />
                <rect x="60" y="100" width="40" height="90" fill={chart.color} opacity="0.8" />
                <rect x="110" y="50" width="40" height="140" fill={chart.color} opacity="0.9" />
                <rect x="160" y="80" width="40" height="110" fill={chart.color} />
                <rect x="210" y="120" width="40" height="70" fill={chart.color} opacity="0.8" />
                <rect x="260" y="70" width="40" height="120" fill={chart.color} opacity="0.9" />
              </svg>
            </div>
          </div>
        );
      case 'line':
        return (
          <div className="line-chart-container" style={{ '--chart-color': chart.color }}>
            <div className="placeholder-chart">
              {/* In a real app, you would render an actual chart library here */}
              <svg width="100%" height="100%" viewBox="0 0 300 200">
                <polyline 
                  points="10,150 60,120 110,140 160,60 210,90 260,40" 
                  fill="none" 
                  stroke={chart.color} 
                  strokeWidth="3"
                />
                <circle cx="10" cy="150" r="5" fill={chart.color} />
                <circle cx="60" cy="120" r="5" fill={chart.color} />
                <circle cx="110" cy="140" r="5" fill={chart.color} />
                <circle cx="160" cy="60" r="5" fill={chart.color} />
                <circle cx="210" cy="90" r="5" fill={chart.color} />
                <circle cx="260" cy="40" r="5" fill={chart.color} />
              </svg>
            </div>
          </div>
        );
      case 'radar':
        return (
          <div className="radar-chart-container" style={{ '--chart-color': chart.color }}>
            <div className="placeholder-chart">
              {/* In a real app, you would render an actual chart library here */}
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                <polygon 
                  points="100,30 140,60 130,110 70,110 60,60" 
                  fill={chart.color} 
                  opacity="0.3" 
                  stroke={chart.color} 
                  strokeWidth="2"
                />
                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.1)" />
                <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(255,255,255,0.1)" />
                <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(255,255,255,0.1)" />
                <line x1="50" y1="50" x2="150" y2="150" stroke="rgba(255,255,255,0.1)" />
                <line x1="50" y1="150" x2="150" y2="50" stroke="rgba(255,255,255,0.1)" />
              </svg>
            </div>
          </div>
        );
      case 'heatmap':
        return (
          <div className="heatmap-container" style={{ '--chart-color': chart.color }}>
            <div className="placeholder-chart">
              {/* In a real app, you would render an actual chart library here */}
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                <rect x="10" y="10" width="30" height="30" fill={chart.color} opacity="0.3" />
                <rect x="45" y="10" width="30" height="30" fill={chart.color} opacity="0.5" />
                <rect x="80" y="10" width="30" height="30" fill={chart.color} opacity="0.7" />
                <rect x="115" y="10" width="30" height="30" fill={chart.color} opacity="0.9" />
                <rect x="150" y="10" width="30" height="30" fill={chart.color} />
                
                <rect x="10" y="45" width="30" height="30" fill={chart.color} opacity="0.6" />
                <rect x="45" y="45" width="30" height="30" fill={chart.color} opacity="0.3" />
                <rect x="80" y="45" width="30" height="30" fill={chart.color} opacity="0.8" />
                <rect x="115" y="45" width="30" height="30" fill={chart.color} opacity="0.4" />
                <rect x="150" y="45" width="30" height="30" fill={chart.color} opacity="0.7" />
                
                <rect x="10" y="80" width="30" height="30" fill={chart.color} opacity="0.9" />
                <rect x="45" y="80" width="30" height="30" fill={chart.color} opacity="0.6" />
                <rect x="80" y="80" width="30" height="30" fill={chart.color} opacity="0.2" />
                <rect x="115" y="80" width="30" height="30" fill={chart.color} opacity="0.8" />
                <rect x="150" y="80" width="30" height="30" fill={chart.color} opacity="0.5" />
                
                <rect x="10" y="115" width="30" height="30" fill={chart.color} opacity="0.4" />
                <rect x="45" y="115" width="30" height="30" fill={chart.color} opacity="0.9" />
                <rect x="80" y="115" width="30" height="30" fill={chart.color} opacity="0.5" />
                <rect x="115" y="115" width="30" height="30" fill={chart.color} opacity="0.3" />
                <rect x="150" y="115" width="30" height="30" fill={chart.color} opacity="0.7" />
                
                <rect x="10" y="150" width="30" height="30" fill={chart.color} opacity="0.8" />
                <rect x="45" y="150" width="30" height="30" fill={chart.color} opacity="0.4" />
                <rect x="80" y="150" width="30" height="30" fill={chart.color} opacity="0.6" />
                <rect x="115" y="150" width="30" height="30" fill={chart.color} opacity="0.9" />
                <rect x="150" y="150" width="30" height="30" fill={chart.color} opacity="0.3" />
              </svg>
            </div>
          </div>
        );
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Learning Analytics</h2>
        <div className="analytics-tabs">
          <button 
            className={`tab-button ${activeTab === 'learning' ? 'active' : ''}`}
            onClick={() => setActiveTab('learning')}
          >
            Learning Patterns
          </button>
          <button 
            className={`tab-button ${activeTab === 'predictive' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictive')}
          >
            Predictive Models
          </button>
          <button 
            className={`tab-button ${activeTab === 'peer' ? 'active' : ''}`}
            onClick={() => setActiveTab('peer')}
          >
            Peer Comparison
          </button>
          <button 
            className={`tab-button ${activeTab === 'cognitive' ? 'active' : ''}`}
            onClick={() => setActiveTab('cognitive')}
          >
            Cognitive Performance
          </button>
        </div>
      </div>

      <div className="analytics-content">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-container"
            >
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading {activeTab === 'learning' ? 'Learning Patterns' : 
                                          activeTab === 'predictive' ? 'Predictive Models' : 
                                          activeTab === 'peer' ? 'Peer Comparison' : 
                                          'Cognitive Performance'} data...</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="tab-content"
            >
              {data && (
                <>
                  <div className="analytics-grid">
                    {data.charts.map((chart) => (
                      <motion.div 
                        key={chart.id}
                        className="chart-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <h3>{chart.title}</h3>
                        <p>{chart.description}</p>
                        <div className="chart-container">
                          {renderChart(chart)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analytics;