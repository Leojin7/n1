import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VideoLectures.css';

const VideoLectures = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const lectures = [
    {
      id: 1,
      title: 'Data Structure and Algorithms',
      thumbnail: '/src/assets/DSAimg.png',
      videoUrl: '/VIDEO LECTURES/Algorithms and Data Structures Tutorial - Full Course for Beginners.mp4',
      duration: '45:30',
      instructor: 'Dr. Sarah Chen',
      tags: ['DSA', 'Concept'],
      views: '1,234',
      progress: 0,
      description: 'Learn the fundamentals of machine learning and AI'
    },
    {
      id: 2,
      title: 'Cloud Computing Services',
      thumbnail: '/src/assets/cloud-computing.jpg',
      videoUrl: '/VIDEO LECTURES/Cloud Computing Architecture Tutorial - Front End & Back End _ Cloud Computing _ Simplilearn.mp4',
      duration: '1:15:00',
      instructor: 'Alex Johnson',
      tags: ['Cloud', 'Services'],
      views: '892',
      progress: 65,
      description: 'Master advanced React concepts and design patterns'
    },
    {
      id: 3,
      title: 'CI/CD Pipeline',
      thumbnail: '/src/assets/cd-pipeline-tools.jpg',
      videoUrl: '/VIDEO LECTURES/DevOps CI_CD Explained in 100 Seconds.mp4',
      duration: '55:45',
      instructor: 'Michael Cloud',
      tags: ['CI', 'CD'],
      views: '567',
      progress: 30,
      description: 'Design scalable and resilient cloud solutions'
    },
    {
      id: 4,
      title: 'Advanced React Course',
      thumbnail: '/src/assets/React.jpg',
      videoUrl: '/VIDEO LECTURES/Intro to re-renders - Advanced React Course, Episode1.mp4',
      duration: '1:05:20',
      instructor: 'Emma Secure',
      tags: ['React', 'JSX'],
      views: '789',
      progress: 0,
      description: 'Learn essential cybersecurity practices'
    },
    {
      id: 5,
      title: 'Introduction to Machine Learning',
      thumbnail: '/src/assets/ML.jpg',
      videoUrl: '/VIDEO LETCURES/Machine Learning _ What Is Machine Learning_ _ Introduction To Machine Learning _ 2024 _ Simplilearn.mp4',
      duration: '1:30:00',
      instructor: 'Prof. Alan Graph',
      tags: ['AI', 'ML'],
      views: '923',
      progress: 0,
      description: 'Advanced data structures concepts'
    },
    {
      id: 6,
      title: 'Cyber Security Best Practices',
      thumbnail: '/src/assets/CYBER.jpg',
      videoUrl: '/VIDEO LECTURES/What Is Cyber Security _ How It Works_ _ Cyber Security In 7 Minutes _ Cyber Security _ Simplilearn.mp4',
      duration: '1:20:15',
      instructor: 'Dave Pipeline',
      tags: ['Cyber ', 'Security'],
      views: '456',
      progress: 0,
      description: 'Master DevOps pipeline and practices'
    }
  ];

  // Update the handleWatchVideo function to use the correct path
  const handleWatchVideo = (lecture) => {
    if (activeVideo?.id === lecture.id) {
      setActiveVideo(null);
    } else {
      const videoWithCorrectPath = {
        ...lecture,
        videoUrl: `/VIDEO LECTURES/${lecture.videoUrl.split('/').pop()}`
      };
      setActiveVideo(videoWithCorrectPath);
    }
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const filteredLectures = lectures.filter(lecture => 
    lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecture.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecture.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="video-lectures-container">
      <div className="lectures-header">
        <h1>Video Lectures</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search lectures..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="lectures-grid">
        {filteredLectures.map(lecture => (
          <motion.div 
            key={lecture.id}
            className="lecture-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="lecture-thumbnail">
              <img 
                src={lecture.thumbnail} 
                alt={lecture.title} 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="lecture-duration">{lecture.duration}</div>
            </div>
            <div className="lecture-content">
              <h3 className="lecture-title">{lecture.title}</h3>
              <p className="description">{lecture.description}</p>
              <div className="instructor">
                <div className="instructor-avatar">👤</div>
                <span>{lecture.instructor}</span>
              </div>
              <div className="tags">
                {lecture.tags.map((tag, index) => (
                  <span key={index} className="tag" style={{ 
                    background: tag.includes('AI') ? 'rgba(59, 130, 246, 0.1)' : 
                              tag.includes('Web') ? 'rgba(139, 92, 246, 0.1)' :
                              tag.includes('Cloud') ? 'rgba(16, 185, 129, 0.1)' :
                              tag.includes('Security') ? 'rgba(239, 68, 68, 0.1)' :
                              tag.includes('DSA') ? 'rgba(245, 158, 11, 0.1)' :
                              'rgba(14, 165, 233, 0.1)',
                    color: tag.includes('AI') ? '#3b82f6' : 
                          tag.includes('Web') ? '#8b5cf6' :
                          tag.includes('Cloud') ? '#10b981' :
                          tag.includes('Security') ? '#ef4444' :
                          tag.includes('DSA') ? '#f59e0b' :
                          '#0ea5e9'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              {lecture.progress > 0 ? (
                <div className="progress-section">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${lecture.progress}%` }}></div>
                  </div>
                  <button 
                    className="watch-btn continue-btn"
                    onClick={() => handleWatchVideo(lecture)}
                  >
                    {activeVideo?.id === lecture.id ? 'Hide Video' : `Continue (${lecture.progress}%)`}
                  </button>
                </div>
              ) : (
                <button 
                  className="watch-btn"
                  onClick={() => handleWatchVideo(lecture)}
                >
                  {activeVideo?.id === lecture.id ? 'Hide Video' : 'Start Watching'}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            className="video-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="video-popup-card"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="video-popup-header">
                <h3>{activeVideo.title}</h3>
                <button className="popup-close-btn" onClick={handleCloseVideo}>×</button>
              </div>
              <div className="video-popup-content">
                <video 
                  controls 
                  autoPlay
                  playsInline
                  src={activeVideo.videoUrl}
                  onError={(e) => console.error('Video error:', e)}
                />
                <div className="video-info-footer">
                  <div className="instructor-info">
                    <div className="instructor-avatar">👤</div>
                    <span>{activeVideo.instructor}</span>
                  </div>
                  <div className="video-stats">
                    <span>{activeVideo.views} views</span>
                    <span>{activeVideo.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoLectures;