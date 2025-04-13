import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  TextField, 
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Chip,
  Divider
} from '@mui/material';
import { 
  Add, 
  Delete, 
  Edit, 
  MoreVert, 
  NoteAdd,
  Search,
  Label,
  Sort
} from '@mui/icons-material';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTag, setNoteTag] = useState('');
  const [noteTags, setNoteTags] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [filterTag, setFilterTag] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('study-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Create sample notes if none exist
      const sampleNotes = [
        {
          id: 1,
          title: 'Welcome to Quick Notes',
          content: 'This is a simple note-taking app to help you organize your thoughts and study materials.',
          tags: ['welcome', 'tutorial'],
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          title: 'How to use',
          content: 'Click the "Add Note" button to create a new note. You can add tags to categorize your notes and filter them later.',
          tags: ['tutorial', 'help'],
          timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        }
      ];
      setNotes(sampleNotes);
      localStorage.setItem('study-notes', JSON.stringify(sampleNotes));
    }
  }, []);
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('study-notes', JSON.stringify(notes));
    }
  }, [notes]);
  
  // Extract all unique tags from notes
  useEffect(() => {
    const allTags = notes.reduce((tags, note) => {
      return [...tags, ...note.tags];
    }, []);
    
    const uniqueTags = [...new Set(allTags)];
    setNoteTags(uniqueTags);
  }, [notes]);
  
  const handleOpenMenu = (event, noteId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedNoteId(noteId);
  };
  
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setSelectedNoteId(null);
  };
  
  const handleAddNote = () => {
    if (noteTitle.trim() === '') return;
    
    if (editMode && editId !== null) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editId ? { 
          ...note, 
          title: noteTitle, 
          content: noteContent,
          tags: noteTags.length > 0 ? [...noteTags, ...noteTag.split(',').map(tag => tag.trim()).filter(tag => tag !== '')] : noteTag.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        } : note
      ));
    } else {
      // Add new note
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
        tags: noteTag.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        timestamp: new Date().toISOString()
      };
      
      setNotes([newNote, ...notes]);
    }
    
    setNoteTitle('');
    setNoteContent('');
    setNoteTag('');
    setEditMode(false);
    setEditId(null);
    setOpenDialog(false);
  };
  
  const handleEditNote = (note) => {
    setEditMode(true);
    setEditId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTag(note.tags.join(', '));
    setOpenDialog(true);
    handleCloseMenu();
  };
  
  const handleDeleteNote = () => {
    setNotes(notes.filter(note => note.id !== selectedNoteId));
    handleCloseMenu();
  };
  
  const handleFilterByTag = (tag) => {
    if (filterTag === tag) {
      setFilterTag(''); // Clear filter if clicking the same tag
    } else {
      setFilterTag(tag);
    }
  };
  
  const handleSort = (order) => {
    setSortOrder(order);
  };
  
  // Filter and sort notes
  const filteredNotes = notes
    .filter(note => {
      // Filter by search term
      const matchesSearch = 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by tag
      const matchesTag = filterTag === '' || note.tags.includes(filterTag);
      
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      // Sort by date
      if (sortOrder === 'newest') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
    });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Quick Notes
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search notes..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search color="action" sx={{ mr: 1 }} />
            }}
            sx={{ mr: 2, width: 250 }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Label color="action" sx={{ mr: 1 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {noteTags.map(tag => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  size="small"
                  color={filterTag === tag ? "primary" : "default"}
                  onClick={() => handleFilterByTag(tag)}
                />
              ))}
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<Sort />}
            onClick={() => handleSort(sortOrder === 'newest' ? 'oldest' : 'newest')}
            sx={{ mr: 2 }}
          >
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>
          
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => {
              setEditMode(false);
              setNoteTitle('');
              setNoteContent('');
              setNoteTag('');
              setOpenDialog(true);
            }}
          >
            Add Note
          </Button>
        </Box>
      </Box>
      
      {filteredNotes.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <NoteAdd sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Notes Found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {searchTerm || filterTag ? 'Try changing your search or filter.' : 'Create your first note to get started.'}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => {
              setEditMode(false);
              setNoteTitle('');
              setNoteContent('');
              setNoteTag('');
              setOpenDialog(true);
            }}
          >
            Add Note
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredNotes.map(note => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {note.title}
                    </Typography>
                    <IconButton 
                      size="small"
                      onClick={(e) => handleOpenMenu(e, note.id)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {formatDate(note.timestamp)}
                  </Typography>
                  
                  <Typography variant="body1" paragraph sx={{ 
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {note.content}
                  </Typography>
                  
                  {note.tags.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                      {note.tags.map(tag => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          onClick={() => handleFilterByTag(tag)}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<Edit />}
                    onClick={() => handleEditNote(note)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => {
                      setSelectedNoteId(note.id);
                      handleDeleteNote();
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Note Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{editMode ? 'Edit Note' : 'Add New Note'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            variant="outlined"
            multiline
            rows={8}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Tags (comma separated)"
            fullWidth
            variant="outlined"
            value={noteTag}
            onChange={(e) => setNoteTag(e.target.value)}
            placeholder="e.g. biology, chapter 1, important"
            helperText="Separate tags with commas"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNote} variant="contained">
            {editMode ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Note Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => {
          const note = notes.find(n => n.id === selectedNoteId);
          if (note) handleEditNote(note);
        }}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteNote}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Notes;