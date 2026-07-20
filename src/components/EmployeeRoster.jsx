import React from 'react';
import './EmployeeRoster.css';

const employees = [
  {
    id: 'maya',
    name: 'Maya',
    role: 'Personal Executive Assistant',
    liveStatus: 'Reviewing reports',
    attentionCount: '3 items waiting',
    image: '/assets/maya.png'
  },
  {
    id: 'slawo',
    name: 'Slawo',
    role: 'App Marketing Manager',
    liveStatus: 'Monitoring campaigns',
    attentionCount: '2 alerts',
    image: '/assets/slawo.png',
    alertType: 'warning'
  },
  {
    id: 'mishil',
    name: 'Mishil',
    role: 'App Revenue Manager',
    liveStatus: 'Revenue analysis complete',
    attentionCount: '1 update',
    image: '/assets/mishil.png',
    alertType: 'info'
  },
  {
    id: 'shivani',
    name: 'Shivani',
    role: 'App Product Manager',
    liveStatus: 'Monitoring app health',
    attentionCount: '4 alerts',
    image: '/assets/shivani.png',
    alertType: 'critical'
  }
];

const EmployeeRoster = ({ onSelectEmployee }) => {
  return (
    <section className="roster-section">
      <h3 className="roster-title">Your AI Team</h3>
      <div className="roster-grid">
        {employees.map(emp => (
          <div 
            key={emp.id} 
            className="team-member-card glass-panel"
            onClick={() => onSelectEmployee(emp)}
          >
            <div className="member-header">
              <div className="member-photo-wrapper">
                <img src={emp.image} alt={emp.name} className="member-photo" />
              </div>
              <div className="member-identity">
                <h4 className="member-name">{emp.name}</h4>
                <p className="member-role">{emp.role}</p>
              </div>
            </div>
            
            <div className="member-body">
              <div className="live-status-container">
                <span className="live-label">Status:</span>
                <span className="live-text">{emp.liveStatus}</span>
              </div>
            </div>
            
            <div className="member-footer">
              <span className={`attention-badge ${emp.alertType || 'default'}`}>
                {emp.attentionCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployeeRoster;
