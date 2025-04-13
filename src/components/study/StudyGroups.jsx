import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './StudyGroups.css';

const StudyGroups = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'AI Study Group', members: 15, topic: 'Artificial Intelligence' },
    { id: 2, name: 'ML Discussion', members: 8, topic: 'Machine Learning' },
    { id: 3, name: 'Neural Networks', members: 12, topic: 'Deep Learning' }
  ]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTopic, setNewGroupTopic] = useState('');

  const createGroup = () => {
    if (newGroupName && newGroupTopic) {
      setGroups([...groups, {
        id: Date.now(),
        name: newGroupName,
        members: 1,
        topic: newGroupTopic
      }]);
      setNewGroupName('');
      setNewGroupTopic('');
    }
  };

  return (
    <motion.div 
      className="study-groups-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Study Groups</h2>
      
      <div className="groups-grid">
        {groups.map(group => (
          <motion.div 
            key={group.id}
            className="group-card"
            whileHover={{ scale: 1.03 }}
          >
            <h3>{group.name}</h3>
            <p className="group-topic">{group.topic}</p>
            <p className="group-members">{group.members} members</p>
            <button className="join-button">Join Group</button>
          </motion.div>
        ))}
      </div>

      <div className="create-group-section">
        <h3>Create New Group</h3>
        <input
          type="text"
          placeholder="Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Study Topic"
          value={newGroupTopic}
          onChange={(e) => setNewGroupTopic(e.target.value)}
        />
        <button onClick={createGroup}>Create Group</button>
      </div>
    </motion.div>
  );
};

export default StudyGroups;