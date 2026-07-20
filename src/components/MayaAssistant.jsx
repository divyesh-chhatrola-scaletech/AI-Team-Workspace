import React, { useState, useEffect } from 'react';
import './MayaAssistant.css';

const statuses = [
  "Preparing your daily brief...",
  "Reviewing campaign performance...",
  "Checking revenue reports...",
  "Analyzing app health..."
];

const MayaAssistant = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % statuses.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="maya-container">
      <div className="maya-glow-layer-1"></div>
      <div className="maya-glow-layer-2"></div>
      
      <div className="maya-avatar glass-panel">
        <img src="/assets/maya.png" alt="Maya - AI Executive Assistant" className="maya-image" />
        
        <div className="maya-live-status glass-panel">
          <div className="status-dot"></div>
          <span className={`status-text ${fade ? 'fade-in' : 'fade-out'}`}>
            {statuses[statusIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MayaAssistant;
