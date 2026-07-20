import React from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import './ChatExperience.css';

const ChatExperience = ({ employee, onBack }) => {
  return (
    <div className="chat-experience">
      <div className="chat-area">
        <header className="chat-header glass-panel">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </header>

        <div className="chat-messages">
          <div className="chat-welcome">
            <div className="welcome-avatar">
              <img src={employee.image} alt={employee.name} />
            </div>
            <h2 className="welcome-title text-gradient">How can I help you with {employee.role.toLowerCase()}?</h2>
            <p className="welcome-subtitle">
              I've prepared the latest {employee.id === 'mishil' ? 'revenue updates' : employee.id === 'shivani' ? 'health alerts' : 'reports'} for your review.
            </p>
          </div>
          
          <div className="message assistant">
            <div className="message-avatar">
              <img src={employee.image} alt={employee.name} />
            </div>
            <div className="message-bubble glass-panel">
              <p>Hello Rakesh. I have {employee.status}. Would you like me to walk you through the details?</p>
            </div>
          </div>
        </div>

        <div className="chat-input-container glass-panel">
          <input 
            type="text" 
            className="chat-input" 
            placeholder={`Message ${employee.name}...`} 
          />
          <button className="send-button">
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="assistant-panel glass-panel">
        <div className="panel-header">
          <div className="panel-photo-wrapper">
            <img src={employee.image} alt={employee.name} className="panel-photo" />
            <div className="panel-glow"></div>
          </div>
          <h3 className="panel-name">{employee.name}</h3>
          <p className="panel-role">{employee.role}</p>
        </div>

        <div className="panel-section">
          <h4 className="section-title"><Sparkles size={14} /> Current Focus</h4>
          <p className="section-content text-highlight">{employee.status}</p>
        </div>

        <div className="panel-section">
          <h4 className="section-title">Recent Updates</h4>
          <ul className="updates-list">
            <li>Reviewing Q3 performance metrics</li>
            <li>Preparing weekly executive summary</li>
            <li>Monitoring active alert thresholds</li>
          </ul>
        </div>
        
        <div className="panel-section">
          <h4 className="section-title">Quick Context</h4>
          <p className="section-content text-secondary">
            Last synced 10 minutes ago. All systems nominal. Awaiting your instruction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatExperience;
