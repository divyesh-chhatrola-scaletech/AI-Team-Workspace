import React, { useState, useEffect } from 'react';
import { usePlaybook } from '../context/PlaybookContext';
import { Check } from 'lucide-react';
import './PlaybookPage.css';

const PlaybookPage = () => {
  const { playbookText, updatePlaybook } = usePlaybook();
  const [localText, setLocalText] = useState(playbookText);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    setLocalText(playbookText);
  }, [playbookText]);

  const handleSave = () => {
    updatePlaybook(localText);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };

  const handleCancel = () => {
    setLocalText(playbookText);
  };

  return (
    <div className="playbook-page-container">
      <div className="playbook-page-header">
        <h1 className="playbook-page-title">Playbook</h1>
        <p className="playbook-page-subtitle">
          Define the agent's priorities, focus areas, reporting requirements, and attention conditions. 
          The agent will use these instructions together with the main prompt to guide its behavior and responses.
        </p>
      </div>

      <div className="playbook-editor-card">
        <div className="playbook-textarea-wrapper">
          <textarea
            className="playbook-textarea"
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            placeholder="Enter AI Executive operating manual here..."
          />
        </div>
        
        <div className="playbook-editor-footer">
          {showSaved && (
            <div className="playbook-save-indicator">
              <Check size={16} /> Saved to Operating System
            </div>
          )}
          <button className="playbook-btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="playbook-btn-save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaybookPage;
