import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './NextGenFeatures.css';

const NextGenFeatures = () => {
  const [activeFeature, setActiveFeature] = useState('Coding Arena');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userSolution, setUserSolution] = useState('');
  const [submissionResult, setSubmissionResult] = useState('');
  const [codingStreak, setCodingStreak] = useState(0);
  const [showTestCases, setShowTestCases] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const roadmapRef = useRef(null);

  // Updated features array to match the image
  // Update the features array
  const features = [
    { name: 'Coding Arena', icon: '💻', releaseDate: 'Q1-Q2 2025', color: '#9c27b0' },
    { name: 'AI Programming Assistant', icon: '</>', releaseDate: 'Q3-Q4 2025', color: '#2196f3', description: 'Your intelligent coding companion powered by advanced AI.' },
    { name: 'Digital Twin Learning', icon: '🔄', releaseDate: 'Q1-Q2 2026', color: '#ff9800', description: 'Create virtual replicas of real-world systems.' },
    { name: 'Immersive Learning', icon: '🎮', releaseDate: 'Q3-Q4 2026', color: '#4caf50', description: 'Step into VR/AR learning environments.' },
    { name: 'Quantum Computing', icon: '⚛️', releaseDate: 'Q1-Q2 2027', color: '#e91e63', description: 'Explore quantum algorithms and computing.' },
    { name: 'Knowledge Marketplace', icon: '🏪', releaseDate: 'Q3-Q4 2027', color: '#607d8b', description: 'Share and acquire knowledge in a community marketplace.' },
    { name: 'LMS Integration', icon: '🔗', releaseDate: 'Q1-Q2 2028', color: '#009688', description: 'Seamlessly integrate with popular Learning Management Systems for enhanced educational experiences.' }
  ];

  const codingChallenges = [
    {
      id: 1,
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
      testCases: [
        { input: '[2,7,11,15], target=9', output: '[0,1]' },
        { input: '[3,2,4], target=6', output: '[1,2]' }
      ],
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Reverse String',
      description: 'Write a function that reverses a string without using built-in reverse methods.',
      testCases: [
        { input: '"hello"', output: '"olleh"' },
        { input: '"world"', output: '"dlrow"' }
      ],
      difficulty: 'Easy'
    },
    {
      id: 3,
      title: 'Palindrome Check',
      description: 'Determine if a given string is a palindrome.',
      testCases: [
        { input: '"racecar"', output: 'true' },
        { input: '"hello"', output: 'false' }
      ],
      difficulty: 'Medium'
    },
    {
      id: 4,
      title: 'Factorial Calculation',
      description: 'Calculate the factorial of a given number.',
      testCases: [
        { input: '5', output: '120' },
        { input: '3', output: '6' }
      ],
      difficulty: 'Medium'
    }
  ];

  const validateCode = (code) => {
    const requiredElements = [
      'int binarySearch',
      'int arr[]',
      'int left',
      'int right',
      'int target',
      'return',
      'while'
    ];
    
    // Basic syntax validation
    const hasRequiredElements = requiredElements.every(element => 
      code.includes(element)
    );
    
    // Check for basic binary search logic
    const hasSearchLogic = code.includes('mid') && 
      (code.includes('/2') || code.includes('>> 1')) &&
      code.includes('arr[mid]');
    
    return hasRequiredElements && hasSearchLogic;
  };

  const handleRunCode = () => {
    try {
      const isValid = validateCode(userSolution);
      if (isValid) {
        setSubmissionResult('Success! Your animation code is correct.');
        setCodingStreak(prev => prev + 1);
      } else {
        setSubmissionResult('Try again. Make sure to include all required properties.');
      }
    } catch (error) {
      setSubmissionResult(`Error: ${error.message}`);
    }
  };

  const handleTestCases = () => {
    setShowTestCases(!showTestCases);
  };

  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setUserSolution('');
    setSubmissionResult('');
  };

  return (
    <div className="nextgen-container">
      <motion.div 
        className="feature-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <h1>Next-Generation Features</h1>
          <p>
            Explore the cutting-edge technologies that will define the future of NeuroLearn. 
            These innovative features are currently in development and will be released according to our strategic roadmap.
          </p>
          <motion.button 
            className="roadmap-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setShowRoadmap(true);
              setTimeout(() => {
                roadmapRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            View Complete Roadmap
          </motion.button>
        </div>
      </motion.div>

      {/* Feature selection grid - matching the image */}
      <motion.div 
        className="feature-selection-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            className={`feature-card ${activeFeature === feature.name ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.name)}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            style={{ 
              '--feature-color': feature.color 
            }}
          >
            <div className="feature-icon-container">
              <span className="feature-icon">{feature.icon}</span>
            </div>
            <h3>{feature.name}</h3>
            <span className="feature-release-date">{feature.releaseDate}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature tabs - matching the image */}
      <motion.div 
        className="feature-tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {features.slice(0, 4).map((feature) => (
          <motion.div
            key={feature.name}
            className={`feature-tab ${activeFeature === feature.name ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.name)}
            whileHover={{ scale: 1.05 }}
            style={{ 
              '--feature-color': feature.color 
            }}
          >
            <span className="tab-icon">{feature.icon}</span>
            <span className="tab-name">{feature.name}</span>
          </motion.div>
        ))}
        <motion.div className="tab-scroll-indicator">
          <span>›</span>
        </motion.div>
      </motion.div>

  
      {activeFeature !== 'Coding Arena' && (
        <motion.div 
          className="feature-showcase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="preview-header">
            <div className="preview-icon">
              {features.find(f => f.name === activeFeature)?.icon}
            </div>
            <div className="preview-title">
              <h2>{activeFeature}</h2>
              <span className="launch-date">
                {features.find(f => f.name === activeFeature)?.releaseDate}
              </span>
            </div>
          </div>

          <div className="feature-details">
            <p className="feature-description">
              {features.find(f => f.name === activeFeature)?.description}
            </p>
            <div className="development-status">
              <span className="status-dot"></span>
              Coming Soon
            </div>
            <div className="launch-countdown">
              <div className="countdown-item">
                <span className="countdown-value">180</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">12</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">45</span>
                <span className="countdown-label">Minutes</span>
              </div>
            </div>
          </div>

          <div className="feature-cta">
            <motion.button 
              className="launch-notify-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ '--feature-color': features.find(f => f.name === activeFeature)?.color }}
            >
              <span className="btn-icon">🚀</span>
              Get Notified
            </motion.button>
            <div className="launch-stats">
              <div className="stat-item">
                <span className="stat-value">2.5K+</span>
                <span className="stat-label">Interested Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">85%</span>
                <span className="stat-label">Development</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Coding Arena section remains the same */}
      {activeFeature === 'Coding Arena' && (
        <motion.div 
          className="coding-arena"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="arena-title">Coding Contest</h1>
          <div className="arena-container">
            <div className="question-panel">
              <h2 className="panel-title">Question</h2>
              <div className="question-content">
                <h3>Binary Search Implementation</h3>
                <p>Implement a binary search function in C that searches for a target element in a sorted array.</p>
                <div className="requirements">
                  <p>Function signature:</p>
                  <code>int binarySearch(int arr[], int left, int right, int target)</code>
                  <p>Requirements:</p>
                  <ul>
                    <li>Return the index if target is found</li>
                    <li>Return -1 if target is not found</li>
                    <li>Array is sorted in ascending order</li>
                  </ul>
                  <p>Example:</p>
                  <pre>
                    Input: arr = [2, 4, 6, 8, 10], target = 6
                    Output: 2 (index of target)
                  </pre>
                </div>
              </div>
            </div>

            <div className="code-implementation">
              <h2 className="panel-title">Code Implementation</h2>
              <div className="code-editor">
                <pre>
                  <code>
                    <textarea
                      className="code-textarea"
                      value={userSolution}
                      onChange={(e) => setUserSolution(e.target.value)}
                      placeholder="Write your C code here..."
                      spellCheck="false"
                    />
                  </code>
                </pre>
              </div>
              
              <motion.button
                className="run-button"
                onClick={handleRunCode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Run
              </motion.button>

              {submissionResult && (
                <motion.div 
                  className={`result-panel ${submissionResult.includes('Success') ? 'success' : 'error'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {submissionResult}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NextGenFeatures;
