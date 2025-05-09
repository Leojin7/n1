import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './NextGenFeatures.css';

const NextGenFeatures = () => {
  const [activeFeature, setActiveFeature] = useState('Coding Arena');

  const [selectedChallenge, setSelectedChallenge] = useState(null); 
  const [userSolution, setUserSolution] = useState('');
  const [submissionResult, setSubmissionResult] = useState(''); 
  const [testResults, setTestResults] = useState(null); 
  const [codingStreak, setCodingStreak] = useState(0);
  
  const [simStatus, setSimStatus] = useState('Idle');
  const [vrStatus, setVrStatus] = useState('Disconnected');
  const [marketplaceSearchTerm, setMarketplaceSearchTerm] = useState('');
  const [marketplaceStatus, setMarketplaceStatus] = useState('');

  const [showRoadmap, setShowRoadmap] = useState(false);
  const roadmapRef = useRef(null);

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
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. Assume exactly one solution exists.',
      difficulty: 'Easy',
      placeholderCode: `function twoSum(nums, target) {\n  // Write your code here\n  \n}`,
      testCases: [
        { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: '[0, 1]' }, // Output format might vary
        { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: '[1, 2]' },
        { input: { nums: [3, 3], target: 6 }, expectedOutput: '[0, 1]' },
      ],
    
      keywords: ['for', 'let', 'const', 'return', '+', 'nums', 'target'] 
    },
    {
      id: 2,
      title: 'Reverse String',
      description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
      difficulty: 'Easy',
      placeholderCode: `function reverseString(s) {\n  // Write your code here\n  \n}`,
      testCases: [
        { input: { s: ['h', 'e', 'l', 'l', 'o'] }, expectedOutput: "['o','l','l','e','h']" },
        { input: { s: ['H', 'a', 'n', 'n', 'a', 'h'] }, expectedOutput: "['h','a','n','n','a','H']" },
      ],
      keywords: ['for', 'while', 'let', 'const', 's.length', '=']
    },
    // Add more challenges as needed
  ];

  // --- Mock Code Validation & Execution ---
  // This is a VERY simplified mock validation. A real system needs a secure sandbox.
  const runMockCode = (code, challenge) => {
    if (!code || !challenge) return { success: false, message: 'Invalid code or challenge' };

    try {
      // Create a safe function from the user's code
      const userFunction = new Function('nums', 'target', 's', code);
      
      // Test each test case
      const results = challenge.testCases.map(testCase => {
        let passed = false;
        let actual;
        
        try {
          // Execute based on challenge type
          if (challenge.title === 'Two Sum') {
            actual = userFunction(testCase.input.nums, testCase.input.target);
            // Convert actual to string for comparison
            const actualStr = JSON.stringify(actual);
            passed = actualStr === testCase.expectedOutput;
          } else if (challenge.title === 'Reverse String') {
            actual = userFunction(testCase.input.s);
            // Convert actual to string for comparison
            const actualStr = JSON.stringify(actual);
            passed = actualStr === testCase.expectedOutput;
          }
        } catch (error) {
          actual = `Error: ${error.message}`;
        }

        return {
          input: JSON.stringify(testCase.input),
          expected: testCase.expectedOutput,
          actual: JSON.stringify(actual),
          passed
        };
      });
  
      const allPassed = results.every(result => result.passed);
      
      return {
        success: allPassed,
        message: allPassed ? 'All test cases passed!' : 'Some test cases failed.',
        testResults: results
      };
    } catch (error) {
      return {
        success: false,
        message: `Compilation Error: ${error.message}`,
        testResults: []
      };
    };
  };

  const handleRunCode = () => {
    if (!selectedChallenge) {
        setSubmissionResult('Please select a challenge first.');
        setTestResults(null);
        return;
    }
    try {
      const { overallResult, testResults: detailedResults } = runMockCode(userSolution, selectedChallenge);
      setSubmissionResult(overallResult);
      setTestResults(detailedResults); // Set detailed results

      if (overallResult.includes('Success')) {
        setCodingStreak(prev => prev + 1);
      }
    } catch (error) {
      // This catch block might be less relevant with mock execution
      setSubmissionResult(`Error during simulation: ${error.message}`);
      setTestResults(null);
    }
  };

  // --- Challenge Selection Handler ---
  const handleChallengeSelect = (challengeId) => {
    const challenge = codingChallenges.find(c => c.id === challengeId);
    setSelectedChallenge(challenge);
    setUserSolution(challenge ? challenge.placeholderCode : ''); // Set placeholder code
    setSubmissionResult('');
    setTestResults(null); // Clear previous results
  };

  // --- Handlers for other feature previews ---
  const handleSimulate = (action) => {
    if (action === 'start') setSimStatus('Running...');
    else if (action === 'reset') setSimStatus('Resetting...');
    else if (action === 'params') setSimStatus('Configuring Parameters...');
    setTimeout(() => setSimStatus('Idle'), 1500); // Reset status after a delay
  };

  const handleVrConnect = () => {
    setVrStatus('Connecting...');
    setTimeout(() => setVrStatus(Math.random() > 0.3 ? 'Connected' : 'Failed to Connect'), 2000);
  };
  
  const handleMarketplaceSearch = () => {
      setMarketplaceStatus(`Searching for "${marketplaceSearchTerm}"...`);
      setTimeout(() => setMarketplaceStatus(marketplaceSearchTerm ? `Found ${Math.floor(Math.random() * 10)} results for "${marketplaceSearchTerm}"` : 'Search cleared.'), 1500);
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

  
      {/* REMOVED the generic feature-showcase block that was here */}
      {/* {activeFeature !== 'Coding Arena' && ( ... )} */}


      {/* Feature Previews */}
      {activeFeature === 'AI Programming Assistant' && (
        <motion.div 
          className="feature-showcase ai-assistant-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ '--feature-color': features.find(f => f.name === activeFeature)?.color }}
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

          <div className="feature-preview-content">
            <div className="code-assistant">
              <h3>Smart Code Completion</h3>
              <div className="code-editor">
                <pre className="code-sample">
                {`function calculateSum(a, b) {
                  // AI suggests completion
                  return a + b;
                }

                // Start typing to see AI suggestions
                function sortArray(arr) {
                  // AI will suggest efficient sorting algorithm
                }`} {/* Removed the extra closing backtick and curly brace from here */}
                </pre>
              </div>
            </div>
            
            <div className="ai-features-grid">
              <div className="ai-feature-card">
                <span className="ai-feature-icon">🔍</span>
                <h4>Intelligent Code Analysis</h4>
                <p>Identifies bugs and suggests optimizations in real-time</p>
              </div>
              <div className="ai-feature-card">
                <span className="ai-feature-icon">📚</span>
                <h4>Documentation Generator</h4>
                <p>Creates comprehensive documentation from your code</p>
              </div>
              <div className="ai-feature-card">
                <span className="ai-feature-icon">🔄</span>
                <h4>Code Refactoring</h4>
                <p>Suggests cleaner, more efficient code structures</p>
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
              Get Early Access
            </motion.button>
          </div>
        </motion.div> // Closing tag for AI Assistant motion.div
      )}

      {activeFeature === 'Digital Twin Learning' && (
        <motion.div 
          className="feature-showcase digital-twin-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ '--feature-color': features.find(f => f.name === activeFeature)?.color }}
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

          <div className="feature-preview-content">
            <div className="simulation-view">
              <h3>Virtual Environment Simulation</h3>
              <div className="simulation-placeholder">
                <span className="simulation-icon">🌐</span>
                {/* --- Show Simulation Status --- */}
                <p>Status: {simStatus}</p> 
                <div className="simulation-controls">
                  {/* --- Add onClick handlers --- */}
                  <button className="sim-control-btn" onClick={() => handleSimulate('start')}>Start Simulation</button>
                  <button className="sim-control-btn" onClick={() => handleSimulate('reset')}>Reset</button>
                  <button className="sim-control-btn" onClick={() => handleSimulate('params')}>Parameters</button>
                </div>
              </div>
            </div>
            
            <div className="twin-features">
              <div className="twin-feature-item">
                <h4>Real-time Data Mirroring</h4>
                <p>Create virtual replicas that respond exactly like real-world systems</p>
              </div>
              <div className="twin-feature-item">
                <h4>Scenario Testing</h4>
                <p>Test different scenarios without risk to physical equipment</p>
              </div>
              <div className="twin-feature-item">
                <h4>Predictive Analysis</h4>
                <p>Forecast outcomes based on simulation data</p>
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
              <span className="btn-icon">🔔</span>
              Join Beta Program
            </motion.button>
          </div>
        </motion.div> // Closing tag for Digital Twin motion.div
      )}

      {activeFeature === 'Immersive Learning' && (
        <motion.div 
          className="feature-showcase immersive-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ '--feature-color': features.find(f => f.name === activeFeature)?.color }}
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

          <div className="feature-preview-content">
            <div className="vr-experience">
              <h3>VR Learning Space</h3>
              <div className="vr-placeholder">
                <span className="vr-icon">🎯</span>
                {/* --- Show VR Status --- */}
                <p>Status: {vrStatus}</p> 
                <div className="vr-device-selector">
                  <select className="vr-device-dropdown" disabled={vrStatus === 'Connecting...' || vrStatus === 'Connected'}>
                    <option>Oculus Quest 3</option>
                    <option>Valve Index</option>
                    <option>Pico 4</option>
                  </select>
                  {/* --- Add onClick handler --- */}
                  <button 
                    className="vr-connect-btn" 
                    onClick={handleVrConnect}
                    disabled={vrStatus === 'Connecting...' || vrStatus === 'Connected'}
                  >
                    {vrStatus === 'Connected' ? 'Connected' : vrStatus === 'Connecting...' ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="immersive-features">
              <div className="immersive-feature">
                <h4>Spatial Learning</h4>
                <p>Interact with 3D models and concepts in virtual space</p>
              </div>
              <div className="immersive-feature">
                <h4>Collaborative VR</h4>
                <p>Join virtual classrooms with peers from around the world</p>
              </div>
              <div className="immersive-feature">
                <h4>Haptic Feedback</h4>
                <p>Feel and manipulate virtual objects for enhanced learning</p>
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
              <span className="btn-icon">📱</span>
              Download VR Companion App
            </motion.button>
          </div>
        </motion.div>
      )}

      {activeFeature === 'Quantum Computing' && (
        <motion.div 
          className="feature-showcase quantum-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ '--feature-color': features.find(f => f.name === activeFeature)?.color }}
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

          <div className="feature-preview-content">
            <div className="quantum-simulator">
              <h3>Quantum Circuit Designer</h3>
              <div className="quantum-placeholder">
                <span className="quantum-icon">⚛️</span>
                <p>Design Quantum Circuits</p>
                <div className="quantum-controls">
                  <button className="quantum-gate-btn">H</button>
                  <button className="quantum-gate-btn">X</button>
                  <button className="quantum-gate-btn">Y</button>
                  <button className="quantum-gate-btn">Z</button>
                  <button className="quantum-gate-btn">CNOT</button>
                </div>
              </div>
            </div>
            
            <div className="quantum-features">
              <div className="quantum-feature">
                <h4>Quantum Algorithm Visualization</h4>
                <p>See quantum algorithms in action with interactive visualizations</p>
              </div>
              <div className="quantum-feature">
                <h4>Quantum Programming</h4>
                <p>Learn quantum programming languages like Qiskit and Q#</p>
              </div>
              <div className="quantum-feature">
                <h4>Real Quantum Hardware Access</h4>
                <p>Run your quantum programs on actual quantum computers</p>
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
              <span className="btn-icon">⚛️</span>
              Join Quantum Waitlist
            </motion.button>
          </div>
        </motion.div>
      )}

      {activeFeature === 'Knowledge Marketplace' && (
        <motion.div 
          className="feature-showcase marketplace-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ '--feature-color': features.find(f => f.name === activeFeature)?.color }}
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

          <div className="feature-preview-content">
            <div className="marketplace-view">
              <h3>Course Exchange Platform</h3>
              <div className="marketplace-placeholder">
                <span className="store-icon">🏪</span>
                <p>Browse Learning Resources</p>
                <div className="marketplace-search">
                  <input type="text" placeholder="Search courses, tutorials, and resources..." className="marketplace-search-input" />
                  <button className="marketplace-search-btn" onClick={handleMarketplaceSearch}>Search</button>
                </div>
              </div>
            </div>
            
            <div className="marketplace-features">
              <div className="marketplace-feature">
                <h4>Creator Economy</h4>
                <p>Monetize your knowledge by creating and selling educational content</p>
              </div>
              <div className="marketplace-feature">
                <h4>Peer Reviews</h4>
                <p>Community-driven quality control through ratings and reviews</p>
              </div>
              <div className="marketplace-feature">
                <h4>Knowledge Tokens</h4>
                <p>Earn tokens by contributing valuable educational resources</p>
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
              <span className="btn-icon">📚</span>
              Become a Creator
            </motion.button>
          </div>
        </motion.div>
      )}

      {activeFeature === 'LMS Integration' && (
        <motion.div 
          className="feature-showcase lms-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ '--feature-color': features.find(f => f.name === activeFeature)?.color }}
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

          <div className="feature-preview-content">
            <div className="lms-integration-view">
              <h3>Connect Your Learning Management System</h3>
              <div className="lms-placeholder">
                <span className="lms-icon">🔗</span>
                <p>Seamless Integration with Popular LMS Platforms</p>
                <div className="lms-platforms">
                  <div className="lms-platform-logo">Canvas</div>
                  <div className="lms-platform-logo">Moodle</div>
                  <div className="lms-platform-logo">Blackboard</div>
                  <div className="lms-platform-logo">D2L</div>
                </div>
              </div>
            </div>
            
            <div className="lms-features">
              <div className="lms-feature">
                <h4>Single Sign-On</h4>
                <p>Seamless authentication between NeuroLearn and your LMS</p>
              </div>
              <div className="lms-feature">
                <h4>Grade Synchronization</h4>
                <p>Automatically sync grades and progress with your LMS</p>
              </div>
              <div className="lms-feature">
                <h4>Content Integration</h4>
                <p>Embed NeuroLearn content directly in your LMS courses</p>
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
              <span className="btn-icon">🔌</span>
              Request Integration
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Wrap the Coding Arena block in its conditional check */}
      {activeFeature === 'Coding Arena' && (
        <motion.div 
          className="feature-showcase coding-arena-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="preview-header">
            <div className="preview-icon">💻</div>
            <div className="preview-title">
              <h2>Coding Arena</h2>
              <div className="coding-stats">
                <span className="streak-counter">🔥 Streak: {codingStreak} days</span>
                <span className="difficulty-label">Current Level: {selectedChallenge?.difficulty || 'Not Selected'}</span>
              </div>
            </div>
          </div>

          <div className="challenge-selection">
            <select 
              onChange={(e) => handleChallengeSelect(Number(e.target.value))}
              value={selectedChallenge?.id || ''}
              className="challenge-dropdown"
            >
              <option value="">Select a Challenge</option>
              {codingChallenges.map(challenge => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.title} - {challenge.difficulty}
                </option>
              ))}
            </select>
          </div>

          {selectedChallenge && (
            <div className="challenge-details">
              <motion.div 
                className="challenge-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3>{selectedChallenge.title}</h3>
                <p>{selectedChallenge.description}</p>
                <div className="test-cases-preview">
                  <h4>Test Cases:</h4>
                  {selectedChallenge.testCases.map((test, index) => (
                    <div key={index} className="test-case-item">
                      Input: {JSON.stringify(test.input)}
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="code-implementation">
                <div className="editor-header">
                  <h4>Your Solution</h4>
                  <div className="editor-controls">
                    <button onClick={() => setUserSolution(selectedChallenge.placeholderCode)}>Reset Code</button>
                  </div>
                </div>
                <div className="code-editor">
                  <textarea
                    className="code-textarea"
                    value={userSolution}
                    onChange={(e) => setUserSolution(e.target.value)}
                    spellCheck="false"
                  />
                </div>
                
                <motion.button
                  className="run-button"
                  onClick={handleRunCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Run Tests
                </motion.button>
              </div>

              {testResults && (
                <motion.div 
                  className="test-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4>Test Results</h4>
                  {testResults.map((result, index) => (
                    <div key={index} className={`test-result-item ${result.passed ? 'passed' : 'failed'}`}>
                      <div className="test-info">
                        <span className="test-number">Test {index + 1}</span>
                        <span className={`test-status ${result.passed ? 'passed' : 'failed'}`}>
                          {result.passed ? '✅ Passed' : '❌ Failed'}
                        </span>
                      </div>
                      <div className="test-details">
                        <div>Input: {result.input}</div>
                        <div>Expected: {result.expected}</div>
                        <div>Actual: {result.actual}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}

      </div> // This is the main container closing div
    );
  };

  export default NextGenFeatures;

