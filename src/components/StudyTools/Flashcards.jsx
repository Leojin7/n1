import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  TextField, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Add, 
  Delete, 
  Edit, 
  FlipToBack, 
  ArrowBack, 
  ArrowForward,
  MoreVert,
  School
} from '@mui/icons-material';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [decks, setDecks] = useState([]);
  const [openDeckDialog, setOpenDeckDialog] = useState(false);
  const [openCardDialog, setOpenCardDialog] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [studyMode, setStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDecks = localStorage.getItem('flashcard-decks');
    if (savedDecks) {
      setDecks(JSON.parse(savedDecks));
    } else {
      // Create a sample deck if none exists
      const sampleDeck = {
        id: Date.now(),
        name: 'Sample Deck',
        cards: [
          { id: 1, front: 'What is React?', back: 'A JavaScript library for building user interfaces' },
          { id: 2, front: 'What is JSX?', back: 'A syntax extension for JavaScript that looks similar to HTML' }
        ]
      };
      setDecks([sampleDeck]);
      localStorage.setItem('flashcard-decks', JSON.stringify([sampleDeck]));
    }
  }, []);
  
  // Save decks to localStorage whenever they change
  useEffect(() => {
    if (decks.length > 0) {
      localStorage.setItem('flashcard-decks', JSON.stringify(decks));
    }
  }, [decks]);
  
  const handleOpenDeckMenu = (event, deckId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedDeckId(deckId);
  };
  
  const handleCloseDeckMenu = () => {
    setMenuAnchorEl(null);
    setSelectedDeckId(null);
  };
  
  const handleCreateDeck = () => {
    if (newDeckName.trim() === '') return;
    
    const newDeck = {
      id: Date.now(),
      name: newDeckName,
      cards: []
    };
    
    setDecks([...decks, newDeck]);
    setNewDeckName('');
    setOpenDeckDialog(false);
  };
  
  const handleEditDeck = () => {
    if (newDeckName.trim() === '') return;
    
    setDecks(decks.map(deck => 
      deck.id === selectedDeckId ? { ...deck, name: newDeckName } : deck
    ));
    
    setNewDeckName('');
    setOpenDeckDialog(false);
    handleCloseDeckMenu();
  };
  
  const handleDeleteDeck = () => {
    setDecks(decks.filter(deck => deck.id !== selectedDeckId));
    if (currentDeck && currentDeck.id === selectedDeckId) {
      setCurrentDeck(null);
      setFlashcards([]);
    }
    handleCloseDeckMenu();
  };
  
  const handleOpenDeckDialog = (isEdit = false) => {
    setEditMode(isEdit);
    if (isEdit && selectedDeckId) {
      const deck = decks.find(d => d.id === selectedDeckId);
      setNewDeckName(deck.name);
    } else {
      setNewDeckName('');
    }
    setOpenDeckDialog(true);
  };
  
  const handleSelectDeck = (deck) => {
    setCurrentDeck(deck);
    setFlashcards(deck.cards);
    setStudyMode(false);
  };
  
  const handleAddCard = () => {
    if (newCardFront.trim() === '' || newCardBack.trim() === '') return;
    
    if (editMode && editId !== null) {
      // Update existing card
      const updatedCards = flashcards.map(card => 
        card.id === editId ? { ...card, front: newCardFront, back: newCardBack } : card
      );
      
      setFlashcards(updatedCards);
      setDecks(decks.map(deck => 
        deck.id === currentDeck.id ? { ...deck, cards: updatedCards } : deck
      ));
    } else {
      // Add new card
      const newCard = {
        id: Date.now(),
        front: newCardFront,
        back: newCardBack
      };
      
      const updatedCards = [...flashcards, newCard];
      setFlashcards(updatedCards);
      
      setDecks(decks.map(deck => 
        deck.id === currentDeck.id ? { ...deck, cards: updatedCards } : deck
      ));
    }
    
    setNewCardFront('');
    setNewCardBack('');
    setEditMode(false);
    setEditId(null);
    setOpenCardDialog(false);
  };
  
  const handleEditCard = (card) => {
    setEditMode(true);
    setEditId(card.id);
    setNewCardFront(card.front);
    setNewCardBack(card.back);
    setOpenCardDialog(true);
  };
  
  const handleDeleteCard = (cardId) => {
    const updatedCards = flashcards.filter(card => card.id !== cardId);
    setFlashcards(updatedCards);
    
    setDecks(decks.map(deck => 
      deck.id === currentDeck.id ? { ...deck, cards: updatedCards } : deck
    ));
  };
  
  const startStudyMode = () => {
    if (flashcards.length === 0) return;
    
    setStudyMode(true);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };
  
  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      // End of deck
      setCurrentCardIndex(0);
      setShowAnswer(false);
    }
  };
  
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    } else {
      // Wrap to end of deck
      setCurrentCardIndex(flashcards.length - 1);
      setShowAnswer(false);
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Flashcards
      </Typography>
      
      {!currentDeck ? (
        // Deck selection view
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Your Flashcard Decks</Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => handleOpenDeckDialog(false)}
            >
              Create New Deck
            </Button>
          </Box>
          
          {decks.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <School sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No Flashcard Decks Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Create your first deck to start studying with flashcards.
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => handleOpenDeckDialog(false)}
              >
                Create New Deck
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {decks.map(deck => (
                <Grid item xs={12} sm={6} md={4} key={deck.id}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3
                      }
                    }}
                    onClick={() => handleSelectDeck(deck)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        {deck.name}
                      </Typography>
                      <IconButton 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeckMenu(e, deck.id);
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDeck(deck);
                      }}
                    >
                      Open Deck
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : studyMode ? (
        // Study mode view
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBack />}
              onClick={() => setStudyMode(false)}
            >
              Back to Deck
            </Button>
            <Typography variant="h6">
              {currentDeck.name} - Card {currentCardIndex + 1} of {flashcards.length}
            </Typography>
          </Box>
          
          <Paper 
            sx={{ 
              p: 4, 
              minHeight: 300, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.01)',
              }
            }}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <Typography variant="h5" gutterBottom align="center">
              {showAnswer ? 'Answer:' : 'Question:'}
            </Typography>
            <Typography variant="h4" align="center" sx={{ my: 4 }}>
              {showAnswer ? flashcards[currentCardIndex].back : flashcards[currentCardIndex].front}
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<FlipToBack />}
              onClick={(e) => {
                e.stopPropagation();
                setShowAnswer(!showAnswer);
              }}
            >
              {showAnswer ? 'Show Question' : 'Show Answer'}
            </Button>
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBack />}
              onClick={prevCard}
            >
              Previous
            </Button>
            <Button 
              variant="contained" 
              startIcon={<ArrowForward />}
              onClick={nextCard}
            >
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        // Deck view
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBack />}
              onClick={() => {
                setCurrentDeck(null);
                setFlashcards([]);
              }}
            >
              Back to Decks
            </Button>
            <Typography variant="h6">{currentDeck.name}</Typography>
            <Box>
              <Button 
                variant="contained" 
                startIcon={<School />}
                onClick={startStudyMode}
                disabled={flashcards.length === 0}
                sx={{ mr: 1 }}
              >
                Study
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Add />}
                onClick={() => {
                  setEditMode(false);
                  setNewCardFront('');
                  setNewCardBack('');
                  setOpenCardDialog(true);
                }}
              >
                Add Card
              </Button>
            </Box>
          </Box>
          
          {flashcards.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <School sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No Cards in This Deck
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Add your first card to start building your deck.
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => {
                  setEditMode(false);
                  setNewCardFront('');
                  setNewCardBack('');
                  setOpenCardDialog(true);
                }}
              >
                Add Card
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {flashcards.map(card => (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Front:
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {card.front}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Back:
                      </Typography>
                      <Typography variant="body1">
                        {card.back}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        startIcon={<Edit />}
                        onClick={() => handleEditCard(card)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="small" 
                        startIcon={<Delete />}
                        color="error"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
      
      {/* Deck Dialog */}
      <Dialog open={openDeckDialog} onClose={() => setOpenDeckDialog(false)}>
        <DialogTitle>{editMode ? 'Edit Deck' : 'Create New Deck'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Deck Name"
            fullWidth
            variant="outlined"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeckDialog(false)}>Cancel</Button>
          <Button onClick={editMode ? handleEditDeck : handleCreateDeck} variant="contained">
            {editMode ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Card Dialog */}
      <Dialog open={openCardDialog} onClose={() => setOpenCardDialog(false)}>
        <DialogTitle>{editMode ? 'Edit Card' : 'Add New Card'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Front (Question)"
            fullWidth
            variant="outlined"
            value={newCardFront}
            onChange={(e) => setNewCardFront(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Back (Answer)"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newCardBack}
            onChange={(e) => setNewCardBack(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCardDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCard} variant="contained">
            {editMode ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Deck Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseDeckMenu}
      >
        <MenuItem onClick={() => {
          handleOpenDeckDialog(true);
        }}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteDeck}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Flashcards;