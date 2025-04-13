import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Timer, School, FlashOn } from '@mui/icons-material';

const StudyTools = () => {
  const tools = [
    {
      title: 'Pomodoro Timer',
      description: 'Stay focused with timed study sessions and breaks',
      icon: <Timer fontSize="large" color="primary" />,
      path: '/study-tools/pomodoro'
    },
    {
      title: 'Flashcards',
      description: 'Create and study with digital flashcards',
      icon: <School fontSize="large" color="primary" />,
      path: '/study-tools/flashcards'
    },
    {
      title: 'Quick Notes',
      description: 'Take quick notes during your study sessions',
      icon: <FlashOn fontSize="large" color="primary" />,
      path: '/study-tools/notes'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Study Tools
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Enhance your learning experience with these helpful study tools designed to improve your productivity and retention.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {tools.map((tool, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
              elevation={2}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {tool.icon}
              </Box>
              <Typography variant="h6" component="h2" align="center" gutterBottom>
                {tool.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3, flexGrow: 1 }}>
                {tool.description}
              </Typography>
              <Button
                component={Link}
                to={tool.path}
                variant="contained"
                fullWidth
              >
                Open Tool
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudyTools;