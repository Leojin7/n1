import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Flashcards.css';

const Flashcards = () => {
  const [cards] = useState([
    { id: 1, question: "What is Neural Network?", answer: "A computing system inspired by biological neural networks that can learn from examples.", category: "AI" },
    { id: 2, question: "What is Machine Learning?", answer: "A subset of AI that enables systems to learn and improve from experience without explicit programming.", category: "AI" },
    { id: 3, question: "What is Deep Learning?", answer: "A subset of machine learning based on artificial neural networks with multiple layers.", category: "AI" }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      <div className="card-count">
        {currentIndex + 1} / {cards.length}
      </div>
      
      <div className="card-stage">
        <motion.button 
          className="nav-btn prev"
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>

        <div className="card" onClick={handleFlip}>
          <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
            <div className="card-face front">
              <h2>{cards[currentIndex].question}</h2>
              <span className="flip-hint">Click to reveal answer</span>
            </div>
            <div className="card-face back">
              <p>{cards[currentIndex].answer}</p>
              <span className="category">{cards[currentIndex].category}</span>
            </div>
          </div>
        </div>

        <motion.button 
          className="nav-btn next"
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
      </div>

      <div className="progress-dots">
        {cards.map((_, idx) => (
          <div 
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setIsFlipped(false);
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Flashcards;