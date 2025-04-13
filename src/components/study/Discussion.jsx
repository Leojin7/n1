import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaComment, FaUser, FaHeart, FaReply, FaTag } from 'react-icons/fa';
import './Discussion.css';

const Discussion = () => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'Understanding Neural Networks',
      author: 'AI_Enthusiast',
      content: 'Can someone explain backpropagation in simple terms?',
      tags: ['Neural Networks', 'Deep Learning'],
      likes: 15,
      replies: 3,
      timestamp: '2h ago'
    },
    // Add more sample discussions
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });

  const createPost = () => {
    if (newPost.title && newPost.content) {
      setDiscussions([{
        id: Date.now(),
        ...newPost,
        author: 'Current_User',
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        likes: 0,
        replies: 0,
        timestamp: 'Just now'
      }, ...discussions]);
      setNewPost({ title: '', content: '', tags: '' });
    }
  };

  return (
    <motion.div 
      className="discussion-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="discussion-header">
        <h2>Discussion Forum</h2>
        <motion.button 
          className="new-post-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('newPostForm').scrollIntoView({ behavior: 'smooth' })}
        >
          Create New Post
        </motion.button>
      </div>

      <div className="discussion-content">
        <div className="posts-section">
          {discussions.map(post => (
            <motion.div 
              key={post.id}
              className="post-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="post-header">
                <h3>{post.title}</h3>
                <div className="post-meta">
                  <span><FaUser /> {post.author}</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">
                    <FaTag /> {tag}
                  </span>
                ))}
              </div>
              <div className="post-actions">
                <button className="action-btn">
                  <FaHeart /> {post.likes}
                </button>
                <button className="action-btn">
                  <FaComment /> {post.replies}
                </button>
                <button className="action-btn">
                  <FaReply /> Reply
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div id="newPostForm" className="new-post-section">
          <h3>Create New Post</h3>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          />
          <textarea
            placeholder="Write your post..."
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={newPost.tags}
            onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
          />
          <motion.button 
            className="submit-post-btn"
            onClick={createPost}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Post Discussion
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Discussion;