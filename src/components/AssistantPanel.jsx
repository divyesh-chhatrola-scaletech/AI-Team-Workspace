import React, { useState, useEffect } from 'react';
import './AssistantPanel.css';
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

const EMPLOYEES = [
  {
    id: 'maya',
    name: 'Maya',
    role: 'Personal Assistant AI',
    description: 'Tasks, reminders, planning',
    image: '/assets/maya.png',
    dotClass: 'default',
    alertText: '3 items require your attention today',
    statuses: [
      "Analyzing campaigns",
      "Reviewing reports",
      "Preparing tomorrow's brief",
      "Monitoring portfolio performance"
    ]
  },
  {
    id: 'slawo',
    name: 'Slawo',
    role: 'Marketing Manager AI',
    description: 'Campaigns, acquisition, growth strategy',
    image: '/assets/slawo.png',
    dotClass: 'default',
    alertText: '1 campaign struggling',
    statuses: [
      "Reviewing campaign performance",
      "Monitoring acquisition efficiency",
      "Analyzing install trends",
      "Checking CPI performance"
    ]
  },
  {
    id: 'mishil',
    name: 'Mishil',
    role: 'Revenue Manager AI',
    description: 'Revenue optimization, subscriptions, monetization',
    image: '/assets/mishil.png',
    dotClass: 'info',
    alertText: 'Two campaigns are losing money',
    statuses: [
      "Reviewing revenue performance",
      "Analyzing monetization metrics",
      "Monitoring ROAS",
      "Preparing revenue insights"
    ]
  },
  {
    id: 'shivani',
    name: 'Shivani',
    role: 'Product Manager AI',
    description: 'Features, roadmap, product decisions',
    image: '/assets/shivani.png',
    dotClass: 'critical',
    alertText: 'Retention drop alert',
    statuses: [
      "Monitoring app health",
      "Reviewing retention trends",
      "Analyzing crash reports",
      "Checking product performance"
    ]
  }
];

const AssistantPanel = ({ activeEmployee, setActiveEmployee }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Status rotation for active employee (mainly Maya)
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % 4);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="assistant-panel glass-panel">
      <div className="assistant-header">
        <h2 className="panel-title">AI Team Workspace</h2>
      </div>

      <div className="team-roster-vertical">
        {EMPLOYEES.map((emp) => {
          const isActive = activeEmployee === emp.id;
          
          return (
            <div 
              key={emp.id} 
              className={`team-card glass-card ${isActive ? 'active-card' : ''}`}
              onClick={() => setActiveEmployee(emp.id)}
            >
              {isActive ? (
                <div className="active-layout-container">
                  <div className="active-header-content">
                    <h3 className={`active-name gradient-${emp.id}`}>{emp.name}</h3>
                    <span className="active-role">{emp.role}</span>
                  </div>

                  <div className="active-centerpiece">
                    <div className="active-avatar-wrap">
                      <div className="active-halo"></div>
                      <img src={emp.image} alt={emp.name} className="active-avatar-img" />
                    </div>
                  </div>

                  <div className="active-bottom-content">
                    <div className={`expanded-status-pill gradient-border-${emp.id}`}>
                      <div className="status-dot-pulse"></div>
                      <span className={`status-text ${fade ? 'fade-in' : 'fade-out'}`}>
                        {emp.statuses[statusIndex % emp.statuses.length]}
                      </span>
                    </div>

                    <div className="active-alert-badge">
                      <AlertTriangle size={14} className="active-alert-icon" />
                      <span>{emp.alertText}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="team-card-header">
                  <div className="team-photo-wrap">
                    <img src={emp.image} alt={emp.name} />
                  </div>
                  <div className="team-info">
                    <h4>{emp.name}</h4>
                    <span className="team-role">{emp.role}</span>
                    <span className="team-status-preview">{emp.description}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssistantPanel;
