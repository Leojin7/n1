import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StudyTimer.css';

const StudyTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    const audio = new Audio('/timer-complete.mp3');
    audio.play();
    setIsActive(false);
    if (mode === 'work') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('work');
      setMinutes(25);
    }
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="timer-container">
      <motion.div 
        className="timer-circle"
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
          transition: { repeat: isActive ? Infinity : 0, duration: 2 }
        }}
      >
        <h2>{mode === 'work' ? 'Work Time' : 'Break Time'}</h2>
        <div className="time-display">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </motion.div>

      <div className="timer-controls">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetTimer}
        >
          Reset
        </motion.button>
      </div>

      <div className="timer-modes">
        <button 
          className={mode === 'work' ? 'active' : ''}
          onClick={() => {
            setMode('work');
            setMinutes(25);
            setSeconds(0);
          }}
        >
          Pomodoro
        </button>
        <button 
          className={mode === 'break' ? 'active' : ''}
          onClick={() => {
            setMode('break');
            setMinutes(5);
            setSeconds(0);
          }}
        >
          Break
        </button>
      </div>
    </div>
  );
};

export default StudyTimer;