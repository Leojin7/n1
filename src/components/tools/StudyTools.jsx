import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SmartNotes from '../study/SmartNotes';
import Flashcards from '../study/Flashcards';
import StudyTimer from '../study/StudyTimer';
import StudyGroups from '../study/StudyGroups';
import './StudyTools.css';
import Bookmarks from '../study/Bookmarks';
import Discussion from '../study/Discussion';

const StudyTools = () => {
  const [activeToolId, setActiveToolId] = useState(null);

  const tools = [
    {
      id: 'smart-notes',
      title: 'Smart Notes',
      status: 'Popular',
      description: 'AI-powered note-taking with automatic organization and summarization.',
      features: ['Auto-summarization', 'Code snippets', 'Rich text editing'],
      icon: '📝',
      color: '#0d6efd'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      status: 'Active',
      description: 'Create and study with AI-generated flashcards that adapt to your learning style.',
      features: ['Spaced repetition', 'Progress tracking', 'AI-generated questions'],
      icon: '🎴',
      color: '#00b894'
    },
    {
      id: 'study-timer',
      title: 'Study Timer',
      status: 'Active',
      description: 'Pomodoro timer with smart breaks and focus tracking.',
      features: ['Custom intervals', 'Break suggestions', 'Focus analytics'],
      icon: '⏱️',
      color: '#6c5ce7'
    },
    {
      id: 'study-groups',
      title: 'Study Groups',
      status: 'Popular',
      description: 'Join or create study groups with fellow learners.',
      features: ['Group chat', 'Resource sharing', 'Schedule coordination'],
      icon: '👥',
      color: '#e84393'
    },
    {
      id: 'discussion',
      title: 'Discussion Forum',
      status: 'Active',
      description: 'Ask questions and participate in technical discussions.',
      features: ['Topic tags', 'Code formatting', 'Expert answers'],
      icon: '💬',
      color: '#00cec9'
    },
    {
      id: 'bookmarks',
      title: 'Bookmarks',
      status: 'New',
      description: 'Save and organize learning resources with smart categorization.',
      features: ['Auto-tagging', 'Search', 'Collections'],
      icon: '🔖',
      color: '#fdcb6e'
    }
    // LMS integration object removed
];

// In renderToolContent, remove the LMS integration case
const renderToolContent = (toolId) => {
    switch (toolId) {
      case 'smart-notes':
        return <SmartNotes />;
      case 'flashcards':
        return <Flashcards />;
      case 'study-timer':
        return <StudyTimer />;
      case 'study-groups':
        return <StudyGroups />;
      case 'bookmarks':
        return <Bookmarks />;
      case 'discussion':
        return <Discussion />;
      // LMS integration case removed
      default:
        return (
          <div className="tool-placeholder">
            <h2>Coming Soon</h2>
            <p>This tool is currently under development.</p>
          </div>
        );
    }
};

  return (
    <div className="study-tools-container">
      <motion.div 
        className="tools-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Study Tools</h1>
        <p>Enhance your learning experience with our smart study tools</p>
      </motion.div>

      <div className="tools-grid">
        {tools.map((tool, index) => (
          // In the tools.map section, update the motion.div:
          <motion.div
            key={tool.id}
            className="tool-card"
            data-tool={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ '--tool-color': tool.color }}
          >
            <div className="tool-header">
              <div className="tool-icon" style={{ background: tool.color }}>
                {tool.icon}
              </div>
              <span className={`tool-status ${tool.status.toLowerCase()}`}>
                {tool.status}
              </span>
            </div>

            <h2>{tool.title}</h2>
            <p className="tool-description">{tool.description}</p>

            <div className="feature-tags">
              {tool.features.map(feature => (
                <span 
                  key={feature} 
                  className="feature-tag"
                  style={{ background: `${tool.color}22`, color: tool.color }}
                >
                  {feature}
                </span>
              ))}
            </div>

            <motion.button
              className="open-tool-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: tool.color }}
              onClick={() => setActiveToolId(tool.id)}
            >
              Open Tool
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeToolId && (
          <motion.div
            className="tool-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="tool-modal-content">
              <motion.button
                className="close-modal-btn"
                onClick={() => setActiveToolId(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>
              {renderToolContent(activeToolId)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyTools;