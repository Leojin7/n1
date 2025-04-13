import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  IconButton,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  Refresh, 
  Settings,
  Add,
  Delete,
  Check,
  VolumeUp,
  VolumeOff
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

const PomodoroTimerPage = () => {
  const theme = useTheme();
  
  // Timer states
  const [mode, setMode] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    volume: 80
  });
  const [showSettings, setShowSettings] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [muted, setMuted] = useState(false);
  
  // Tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete math assignment', completed: false },
    { id: 2, text: 'Read chapter 5 of textbook', completed: false },
    { id: 3, text: 'Review lecture notes', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle timer tick
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      if (mode === 'focus') {
        const newCompleted = completedPomodoros + 1;
        setCompletedPomodoros(newCompleted);
        
        // Play sound
        if (!muted) {
          const audio = new Audio('/notification.mp3');
          audio.volume = settings.volume / 100;
          audio.play();
        }
        
        // Check if it's time for a long break
        if (newCompleted % settings.longBreakInterval === 0) {
          setMode('longBreak');
          setTimeLeft(settings.longBreakTime * 60);
        } else {
          setMode('shortBreak');
          setTimeLeft(settings.shortBreakTime * 60);
        }
        
        // Auto start break if enabled
        setIsRunning(settings.autoStartBreaks);
      } else {
        // Break completed
        setMode('focus');
        setTimeLeft(settings.focusTime * 60);
        
        // Auto start next pomodoro if enabled
        setIsRunning(settings.autoStartPomodoros);
        
        // Play sound
        if (!muted) {
          const audio = new Audio('/notification.mp3');
          audio.volume = settings.volume / 100;
          audio.play();
        }
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, completedPomodoros, settings, muted]);
  
  // Handle mode change
  const handleModeChange = (newMode) => {
    setMode(newMode);
    
    if (newMode === 'focus') {
      setTimeLeft(settings.focusTime * 60);
    } else if (newMode === 'shortBreak') {
      setTimeLeft(settings.shortBreakTime * 60);
    } else {
      setTimeLeft(settings.longBreakTime * 60);
    }
    
    setIsRunning(false);
  };
  
  // Handle settings change
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    // Update timer if the current mode's time was changed
    if (setting === 'focusTime' && mode === 'focus') {
      setTimeLeft(value * 60);
    } else if (setting === 'shortBreakTime' && mode === 'shortBreak') {
      setTimeLeft(value * 60);
    } else if (setting === 'longBreakTime' && mode === 'longBreak') {
      setTimeLeft(value * 60);
    }
  };
  
  // Handle task operations
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false }
      ]);
      setNewTask('');
    }
  };
  
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box sx={{ 
      bgcolor: '#0f172a', 
      color: 'white',
      minHeight: '100vh',
      pt: 2,
      pb: 8
    }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              Pomodoro Timer
            </Typography>
          </motion.div>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Timer Section */}
            <motion.div variants={itemVariants} style={{ flex: 1 }}>
              <MotionPaper 
                sx={{ 
                  p: 4, 
                  bgcolor: 'rgba(31, 41, 55, 0.7)', 
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  borderRadius: 3,
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                  mb: 3
                }}
              >
                {/* Mode Selector */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Button 
                    variant={mode === 'focus' ? 'contained' : 'outlined'}
                    onClick={() => handleModeChange('focus')}
                    sx={{ 
                      mr: 1,
                      bgcolor: mode === 'focus' ? '#6366f1' : 'transparent',
                      borderColor: '#6366f1',
                      color: mode === 'focus' ? 'white' : '#6366f1',
                      '&:hover': {
                        bgcolor: mode === 'focus' ? '#4f46e5' : 'rgba(99, 102, 241, 0.1)'
                      }
                    }}
                  >
                    Focus
                  </Button>
                  <Button 
                    variant={mode === 'shortBreak' ? 'contained' : 'outlined'}
                    onClick={() => handleModeChange('shortBreak')}
                    sx={{ 
                      mr: 1,
                      bgcolor: mode === 'shortBreak' ? '#10b981' : 'transparent',
                      borderColor: '#10b981',
                      color: mode === 'shortBreak' ? 'white' : '#10b981',
                      '&:hover': {
                        bgcolor: mode === 'shortBreak' ? '#059669' : 'rgba(16, 185, 129, 0.1)'
                      }
                    }}
                  >
                    Short Break
                  </Button>
                  <Button 
                    variant={mode === 'longBreak' ? 'contained' : 'outlined'}
                    onClick={() => handleModeChange('longBreak')}
                    sx={{ 
                      bgcolor: mode === 'longBreak' ? '#ec4899' : 'transparent',
                      borderColor: '#ec4899',
                      color: mode === 'longBreak' ? 'white' : '#ec4899',
                      '&:hover': {
                        bgcolor: mode === 'longBreak' ? '#db2777' : 'rgba(236, 72, 153, 0.1)'
                      }
                    }}
                  >
                    Long Break
                  </Button>
                </Box>
                
                {/* Timer Display */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    flexDirection: 'column',
                    mb: 4
                  }}
                >
                  <Typography 
                    variant="h1" 
                    component="div" 
                    sx={{ 
                      fontWeight: 'bold', 
                      fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                      fontFamily: 'monospace',
                      color: mode === 'focus' ? '#6366f1' : mode === 'shortBreak' ? '#10b981' : '#ec4899'
                    }}
                  >
                    {formatTime(timeLeft)}
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.7 }}>
                    {mode === 'focus' 
                      ? 'Focus on your task' 
                      : mode === 'shortBreak' 
                        ? 'Take a short break' 
                        : 'Take a long break'}
                  </Typography>
                </Box>
                
                {/* Timer Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                  <IconButton 
                    onClick={() => setIsRunning(!isRunning)}
                    sx={{ 
                      bgcolor: mode === 'focus' ? 'rgba(99, 102, 241, 0.2)' : 
                              mode === 'shortBreak' ? 'rgba(16, 185, 129, 0.2)' : 
                              'rgba(236, 72, 153, 0.2)',
                      color: mode === 'focus' ? '#6366f1' : 
                              mode === 'shortBreak' ? '#10b981' : 
                              '#ec4899',
                      p: 2,
                      '&:hover': {
                        bgcolor: mode === 'focus' ? 'rgba(99, 102, 241, 0.3)' : 
                                mode === 'shortBreak' ? 'rgba(16, 185, 129, 0.3)' : 
                                'rgba(236, 72, 153, 0.3)'
                      }
                    }}
                  >
                    {isRunning ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                  </IconButton>
                  
                  <IconButton 
                    onClick={() => {
                      if (mode === 'focus') {
                        setTimeLeft(settings.focusTime * 60);
                      } else if (mode === 'shortBreak') {
                        setTimeLeft(settings.shortBreakTime * 60);
                      } else {
                        setTimeLeft(settings.longBreakTime * 60);
                      }
                      setIsRunning(false);
                    }}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  >
                    <Refresh />
                  </IconButton>
                  
                  <IconButton 
                    onClick={() => setShowSettings(!showSettings)}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  >
                    <Settings />
                  </IconButton>
                  
                  <IconButton 
                    onClick={() => setMuted(!muted)}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      p: 1.5,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  >
                    {muted ? <VolumeOff /> : <VolumeUp />}
                  </IconButton>
                </Box>
                
                {/* Pomodoro Counter */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Completed Pomodoros: {completedPomodoros}
                  </Typography>
                </Box>
                
                {/* Settings Panel */}
                {showSettings && (
                  <MotionBox 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    sx={{ 
                      mt: 3, 
                      p: 3, 
                      bgcolor: 'rgba(15, 23, 42, 0.7)', 
                      borderRadius: 2,
                      border: '1px solid rgba(99, 102, 241, 0.2)'
                    }}
                  >
                    <Typography variant="h6" gutterBottom>Timer Settings</Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography id="focus-time-slider" gutterBottom>
                        Focus Time: {settings.focusTime} minutes
                      </Typography>
                      <Slider
                        value={settings.focusTime}
                        onChange={(e, value) => handleSettingChange('focusTime', value)}
                        aria-labelledby="focus-time-slider"
                        min={5}
                        max={60}
                        step={5}
                        sx={{ 
                          color: '#6366f1',
                          '& .MuiSlider-thumb': {
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: '0 0 0 8px rgba(99, 102, 241, 0.2)'
                            }
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography id="short-break-slider" gutterBottom>
                        Short Break: {settings.shortBreakTime} minutes
                      </Typography>
                      <Slider
                        value={settings.shortBreakTime}
                        onChange={(e, value) => handleSettingChange('shortBreakTime', value)}
                        aria-labelledby="short-break-slider"
                        min={1}
                        max={15}
                        step={1}
                        sx={{ 
                          color: '#10b981',
                          '& .MuiSlider-thumb': {
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: '0 0 0 8px rgba(16, 185, 129, 0.2)'
                            }
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography id="long-break-slider" gutterBottom>
                        Long Break: {settings.longBreakTime} minutes
                      </Typography>
                      <Slider
                        value={settings.longBreakTime}
                        onChange={(e, value) => handleSettingChange('longBreakTime', value)}
                        aria-labelledby="long-break-slider"
                        min={5}
                        max={30}
                        step={5}
                        sx={{ 
                          color: '#ec4899',
                          '& .MuiSlider-thumb': {
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: '0 0 0 8px rgba(236, 72, 153, 0.2)'
                            }
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography id="long-break-interval-slider" gutterBottom>
                        Long Break After: {settings.longBreakInterval} pomodoros
                      </Typography>
                      <Slider
                        value={settings.longBreakInterval}
                        onChange={(e, value) => handleSettingChange('longBreakInterval', value)}
                        aria-labelledby="long-break-interval-slider"
                        min={2}
                        max={8}
                        step={1}
                        sx={{ 
                          color: '#8b5cf6',
                          '& .MuiSlider-thumb': {
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: '0 0 0 8px rgba(139, 92, 246, 0.2)'
                            }
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography id="volume-slider" gutterBottom>
                        Notification Volume: {settings.volume}%
                      </Typography>
                      <Slider
                        value={settings.volume}
                        onChange={(e, value) => handleSettingChange('volume', value)}
                        aria-labelledby="volume-slider"
                        min={0}
                        max={100}
                        step={10}
                        sx={{ 
                          color: '#f59e0b',
                          '& .MuiSlider-thumb': {
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: '0 0 0 8px rgba(245, 158, 11, 0.2)'
                            }
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button 
                        variant={settings.autoStartBreaks ? "contained" : "outlined"}
                        onClick={() => handleSettingChange('autoStartBreaks', !settings.autoStartBreaks)}
                        size="small"
                        sx={{ 
                          bgcolor: settings.autoStartBreaks ? '#10b981' : 'transparent',
                          borderColor: '#10b981',
                          color: settings.autoStartBreaks ? 'white' : '#10b981',
                          '&:hover': {
                            bgcolor: settings.autoStartBreaks ? '#059669' : 'rgba(16, 185, 129, 0.1)'
                          }
                        }}
                      >
                        Auto-start Breaks
                      </Button>
                      
                      <Button 
                        variant={settings.autoStartPomodoros ? "contained" : "outlined"}
                        onClick={() => handleSettingChange('autoStartPomodoros', !settings.autoStartPomodoros)}
                        size="small"
                        sx={{ 
                          bgcolor: settings.autoStartPomodoros ? '#6366f1' : 'transparent',
                          borderColor: '#6366f1',
                          color: settings.autoStartPomodoros ? 'white' : '#6366f1',
                          '&:hover': {
                            bgcolor: settings.autoStartPomodoros ? '#4f46e5' : 'rgba(99, 102, 241, 0.1)'
                          }
                        }}
                      >
                        Auto-start Pomodoros
                      </Button>
                    </Box>
                  </MotionBox>
                )}
              </MotionPaper>
              
              {/* Task List */}
              <motion.div variants={itemVariants}>
                <MotionPaper 
                  sx={{ 
                    p: 4, 
                    bgcolor: 'rgba(31, 41, 55, 0.7)', 
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    borderRadius: 3,
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Tasks
                  </Typography>
                  
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Add a new task"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTask();
                        }
                      }}
                      sx={{
                        mr: 1,
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#6366f1',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                    <Button 
                      variant="contained" 
                      onClick={addTask}
                      sx={{ 
                        bgcolor: '#6366f1',
                        '&:hover': { bgcolor: '#4f46e5' }
                      }}
                    >
                      <Add />
                    </Button>
                  </Box>
                  
                  <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {tasks.map((task, index) => (
                      <React.Fragment key={task.id}>
                        {index > 0 && <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />}
                        <ListItem
                          secondaryAction={
                            <IconButton 
                              edge="end" 
                              onClick={() => deleteTask(task.id)}
                              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              <Delete />
                            </IconButton>
                          }
                          disablePadding
                        >
                          <IconButton 
                            onClick={() => toggleTaskCompletion(task.id)}
                            sx={{ 
                              color: task.completed ? '#10b981' : 'rgba(255, 255, 255, 0.5)',
                              mr: 1
                            }}
                          >
                            <Check />
                          </IconButton>
                          <ListItemText 
                            primary={task.text} 
                            sx={{ 
                              textDecoration: task.completed ? 'line-through' : 'none',
                              opacity: task.completed ? 0.5 : 1
                            }}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                    {tasks.length === 0 && (
                      <Typography variant="body2" sx={{ textAlign: 'center', py: 2, opacity: 0.7 }}>
                        No tasks yet. Add some tasks to get started.
                      </Typography>
                    )}
                  </List>
                </MotionPaper>
              </motion.div>
            </motion.div>
            
            {/* Stats and Info Section */}
            <motion.div variants={itemVariants} style={{ flex: 1 }}>
              <MotionPaper 
                sx={{ 
                  p: 4, 
                  bgcolor: 'rgba(31, 41, 55, 0.7)', 
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  borderRadius: 3,
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                  mb: 3
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Pomodoro Technique
                </Typography>
                
                <Typography variant="body2" paragraph>
                  The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
                </Typography>
                
                <Box sx={{ my: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: '#6366f1' }}>
                    How it works:
                  </Typography>
                  <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <Typography variant="body2">
                        Choose a task to work on
                      </Typography>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <Typography variant="body2">
                        Set the timer for 25 minutes (one Pomodoro)
                      </Typography>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <Typography variant="body2">
                        Work on the task until the timer rings
                      </Typography>
                    </li>
                    <li style={{ marginBottom: '0.5rem' }}>
                      <Typography variant="body2">
                        Take a short break (5 minutes)
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        After 4 Pomodoros, take a longer break (15-30 minutes)
                      </Typography>
                    </li>
                  </ol>
                </Box>
                
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#6366f1' }}>
                  Benefits:
                </Typography>
                <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Typography variant="body2">
                      Improves focus and concentration
                    </Typography>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Typography variant="body2">
                      Reduces mental fatigue
                    </Typography>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Typography variant="body2">
                      Increases productivity and accountability
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Helps manage distractions and interruptions
                    </Typography>
                  </li>
                </ul>
              </MotionPaper>
              
              <MotionPaper 
                sx={{ 
                  p: 4, 
                  bgcolor: 'rgba(31, 41, 55, 0.7)', 
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  borderRadius: 3,
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Your Stats
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#6366f1', fontWeight: 'bold' }}>
                      {completedPomodoros}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Pomodoros Today
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                      {Math.round(completedPomodoros * settings.focusTime / 60)}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Hours Focused
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#ec4899', fontWeight: 'bold' }}>
                      {tasks.filter(task => task.completed).length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Tasks Completed
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="subtitle2" gutterBottom>
                  Focus History
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 0.5, 
                    flexWrap: 'wrap',
                    mb: 2
                  }}
                >
                  {Array.from({ length: 28 }, (_, i) => (
                    <Box 
                      key={i} 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: 1,
                        bgcolor: i < completedPomodoros ? 
                          `rgba(99, 102, 241, ${0.3 + (i / completedPomodoros) * 0.7})` : 
                          'rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  ))}
                </Box>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  View Detailed Stats
                </Button>
              </MotionPaper>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PomodoroTimerPage;