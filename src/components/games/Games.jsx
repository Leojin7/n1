import React, { useState, useEffect } from 'react';
import './Games.css';
import MemoryMatch from './gameModules/MemoryMatch';
import CodePuzzle from './gameModules/CodePuzzle';
import DebugQuest from './gameModules/DebugQuest';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameProgress, setGameProgress] = useState({});

  const games = [
    {
      id: 'memory',
      title: 'Memory Match',
      icon: '🎴',
      difficulty: 'Easy',
      description: 'Test and improve your memory by matching pairs of cards',
      color: 'blue',
      component: MemoryMatch
    },
    {
      id: 'puzzle',
      title: 'Code Puzzle',
      icon: '🧩',
      difficulty: 'Medium',
      description: 'Solve programming challenges by arranging code blocks',
      color: 'purple',
      component: CodePuzzle
    },
    {
      id: 'debug',
      title: 'Debug Quest',
      icon: '🐛',
      difficulty: 'Medium',
      description: 'Find and fix bugs in code snippets',
      color: 'green',
      component: DebugQuest
    }
  ];

  useEffect(() => {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      setGameProgress(JSON.parse(savedProgress));
    }
  }, []);

  const handleGameStart = (game) => {
    setSelectedGame(game);
  };

  const handleGameExit = () => {
    setSelectedGame(null);
  };

  const updateProgress = (gameId, progress) => {
    const newProgress = { ...gameProgress, [gameId]: progress };
    setGameProgress(newProgress);
    localStorage.setItem('gameProgress', JSON.stringify(newProgress));
  };

  const scrollLeft = () => {
    const container = document.querySelector('.games-grid');
    container.scrollBy({ left: -400, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    const container = document.querySelector('.games-grid');
    container.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="games-container">
      <div className="games-header">
        <h1 className="games-title">Learning Games</h1>
        <p className="games-subtitle">
          Enhance your programming skills with interactive games and challenges
        </p>
      </div>

      {!selectedGame ? (
        <>
          <div className="scroll-indicator scroll-left" onClick={scrollLeft}>←</div>
          <div className="scroll-indicator scroll-right" onClick={scrollRight}>→</div>
          <div className="games-grid">
            {games.map((game) => (
              <div key={game.id} className={`game-card game-${game.color}`}>
                <div className="game-icon-wrapper">
                  <span className="game-icon">{game.icon}</span>
                </div>
                
                <div className="game-content">
                  <div className="game-header">
                    <h2 className="game-title">{game.title}</h2>
                    <span className={`difficulty-badge ${game.difficulty.toLowerCase()}`}>
                      {game.difficulty}
                    </span>
                  </div>
                  
                  <p className="game-description">{game.description}</p>
                  
                  <div className="game-progress">
                    <div className="progress-label">
                      <span>Progress</span>
                      <span>{gameProgress[game.id] || 0}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill progress-${game.color}`}
                        style={{ width: `${gameProgress[game.id] || 0}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    className={`continue-game continue-${game.color}`}
                    onClick={() => handleGameStart(game)}
                  >
                    {gameProgress[game.id] > 0 ? 'Continue Playing' : 'Start Game'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="active-game-container">
          <button className="back-to-games" onClick={handleGameExit}>
            ← Back to Games
          </button>
          <selectedGame.component 
            onProgress={(progress) => updateProgress(selectedGame.id, progress)}
            currentProgress={gameProgress[selectedGame.id] || 0}
          />
        </div>
      )}
    </div>
  );
};

export default Games;