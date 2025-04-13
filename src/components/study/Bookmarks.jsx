import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFolder, FaLink, FaTags, FaSearch, FaPlus } from 'react-icons/fa';
import './Bookmarks.css';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: 'Neural Networks Guide', url: 'https://example.com/nn', tags: ['AI', 'Deep Learning'], collection: 'AI Studies' },
    { id: 2, title: 'Machine Learning Basics', url: 'https://example.com/ml', tags: ['ML', 'Basics'], collection: 'Fundamentals' },
  ]);

  const [newBookmark, setNewBookmark] = useState({ title: '', url: '', tags: '', collection: '' });
  const [activeCollection, setActiveCollection] = useState('All');

  const addBookmark = () => {
    if (newBookmark.title && newBookmark.url) {
      setBookmarks([...bookmarks, {
        id: Date.now(),
        ...newBookmark,
        tags: newBookmark.tags.split(',').map(tag => tag.trim())
      }]);
      setNewBookmark({ title: '', url: '', tags: '', collection: '' });
    }
  };

  return (
    <motion.div 
      className="bookmarks-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bookmarks-header">
        <h2>Smart Bookmarks</h2>
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search bookmarks..." />
        </div>
      </div>

      <div className="bookmarks-content">
        <div className="collections-sidebar">
          <h3>Collections</h3>
          <button className="new-collection-btn">
            <FaPlus /> New Collection
          </button>
          <div className="collections-list">
            <button 
              className={`collection-item ${activeCollection === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCollection('All')}
            >
              <FaFolder /> All Bookmarks
            </button>
            {Array.from(new Set(bookmarks.map(b => b.collection))).map(collection => (
              <button 
                key={collection}
                className={`collection-item ${activeCollection === collection ? 'active' : ''}`}
                onClick={() => setActiveCollection(collection)}
              >
                <FaFolder /> {collection}
              </button>
            ))}
          </div>
        </div>

        <div className="bookmarks-main">
          <div className="add-bookmark-section">
            <input
              type="text"
              placeholder="Title"
              value={newBookmark.title}
              onChange={(e) => setNewBookmark({...newBookmark, title: e.target.value})}
            />
            <input
              type="url"
              placeholder="URL"
              value={newBookmark.url}
              onChange={(e) => setNewBookmark({...newBookmark, url: e.target.value})}
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={newBookmark.tags}
              onChange={(e) => setNewBookmark({...newBookmark, tags: e.target.value})}
            />
            <input
              type="text"
              placeholder="Collection"
              value={newBookmark.collection}
              onChange={(e) => setNewBookmark({...newBookmark, collection: e.target.value})}
            />
            <motion.button 
              className="add-btn"
              onClick={addBookmark}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Bookmark
            </motion.button>
          </div>

          <div className="bookmarks-grid">
            {bookmarks
              .filter(b => activeCollection === 'All' || b.collection === activeCollection)
              .map(bookmark => (
                <motion.div 
                  key={bookmark.id}
                  className="bookmark-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3>{bookmark.title}</h3>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    <FaLink /> Visit Link
                  </a>
                  <div className="bookmark-tags">
                    <FaTags />
                    {bookmark.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="bookmark-collection">{bookmark.collection}</div>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Bookmarks;