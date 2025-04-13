import React from 'react';
import './CoursePlayer.css';

const CoursePlayer = ({ course, onClose }) => {
  return (
    <div className="course-player">
      <div className="player-header">
        <h2>{course.title}</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="video-player">
        <div className="video-container">
          <video controls>
            <source src={course.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="course-content-sidebar">
          <h3>Course Content</h3>
          <div className="lecture-list">
            {course.lectures?.map((lecture, index) => (
              <div key={index} className="lecture-item">
                <span className="lecture-number">{index + 1}</span>
                <span className="lecture-title">{lecture.title}</span>
                <span className="lecture-duration">{lecture.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;