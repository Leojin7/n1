import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StudyTools.css';
import SmartNotes from './SmartNotes';

const StudyTools = () => {
  const [activeToolId, setActiveToolId] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  
  // Define study tools
  const studyTools = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Create and study with digital flashcards to improve memory retention',
      icon: '🗃️',
      status: 'popular',
      colorStart: '#3b82f6',
      colorEnd: '#2563eb',
      colorRgb: '59, 130, 246',
      features: ['Spaced repetition', 'Progress tracking', 'Custom decks']
    },
    {
      id: 'notes',
      title: 'Smart Notes',
      description: 'AI-powered note-taking with automatic organization and summarization',
      icon: '📝',
      status: 'new',
      colorStart: '#8b5cf6',
      colorEnd: '#7c3aed',
      colorRgb: '139, 92, 246',
      features: ['Auto-summarization', 'Code snippets', 'Rich text editing']
    },
    {
      id: 'pomodoro',
      title: 'Focus Timer',
      description: 'Stay productive with customizable Pomodoro timer and focus tracking',
      icon: '⏱️',
      status: 'popular',
      colorStart: '#10b981',
      colorEnd: '#059669',
      colorRgb: '16, 185, 129',
      features: ['Pomodoro technique', 'Break reminders', 'Focus analytics']
    },
    {
      id: 'games',
      title: 'Educational Games',
      description: 'Learn while having fun with brain-training games and challenges',
      icon: '🎮',
      status: 'premium',
      colorStart: '#f59e0b',
      colorEnd: '#d97706',
      colorRgb: '245, 158, 11',
      features: ['Memory games', 'Quiz challenges', 'Cognitive training']
    }
  ];
  
  // Define educational games
  const educationalGames = [
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards with scientific concepts',
      thumbnail: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Memory+Match',
      url: 'https://example.com/games/memory-match',
      order: 1
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble words related to neuroscience to improve vocabulary',
      thumbnail: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Word+Scramble',
      url: 'https://example.com/games/word-scramble',
      order: 2
    },
    {
      id: 'math-challenge',
      title: 'Math Challenge',
      description: 'Solve mathematical problems against the clock to sharpen your skills',
      thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Math+Challenge',
      url: 'https://example.com/games/math-challenge',
      order: 3
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Test your knowledge across various scientific subjects and topics',
      thumbnail: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Quiz+Master',
      url: 'https://example.com/games/quiz-master',
      order: 4
    }
  ];
  
  // Sample flashcards data
  const flashcardsData = [
    { question: "What is the function of neurons?", answer: "Neurons are specialized cells that transmit information throughout the body in the form of electrical signals." },
    { question: "What is the prefrontal cortex responsible for?", answer: "The prefrontal cortex is responsible for executive functions including planning, decision making, and moderating social behavior." },
    { question: "What is neuroplasticity?", answer: "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life." }
  ];
  
  // Handle opening a tool
  const openTool = (toolId) => {
    setActiveToolId(toolId);
  };
  
  // Handle closing a tool
  const closeTool = () => {
    setActiveToolId(null);
  };
  
  // Handle launching a game
  const launchGame = (game) => {
    setActiveGame(game);
  };
  
  // Handle closing a game
  const closeGame = () => {
    setActiveGame(null);
  };
  
  // Flashcard state
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Notes state
  const [notes, setNotes] = useState('');
  
  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            // Play sound or notification
            alert("Time's up!");
          } else {
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timerMinutes, timerSeconds]);
  
  // Format time for display
  const formatTime = (minutes, seconds) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Tool-specific state management
  const [toolState, setToolState] = useState({
    notes: '',
    currentCard: 0,
    showAnswer: false,
    minutes: 25,
    seconds: 0,
    isTimerActive: false,
    activeGame: null
  });
  
  // Function to update specific tool state
  const updateToolState = (key, value) => {
    setToolState(prev => ({ ...prev, [key]: value }));
  };
  
  // Educational games data
  const games = [
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards with programming concepts',
      thumbnail: 'https://via.placeholder.com/300x180/0ea5e9/ffffff?text=Memory+Match',
      url: 'https://memory-match-game.netlify.app/'
    },
    {
      id: 'code-quiz',
      title: 'Code Quiz',
      description: 'Test your programming knowledge with interactive quizzes',
      thumbnail: 'https://via.placeholder.com/300x180/10b981/ffffff?text=Code+Quiz',
      url: 'https://code-quiz-app.netlify.app/'
    },
    {
      id: 'algorithm-visualizer',
      title: 'Algorithm Visualizer',
      description: 'Learn algorithms through interactive visualizations',
      thumbnail: 'https://via.placeholder.com/300x180/6366f1/ffffff?text=Algorithm+Visualizer',
      url: 'https://algorithm-visualizer-app.netlify.app/'
    }
  ];
  
  // Handle game launch
  const launchGame = (game) => {
    updateToolState('activeGame', game);
  };
  
  // Close game modal
  const closeGameModal = () => {
    updateToolState('activeGame', null);
  };

  const renderToolContent = (toolId) => {
    switch (toolId) {
      case 'notes':  // Changed from 'smart-notes' to match your tool ID
        return <SmartNotes />;
      case 'flashcards':
        return (
          <div className="tool-content">
            <h2>Flashcards</h2>
            <div className="flashcard-container">
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flashcard-front">
                  {flashcardsData[currentCard].question}
                </div>
                <div className="flashcard-back">
                  {flashcardsData[currentCard].answer}
                </div>
              </div>
              <div className="flashcard-controls">
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard - 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === 0}
                >
                  Previous
                </button>
                <span className="card-counter">
                  {currentCard + 1} / {flashcardsData.length}
                </span>
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard + 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === flashcardsData.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      case 'flashcards':
        return (
          <div className="tool-content">
            <h2>Flashcards</h2>
            <div className="flashcard-container">
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flashcard-front">
                  {flashcardsData[currentCard].question}
                </div>
                <div className="flashcard-back">
                  {flashcardsData[currentCard].answer}
                </div>
              </div>
              <div className="flashcard-controls">
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard - 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === 0}
                >
                  Previous
                </button>
                <span className="card-counter">
                  {currentCard + 1} / {flashcardsData.length}
                </span>
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard + 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === flashcardsData.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      case 'study-timer':
        return (
          <div className="tool-content">
            <h2>Study Timer</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'study-groups':
        return (
          <div className="tool-content">
            <h2>Study Groups</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'discussion-forum':
        return (
          <div className="tool-content">
            <h2>Discussion Forum</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'bookmarks':
        return (
          <div className="tool-content">
            <h2>Bookmarks</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'educational-games':
        return (
          <div className="tool-content">
            <h2>Educational Games</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <motion.div 
      className="tool-view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ '--tool-color': tool.color }}
    >
      <div className="tool-view-header" style={{ backgroundColor: tool.color }}>
        <div className="tool-view-title">
          <span className="tool-view-icon">{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <button className="close-tool-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="tool-view-body">
        {renderToolContent()}
      </div>
    </motion.div>
  );
};

const StudyTools = () => {
  const [activeToolId, setActiveToolId] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  
  // Define study tools
  const studyTools = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Create and study with digital flashcards to improve memory retention',
      icon: '🗃️',
      status: 'popular',
      colorStart: '#3b82f6',
      colorEnd: '#2563eb',
      colorRgb: '59, 130, 246',
      features: ['Spaced repetition', 'Progress tracking', 'Custom decks']
    },
    {
      id: 'notes',
      title: 'Smart Notes',
      description: 'AI-powered note-taking with automatic organization and summarization',
      icon: '📝',
      status: 'new',
      colorStart: '#8b5cf6',
      colorEnd: '#7c3aed',
      colorRgb: '139, 92, 246',
      features: ['Auto-summarization', 'Code snippets', 'Rich text editing']
    },
    {
      id: 'pomodoro',
      title: 'Focus Timer',
      description: 'Stay productive with customizable Pomodoro timer and focus tracking',
      icon: '⏱️',
      status: 'popular',
      colorStart: '#10b981',
      colorEnd: '#059669',
      colorRgb: '16, 185, 129',
      features: ['Pomodoro technique', 'Break reminders', 'Focus analytics']
    },
    {
      id: 'games',
      title: 'Educational Games',
      description: 'Learn while having fun with brain-training games and challenges',
      icon: '🎮',
      status: 'premium',
      colorStart: '#f59e0b',
      colorEnd: '#d97706',
      colorRgb: '245, 158, 11',
      features: ['Memory games', 'Quiz challenges', 'Cognitive training']
    }
  ];
  
  // Define educational games
  const educationalGames = [
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards with scientific concepts',
      thumbnail: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Memory+Match',
      url: 'https://example.com/games/memory-match',
      order: 1
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble words related to neuroscience to improve vocabulary',
      thumbnail: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Word+Scramble',
      url: 'https://example.com/games/word-scramble',
      order: 2
    },
    {
      id: 'math-challenge',
      title: 'Math Challenge',
      description: 'Solve mathematical problems against the clock to sharpen your skills',
      thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Math+Challenge',
      url: 'https://example.com/games/math-challenge',
      order: 3
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Test your knowledge across various scientific subjects and topics',
      thumbnail: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Quiz+Master',
      url: 'https://example.com/games/quiz-master',
      order: 4
    }
  ];
  
  // Sample flashcards data
  const flashcardsData = [
    { question: "What is the function of neurons?", answer: "Neurons are specialized cells that transmit information throughout the body in the form of electrical signals." },
    { question: "What is the prefrontal cortex responsible for?", answer: "The prefrontal cortex is responsible for executive functions including planning, decision making, and moderating social behavior." },
    { question: "What is neuroplasticity?", answer: "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life." }
  ];
  
  // Handle opening a tool
  const openTool = (toolId) => {
    setActiveToolId(toolId);
  };
  
  // Handle closing a tool
  const closeTool = () => {
    setActiveToolId(null);
  };
  
  // Handle launching a game
  const launchGame = (game) => {
    setActiveGame(game);
  };
  
  // Handle closing a game
  const closeGame = () => {
    setActiveGame(null);
  };
  
  // Flashcard state
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Notes state
  const [notes, setNotes] = useState('');
  
  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            // Play sound or notification
            alert("Time's up!");
          } else {
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timerMinutes, timerSeconds]);
  
  // Format time for display
  const formatTime = (minutes, seconds) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Tool-specific state management
  const [toolState, setToolState] = useState({
    notes: '',
    currentCard: 0,
    showAnswer: false,
    minutes: 25,
    seconds: 0,
    isTimerActive: false,
    activeGame: null
  });
  
  // Function to update specific tool state
  const updateToolState = (key, value) => {
    setToolState(prev => ({ ...prev, [key]: value }));
  };
  
  // Educational games data
  const games = [
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards with programming concepts',
      thumbnail: 'https://via.placeholder.com/300x180/0ea5e9/ffffff?text=Memory+Match',
      url: 'https://memory-match-game.netlify.app/'
    },
    {
      id: 'code-quiz',
      title: 'Code Quiz',
      description: 'Test your programming knowledge with interactive quizzes',
      thumbnail: 'https://via.placeholder.com/300x180/10b981/ffffff?text=Code+Quiz',
      url: 'https://code-quiz-app.netlify.app/'
    },
    {
      id: 'algorithm-visualizer',
      title: 'Algorithm Visualizer',
      description: 'Learn algorithms through interactive visualizations',
      thumbnail: 'https://via.placeholder.com/300x180/6366f1/ffffff?text=Algorithm+Visualizer',
      url: 'https://algorithm-visualizer-app.netlify.app/'
    }
  ];
  
  // Handle game launch
  const launchGame = (game) => {
    updateToolState('activeGame', game);
  };
  
  // Close game modal
  const closeGameModal = () => {
    updateToolState('activeGame', null);
  };

  const renderToolContent = (toolId) => {
    switch (toolId) {
      case 'notes':  // Changed from 'smart-notes' to match your tool ID
        return <SmartNotes />;
      case 'flashcards':
        return (
          <div className="tool-content">
            <h2>Flashcards</h2>
            <div className="flashcard-container">
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flashcard-front">
                  {flashcardsData[currentCard].question}
                </div>
                <div className="flashcard-back">
                  {flashcardsData[currentCard].answer}
                </div>
              </div>
              <div className="flashcard-controls">
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard - 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === 0}
                >
                  Previous
                </button>
                <span className="card-counter">
                  {currentCard + 1} / {flashcardsData.length}
                </span>
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard + 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === flashcardsData.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      case 'flashcards':
        return (
          <div className="tool-content">
            <h2>Flashcards</h2>
            <div className="flashcard-container">
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flashcard-front">
                  {flashcardsData[currentCard].question}
                </div>
                <div className="flashcard-back">
                  {flashcardsData[currentCard].answer}
                </div>
              </div>
              <div className="flashcard-controls">
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard - 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === 0}
                >
                  Previous
                </button>
                <span className="card-counter">
                  {currentCard + 1} / {flashcardsData.length}
                </span>
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard + 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === flashcardsData.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      case 'study-timer':
        return (
          <div className="tool-content">
            <h2>Study Timer</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'study-groups':
        return (
          <div className="tool-content">
            <h2>Study Groups</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'discussion-forum':
        return (
          <div className="tool-content">
            <h2>Discussion Forum</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'bookmarks':
        return (
          <div className="tool-content">
            <h2>Bookmarks</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'educational-games':
        return (
          <div className="tool-content">
            <h2>Educational Games</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <motion.div 
      className="tool-view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ '--tool-color': tool.color }}
    >
      <div className="tool-view-header" style={{ backgroundColor: tool.color }}>
        <div className="tool-view-title">
          <span className="tool-view-icon">{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <button className="close-tool-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="tool-view-body">
        {renderToolContent()}
      </div>
    </motion.div>
  );
};

const StudyTools = () => {
  const [activeToolId, setActiveToolId] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  
  // Define study tools
  const studyTools = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Create and study with digital flashcards to improve memory retention',
      icon: '🗃️',
      status: 'popular',
      colorStart: '#3b82f6',
      colorEnd: '#2563eb',
      colorRgb: '59, 130, 246',
      features: ['Spaced repetition', 'Progress tracking', 'Custom decks']
    },
    {
      id: 'notes',
      title: 'Smart Notes',
      description: 'AI-powered note-taking with automatic organization and summarization',
      icon: '📝',
      status: 'new',
      colorStart: '#8b5cf6',
      colorEnd: '#7c3aed',
      colorRgb: '139, 92, 246',
      features: ['Auto-summarization', 'Code snippets', 'Rich text editing']
    },
    {
      id: 'pomodoro',
      title: 'Focus Timer',
      description: 'Stay productive with customizable Pomodoro timer and focus tracking',
      icon: '⏱️',
      status: 'popular',
      colorStart: '#10b981',
      colorEnd: '#059669',
      colorRgb: '16, 185, 129',
      features: ['Pomodoro technique', 'Break reminders', 'Focus analytics']
    },
    {
      id: 'games',
      title: 'Educational Games',
      description: 'Learn while having fun with brain-training games and challenges',
      icon: '🎮',
      status: 'premium',
      colorStart: '#f59e0b',
      colorEnd: '#d97706',
      colorRgb: '245, 158, 11',
      features: ['Memory games', 'Quiz challenges', 'Cognitive training']
    }
  ];
  
  // Define educational games
  const educationalGames = [
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards with scientific concepts',
      thumbnail: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Memory+Match',
      url: 'https://example.com/games/memory-match',
      order: 1
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble words related to neuroscience to improve vocabulary',
      thumbnail: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Word+Scramble',
      url: 'https://example.com/games/word-scramble',
      order: 2
    },
    {
      id: 'math-challenge',
      title: 'Math Challenge',
      description: 'Solve mathematical problems against the clock to sharpen your skills',
      thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Math+Challenge',
      url: 'https://example.com/games/math-challenge',
      order: 3
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Test your knowledge across various scientific subjects and topics',
      thumbnail: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Quiz+Master',
      url: 'https://example.com/games/quiz-master',
      order: 4
    }
  ];
  
  // Sample flashcards data
  const flashcardsData = [
    { question: "What is the function of neurons?", answer: "Neurons are specialized cells that transmit information throughout the body in the form of electrical signals." },
    { question: "What is the prefrontal cortex responsible for?", answer: "The prefrontal cortex is responsible for executive functions including planning, decision making, and moderating social behavior." },
    { question: "What is neuroplasticity?", answer: "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life." }
  ];
  
  // Handle opening a tool
  const openTool = (toolId) => {
    setActiveToolId(toolId);
  };
  
  // Handle closing a tool
  const closeTool = () => {
    setActiveToolId(null);
  };
  
  // Handle launching a game
  const launchGame = (game) => {
    setActiveGame(game);
  };
  
  // Handle closing a game
  const closeGame = () => {
    setActiveGame(null);
  };
  
  // Flashcard state
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Notes state
  const [notes, setNotes] = useState('');
  
  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            // Play sound or notification
            alert("Time's up!");
          } else {
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timerMinutes, timerSeconds]);
  
  // Format time for display
  const formatTime = (minutes, seconds) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Tool-specific state management
  const [toolState, setToolState] = useState({
    notes: '',
    currentCard: 0,
    showAnswer: false,
    minutes: 25,
    seconds: 0,
    isTimerActive: false,
    activeGame: null
  });
  
  // Function to update specific tool state
  const updateToolState = (key, value) => {
    setToolState(prev => ({ ...prev, [key]: value }));
  };
  
  // Educational games data
  const games = [
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards with programming concepts',
      thumbnail: 'https://via.placeholder.com/300x180/0ea5e9/ffffff?text=Memory+Match',
      url: 'https://memory-match-game.netlify.app/'
    },
    {
      id: 'code-quiz',
      title: 'Code Quiz',
      description: 'Test your programming knowledge with interactive quizzes',
      thumbnail: 'https://via.placeholder.com/300x180/10b981/ffffff?text=Code+Quiz',
      url: 'https://code-quiz-app.netlify.app/'
    },
    {
      id: 'algorithm-visualizer',
      title: 'Algorithm Visualizer',
      description: 'Learn algorithms through interactive visualizations',
      thumbnail: 'https://via.placeholder.com/300x180/6366f1/ffffff?text=Algorithm+Visualizer',
      url: 'https://algorithm-visualizer-app.netlify.app/'
    }
  ];
  
  // Handle game launch
  const launchGame = (game) => {
    updateToolState('activeGame', game);
  };
  
  // Close game modal
  const closeGameModal = () => {
    updateToolState('activeGame', null);
  };

  const renderToolContent = (toolId) => {
    switch (toolId) {
      case 'notes':  // Changed from 'smart-notes' to match your tool ID
        return <SmartNotes />;
      case 'flashcards':
        return (
          <div className="tool-content">
            <h2>Flashcards</h2>
            <div className="flashcard-container">
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flashcard-front">
                  {flashcardsData[currentCard].question}
                </div>
                <div className="flashcard-back">
                  {flashcardsData[currentCard].answer}
                </div>
              </div>
              <div className="flashcard-controls">
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard - 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === 0}
                >
                  Previous
                </button>
                <span className="card-counter">
                  {currentCard + 1} / {flashcardsData.length}
                </span>
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard + 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === flashcardsData.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      case 'flashcards':
        return (
          <div className="tool-content">
            <h2>Flashcards</h2>
            <div className="flashcard-container">
              <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="flashcard-front">
                  {flashcardsData[currentCard].question}
                </div>
                <div className="flashcard-back">
                  {flashcardsData[currentCard].answer}
                </div>
              </div>
              <div className="flashcard-controls">
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard - 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === 0}
                >
                  Previous
                </button>
                <span className="card-counter">
                  {currentCard + 1} / {flashcardsData.length}
                </span>
                <button 
                  onClick={() => {
                    setCurrentCard(currentCard + 1);
                    setIsFlipped(false);
                  }}
                  disabled={currentCard === flashcardsData.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      case 'study-timer':
        return (
          <div className="tool-content">
            <h2>Study Timer</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'study-groups':
        return (
          <div className="tool-content">
            <h2>Study Groups</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'discussion-forum':
        return (
          <div className="tool-content">
            <h2>Discussion Forum</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'bookmarks':
        return (
          <div className="tool-content">
            <h2>Bookmarks</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
      case 'educational-games':
        return (
          <div className="tool-content">
            <h2>Educational Games</h2>
            <p className="tool-description">
              Enhance your learning through interactive educational games designed to reinforce programming concepts.
            </p>
            <div className="games-container">
              {games.map((game, index) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  style={{ '--animation-order': index }}
                >
                  <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                    <button 
                      className="continue-playing-btn"
                      onClick={() => launchGame(game)}
                    >
                      Continue Playing
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Game Modal */}
            <div className={`game-modal ${toolState.activeGame ? 'active' : ''}`}>
              <div className="game-modal-content">
                <div className="game-modal-header">
                  <div className="game-modal-title">
                    {toolState.activeGame?.title}
                  </div>
                  <button className="game-modal-close" onClick={closeGameModal}>
                    &times;
                  </button>
                </div>
                <div className="game-modal-body">
                  {toolState.activeGame && (
                    <iframe 
                      src={toolState.activeGame.url} 
                      title={toolState.activeGame.title}
                      className="game-iframe"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <motion.div 
      className="tool-view-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ '--tool-color': tool.color }}
    >
      <div className="tool-view-header" style={{ backgroundColor: tool.color }}>
        <div className="tool-view-title">
          <span className="tool-view-icon">{tool.icon}</span>
          <h2>{tool.title}</h2>
        </div>
        <button className="close-tool-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="tool-view-body">
        {renderToolContent()}
      </div>
    </motion.div>
  );
};