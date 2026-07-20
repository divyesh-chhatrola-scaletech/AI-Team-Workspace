import React, { useState, useEffect } from 'react';
import MayaAssistant from './MayaAssistant';
import './Hero.css';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const Hero = () => {
  const [showName, setShowName] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showCards, setShowCards] = useState(false);
  
  useEffect(() => {
    // Staged animation sequence
    const t1 = setTimeout(() => setShowName(true), 600);
    const t2 = setTimeout(() => setShowWave(true), 1200);
    const t3 = setTimeout(() => setShowIntro(true), 2000);
    const t4 = setTimeout(() => setShowCards(true), 2600);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-greeting-container">
        <h1 className="greeting-text">
          <span className="good-morning">Good Morning</span>
          {showName && <span className="user-name">, Rakesh</span>}
          {showWave && <span className="wave">👋</span>}
        </h1>
        
        <p className={`intro-text ${showIntro ? 'visible' : ''}`}>
          I've reviewed updates from Slawo, Mishil and Shivani this morning.<br/>
          Here are today's key highlights.
        </p>
      </div>

      <div className={`decision-cards-row ${showCards ? 'visible' : ''}`}>
        <div className="decision-card glass-panel">
          <div className="card-icon-wrapper revenue">
            <TrendingDown size={20} className="card-icon" />
          </div>
          <h4 className="card-title">Revenue Opportunity</h4>
          <p className="card-desc">Revenue decreased 6% yesterday</p>
        </div>
        
        <div className="decision-card glass-panel">
          <div className="card-icon-wrapper marketing">
            <TrendingUp size={20} className="card-icon" />
          </div>
          <h4 className="card-title">Marketing Alert</h4>
          <p className="card-desc">Google Ads spend increased 18%</p>
        </div>
        
        <div className="decision-card glass-panel">
          <div className="card-icon-wrapper health">
            <AlertTriangle size={20} className="card-icon" />
          </div>
          <h4 className="card-title">Product Health Alert</h4>
          <p className="card-desc">Crash rate increased on Android 15</p>
        </div>
      </div>

      <div className={`brief-and-assistant ${showCards ? 'visible' : ''}`}>
        <div className="executive-brief glass-panel">
          <div className="brief-header">
            <span className="brief-label">TODAY'S BRIEF</span>
          </div>
          
          <p className="brief-intro">
            I've reviewed updates from Slawo, Mishil and Shivani.
          </p>
          
          <div className="brief-content-list">
            <div className="brief-list-item">
              <span className="bullet"></span> Revenue decreased 6% yesterday.
            </div>
            <div className="brief-list-item">
              <span className="bullet"></span> Google Ads spend increased 18%.
            </div>
            <div className="brief-list-item">
              <span className="bullet"></span> Android 15 crash rate increased.
            </div>
            <div className="brief-list-item">
              <span className="bullet"></span> Installs increased 11%.
            </div>
          </div>
          
          <div className="brief-footer">
            <span className="attention-dot"></span> Three items may require your attention today.
          </div>
        </div>
        
        <div className="assistant-wrapper">
          <MayaAssistant />
        </div>
      </div>
    </section>
  );
};

export default Hero;
