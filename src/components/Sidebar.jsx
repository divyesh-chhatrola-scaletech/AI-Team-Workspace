import React, { useState } from 'react';
import { Bot, Compass, Users, MonitorPlay, Database, BookOpen, PenTool, Zap, Settings } from 'lucide-react';
import './Sidebar.css';


const Sidebar = ({ activeItem, setActiveItem }) => {
  const activeRoutes = ['My Assistant', 'AI Employees', 'Playbook', 'Tools'];

  const handleItemClick = (label) => {
    if (activeRoutes.includes(label)) {
      setActiveItem(label);
    }
  };

  const navItems = [
    { icon: Bot, label: 'My Assistant' },
    { icon: Users, label: 'AI Employees' },
    { icon: Compass, label: 'Explore' },
    { icon: MonitorPlay, label: 'Studio' },
    { icon: Database, label: 'Knowledge Bases' },
    { icon: PenTool, label: 'Tools' },
    { icon: BookOpen, label: 'Playbook' },
  ];

  return (
    <nav className="nav-rail glass-panel">
      <div className="nav-logo">
        <div className="nav-brand-icon">
          <img src="/logo.png" alt="AI Lab Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <span className="logo-text">AI Lab</span>
      </div>

      <div className="nav-items-container">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          return (
            <div
              key={index}
              className={`nav-rail-item ${isActive ? 'active' : ''} ${!activeRoutes.includes(item.label) ? 'inactive-route' : ''}`}
              onClick={() => handleItemClick(item.label)}
            >
              <div className="nav-icon-wrap">
                <Icon size={22} className="nav-rail-icon" />
              </div>
              <span className="nav-label">{item.label}</span>
              {!activeRoutes.includes(item.label) && (
                <div className="coming-soon-tooltip">
                  Coming Soon
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="nav-rail-footer">
        <div className="nav-rail-item">
          <div className="nav-icon-wrap">
            <Settings size={22} className="nav-rail-icon" />
          </div>
          <span className="nav-label">Settings</span>
        </div>
        <div className="nav-profile-wrap">
          <img src="/assets/rakesh.png" alt="Rakesh" className="nav-profile-pic" />
          <span className="nav-label">Rakesh</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;