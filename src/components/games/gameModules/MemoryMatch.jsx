import React, { useState, useEffect } from 'react';
import './MemoryMatch.css';

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const cardSymbols = [
    '🌟', '🎯', '💻', '🔧', '📚', '🎮', '🚀', '⚡',
    '🌟', '🎯', '💻', '🔧', '📚', '🎮', '🚀', '⚡'
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = cardSymbols.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setGameStarted(true);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
        setScore(score + 10);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className="memory-game-container">
      <div className="game-header">
        <h2>Memory Match</h2>
        <div className="game-stats">
          <span>Score: {score}</span>
          <button className="restart-btn" onClick={initializeGame}>
            Restart Game
          </button>
        </div>
      </div>

      <div className="memory-grid">
        {cards.map((symbol, index) => (
          <div
            key={index}
            className={`memory-card ${
              flippedCards.includes(index) || matchedPairs.includes(index) ? 'flipped' : ''
            } ${matchedPairs.includes(index) ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-back"></div>
            <div className="card-front">{symbol}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;