import React, { useState } from 'react';
import './Learning.css';
import CoursePlayer from './CoursePlayer';

const Learning = () => {
  const [selectedPath, setSelectedPath] = useState('webDev');
  const [activeCourse, setActiveCourse] = useState(null);

  const handleStartCourse = (course) => {
    setActiveCourse(course);
  };

  const learningPaths = [
    {
      id: 'webDev',
      name: 'Web Development',
      icon: '💻',
      courses: [
        {
          title: 'Frontend Development',
          level: 'beginner',
          duration: '12 weeks',
          progress: 60,
        },
        {
          title: 'Backend Development',
          level: 'intermediate',
          duration: '10 weeks',
          progress: 30,
        }
      ]
    },
    {
      id: 'dataStructures',
      name: 'Data Structures',
      icon: '🔍',
      courses: [
        {
          title: 'Basic Data Structures',
          level: 'beginner',
          duration: '8 weeks',
          progress: 0,
        },
        {
          title: 'Advanced Algorithms',
          level: 'expert',
          duration: '10 weeks',
          progress: 0,
        }
      ]
    },
    {
      id: 'cloudComputing',
      name: 'Cloud Computing',
      icon: '☁️',
      courses: [
        {
          title: 'AWS Fundamentals',
          level: 'beginner',
          duration: '6 weeks',
          progress: 0,
        },
        {
          title: 'Cloud Architecture',
          level: 'expert',
          duration: '8 weeks',
          progress: 0,
        }
      ]
    },
    {
      id: 'cyberSecurity',
      name: 'Cyber Security',
      icon: '🔒',
      courses: [
        {
          title: 'Security Basics',
          level: 'beginner',
          duration: '8 weeks',
          progress: 0,
        },
        {
          title: 'Advanced Security',
          level: 'expert',
          duration: '12 weeks',
          progress: 0,
        }
      ]
    }
  ];

  return (
    <div className="learning-container">
      <h1 className="learning-title">Learning Paths</h1>
      
      <div className="path-navigation">
        {learningPaths.map(path => (
          <div
            key={path.id}
            className={`path-tab ${selectedPath === path.id ? 'active' : ''}`}
            onClick={() => setSelectedPath(path.id)}
          >
            <span className="path-icon">{path.icon}</span>
            <span className="path-name">{path.name}</span>
          </div>
        ))}
      </div>

      <div className="courses-grid">
        {learningPaths
          .find(path => path.id === selectedPath)
          ?.courses.map((course, index) => (
            <div key={index} className={`course-card ${selectedPath}`}>
              <div className="course-header">
                <h2>{course.title}</h2>
                <span className={`level-badge ${course.level}`}>
                  {course.level}
                </span>
              </div>
              
              <p className="course-description">
                Master the fundamentals and advanced concepts of {course.title.toLowerCase()}.
              </p>
              
              <div className="course-meta">
                <span className="meta-item">
                  Duration: {course.duration}
                </span>
                <span className="meta-item">
                  Modules: {course.level === 'beginner' ? '6' : '8'}
                </span>
              </div>

              <div className="progress-section">
                <div className="progress-label">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className={`progress-bar ${selectedPath}`}>
                  <div 
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <button 
                className="continue-learning" 
                onClick={() => handleStartCourse(course)}
              >
                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </button>
            </div>
          ))}
      </div>

      {activeCourse && (
        <CoursePlayer 
          course={activeCourse} 
          onClose={() => setActiveCourse(null)}
        />
      )}
    </div>
  );
};

export default Learning;