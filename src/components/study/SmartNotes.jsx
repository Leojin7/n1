import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SmartNotes.css';

const SmartNotes = () => {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  const [currentNoteTitle, setCurrentNoteTitle] = useState('Untitled Note');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'saved'

  // Load saved notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('smartNotes');
    if (storedNotes) {
      setSavedNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleNotesChange = (e) => {
    const value = e.target.value;
    setNotes(value);
    
    // Simulate AI summarization
    if (value.length > 100) {
      setTimeout(() => {
        setSummary(`AI Summary: ${value.substring(0, 100)}...`);
      }, 1000);
    } else {
      setSummary('');
    }
  };

  const handleSaveNote = () => {
    if (!notes.trim()) return;
    
    setIsSaving(true);
    
    const newNote = {
      id: Date.now(),
      title: currentNoteTitle,
      content: notes,
      summary: summary || notes.substring(0, 60) + '...',
      date: new Date().toISOString(),
      isCode: isCodeMode
    };
    
    const updatedNotes = [newNote, ...savedNotes];
    setSavedNotes(updatedNotes);
    localStorage.setItem('smartNotes', JSON.stringify(updatedNotes));
    
    setTimeout(() => {
      setIsSaving(false);
      // Reset for new note
      setNotes('');
      setSummary('');
      setCurrentNoteTitle('Untitled Note');
    }, 1000);
  };

  const loadNote = (note) => {
    setNotes(note.content);
    setSummary(note.summary);
    setCurrentNoteTitle(note.title);
    setIsCodeMode(note.isCode);
    setActiveTab('editor');
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();
    const updatedNotes = savedNotes.filter(note => note.id !== id);
    setSavedNotes(updatedNotes);
    localStorage.setItem('smartNotes', JSON.stringify(updatedNotes));
  };

  return (
    <motion.div 
      className="smart-notes-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="notes-header">
        <div className="notes-title-container">
          <h2>Smart Notes</h2>
          <input
            type="text"
            className="note-title-input"
            value={currentNoteTitle}
            onChange={(e) => setCurrentNoteTitle(e.target.value)}
            placeholder="Note title..."
          />
        </div>
        <div className="notes-controls">
          <button 
            className={`mode-toggle ${isCodeMode ? 'active' : ''}`}
            onClick={() => setIsCodeMode(!isCodeMode)}
          >
            <span className="icon">{'</>'}</span>
            {isCodeMode ? 'Text Mode' : 'Code Mode'}
          </button>
          <button 
            className="save-note-btn"
            onClick={handleSaveNote}
            disabled={!notes.trim() || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button 
          className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved Notes ({savedNotes.length})
        </button>
      </div>

      {activeTab === 'editor' ? (
        <>
          <div className="notes-editor">
            <textarea
              className={`notes-input ${isCodeMode ? 'code-mode' : ''}`}
              value={notes}
              onChange={handleNotesChange}
              placeholder={isCodeMode ? "Enter your code here..." : "Start taking notes..."}
              spellCheck={!isCodeMode}
            />
          </div>

          {summary && (
            <motion.div 
              className="notes-summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>AI Summary</h3>
              <p>{summary}</p>
            </motion.div>
          )}

          {!isCodeMode && (
            <div className="formatting-toolbar">
              <button onClick={() => document.execCommand('bold')} title="Bold">
                <strong>B</strong>
              </button>
              <button onClick={() => document.execCommand('italic')} title="Italic">
                <em>I</em>
              </button>
              <button onClick={() => document.execCommand('underline')} title="Underline">
                <u>U</u>
              </button>
              <button onClick={() => document.execCommand('insertOrderedList')} title="Numbered List">
                1.
              </button>
              <button onClick={() => document.execCommand('insertUnorderedList')} title="Bullet List">
                •
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="saved-notes">
          {savedNotes.length > 0 ? (
            <div className="notes-list">
              {savedNotes.map(note => (
                <motion.div 
                  key={note.id}
                  className="saved-note-item"
                  onClick={() => loadNote(note)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="note-header">
                    <h4>{note.title}</h4>
                    <button 
                      className="delete-note-btn"
                      onClick={(e) => deleteNote(note.id, e)}
                      title="Delete note"
                    >
                      ×
                    </button>
                  </div>
                  <p>{note.summary || note.content.substring(0, 60) + '...'}</p>
                  <div className="note-footer">
                    <span className="note-date">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                    {note.isCode && <span className="note-tag">Code</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-notes">
              <p>No saved notes yet. Create your first note!</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SmartNotes;