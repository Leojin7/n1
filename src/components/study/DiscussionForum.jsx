import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './DiscussionForum.css';

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([
    { id: 1, title: 'Understanding Neural Networks', author: 'User1', replies: 5, content: 'Let's discuss the basics of neural networks...' },
    { id: 2, title: 'ML Algorithms Comparison', author: 'User2', replies: 3, content: 'What are the pros and cons of different ML algorithms?' }
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const createPost = () => {
    if (newPost.title && newPost.content) {
      setDiscussions([{
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        author: 'You',
        replies: 0
      }, ...discussions]);
      setNewPost({ title: '', content: '' });
    }
  };

  return (
    <motion.div 
      className="discussion-forum-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Discussion Forum</h2>

      <div className="create-post-section">
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
        <button onClick={createPost}>Create Post</button>
      </div>

      <div className="discussions-list">
        {discussions.map(discussion => (
          <motion.div 
            key={discussion.id}
            className="discussion-card"
            whileHover={{ scale: 1.02 }}
          >
            <h3>{discussion.title}</h3>
            <p className="discussion-content">{discussion.content}</p>
            <div className="discussion-meta">
              <span>By {discussion.author}</span>
              <span>{discussion.replies} replies</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DiscussionForum;