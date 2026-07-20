import React from 'react';
import { Send, Sparkles } from 'lucide-react';
import './ChatEntry.css';

const ChatEntry = () => {
  const chips = [
    "Revenue", "Marketing", "App Health", "Growth", "User Retention", "Crash Analysis"
  ];

  return (
    <section className="chat-entry-section">
      <div className="chat-composer glass-panel">
        <div className="composer-inner">
          <Sparkles size={20} className="composer-icon" />
          <input 
            type="text" 
            className="composer-input" 
            placeholder="Ask Maya anything... What would you like to review today?" 
          />
          <button className="composer-send">
            <Send size={18} />
          </button>
        </div>
      </div>
      
      <div className="suggested-chips">
        {chips.map(chip => (
          <button key={chip} className="chip glass-panel">
            {chip}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ChatEntry;
