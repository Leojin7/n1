import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Slider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  CircularProgress
} from '@mui/material';
import { PlayArrow, Pause, Refresh, Settings } from '@mui/icons-material';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings
  const [pomodoroLength, setPomodoroLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play sound or notification
      const audio = new Audio('/notification.mp3');
      audio.play();
      
      // Auto switch to next mode
      if (mode === 'pomodoro') {
        setMode('shortBreak');
        setTimeLeft(shortBreakLength * 60);
      } else if (mode === 'shortBreak') {
        setMode('pomodoro');
        setTimeLeft(pomodoroLength * 60);
      }
      
      setIsRunning(false);
    }
    
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, pomodoroLength, shortBreakLength, longBreakLength]);
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'pomodoro') {
      setTimeLeft(pomodoroLength * 60);
    } else if (mode === 'shortBreak') {
      setTimeLeft(shortBreakLength * 60);
    } else {
      setTimeLeft(longBreakLength * 60);
    }
  };
  
  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    
    if (newMode === 'pomodoro') {
      setTimeLeft(pomodoroLength * 60);
    } else if (newMode === 'shortBreak') {
      setTimeLeft(shortBreakLength * 60);
    } else {
      setTimeLeft(longBreakLength * 60);
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = () => {
    let total;
    if (mode === 'pomodoro') {
      total = pomodoroLength * 60;
    } else if (mode === 'shortBreak') {
      total = shortBreakLength * 60;
    } else {
      total = longBreakLength * 60;
    }
    
    return (1 - timeLeft / total) * 100;
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Pomodoro Timer
      </Typography>
      
      <Paper sx={{ p: 4, borderRadius: 2, maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button 
            variant={mode === 'pomodoro' ? 'contained' : 'outlined'} 
            onClick={() => changeMode('pomodoro')}
            sx={{ mx: 1 }}
          >
            Pomodoro
          </Button>
          <Button 
            variant={mode === 'shortBreak' ? 'contained' : 'outlined'} 
            onClick={() => changeMode('shortBreak')}
            sx={{ mx: 1 }}
          >
            Short Break
          </Button>
          <Button 
            variant={mode === 'longBreak' ? 'contained' : 'outlined'} 
            onClick={() => changeMode('longBreak')}
            sx={{ mx: 1 }}
          >
            Long Break
          </Button>
        </Box>
        
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5 }}>
          <CircularProgress 
            variant="determinate" 
            value={progress()} 
            size={200} 
            thickness={2}
            sx={{ position: 'absolute', color: 'primary.light' }}
          />
          <Typography variant="h1" component="div" sx={{ fontWeight: 'bold' }}>
            {formatTime(timeLeft)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large" 
            startIcon={isRunning ? <Pause /> : <PlayArrow />}
            onClick={toggleTimer}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            startIcon={<Refresh />}
            onClick={resetTimer}
          >
            Reset
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            startIcon={<Settings />}
            onClick={() => setShowSettings(!showSettings)}
          >
            Settings
          </Button>
        </Box>
        
        {showSettings && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Timer Settings
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography id="pomodoro-slider" gutterBottom>
                Pomodoro Length: {pomodoroLength} minutes
              </Typography>
              <Slider
                value={pomodoroLength}
                onChange={(e, newValue) => setPomodoroLength(newValue)}
                aria-labelledby="pomodoro-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={5}
                max={60}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography id="short-break-slider" gutterBottom>
                Short Break Length: {shortBreakLength} minutes
              </Typography>
              <Slider
                value={shortBreakLength}
                onChange={(e, newValue) => setShortBreakLength(newValue)}
                aria-labelledby="short-break-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={15}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography id="long-break-slider" gutterBottom>
                Long Break Length: {longBreakLength} minutes
              </Typography>
              <Slider
                value={longBreakLength}
                onChange={(e, newValue) => setLongBreakLength(newValue)}
                aria-labelledby="long-break-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={5}
                max={30}
              />
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PomodoroTimer;