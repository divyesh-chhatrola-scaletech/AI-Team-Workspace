import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Sparkles, CheckCircle, ArrowRight, ExternalLink, Mail, Calendar, MessageSquare, BarChart2, Smartphone, DollarSign, Target } from 'lucide-react';
import './ExecutiveActionPass.css';

const getDestinationIcon = (type) => {
  switch(type) {
    case 'google-ads': return <BarChart2 size={16} color="#4285F4" />;
    case 'play-console': return <Smartphone size={16} color="#00D270" />;
    case 'gmail': return <Mail size={16} color="#EA4335" />;
    case 'calendar': return <Calendar size={16} color="#4285F4" />;
    case 'slack': return <MessageSquare size={16} color="#E01E5A" />;
    case 'adsense': return <DollarSign size={16} color="#0F9D58" />;
    case 'admob': return <Target size={16} color="#EA4335" />;
    default: return <ExternalLink size={16} color="#0A84FF" />;
  }
};

const ACTION_ITEMS = [
  { 
    id: 1, 
    priority: 'Critical',
    priorityColor: '#ff3b30',
    title: 'Review Google Ads Agency Emails', 
    context: 'Three unread agency emails require Q4 budget approval before the 10:00 AM UA sync meeting. Delaying approval could block campaign launches and creative review.',
    time: '10 min',
    owner: { name: 'Maya', img: '/assets/maya.png' },
    recommendation: 'Complete this first because budget approvals affect three downstream marketing decisions and today\'s campaign pacing.',
    confidence: '94%',
    impact: '+$4,600 / wk',
    destination: { name: 'Google Ads', type: 'google-ads', url: 'https://ads.google.com' }
  },
  { 
    id: 2, 
    priority: 'High',
    priorityColor: '#ff9f0a',
    title: 'Weekly UA Sync Preparation', 
    context: 'The UA team needs final ROAS targets for the upcoming iOS 18 launch. Missing this sync means delayed budget reallocation for next week.',
    time: '15 min',
    owner: { name: 'Slawo', img: '/assets/slawo.png' },
    recommendation: 'Review the auto-generated ROAS target report before the meeting. I have prepared the summary in your inbox.',
    confidence: '92%',
    impact: 'Keep UA on track',
    destination: { name: 'Google Calendar', type: 'calendar', url: 'https://calendar.google.com' }
  },
  { 
    id: 3, 
    priority: 'High',
    priorityColor: '#ff9f0a',
    title: 'Android 15 Crash Investigation', 
    context: 'Crash rate on Android 15 devices increased 340% after the latest update, currently affecting 12% of active users.',
    time: '15 min',
    owner: { name: 'Shivani', img: '/assets/shivani.png' },
    recommendation: 'Forward the automated crash logs to the engineering lead immediately to stem D1 retention drops.',
    confidence: '91%',
    impact: 'Prevent 1,800 churns',
    destination: { name: 'Google Playstore', type: 'play-console', url: 'https://play.google.com/console' }
  },
  { 
    id: 4, 
    priority: 'Medium',
    priorityColor: '#0a84ff',
    title: 'Sweet Levels Bid Strategy', 
    context: 'ROAS is 2.99. Adjusting the bid ceiling may capture additional install volume at a highly profitable margin.',
    time: '5 min',
    owner: { name: 'Mishil', img: '/assets/mishil.png' },
    recommendation: 'Approve a 15% bid ceiling increase test for the next 48 hours to validate volume elasticity.',
    confidence: '86%',
    impact: '+15% install vol',
    destination: { name: 'Google AdSense', type: 'adsense', url: 'https://www.google.com/adsense' }
  },
  { 
    id: 5, 
    priority: 'Low',
    priorityColor: '#34c759',
    title: 'Halloween Creative Review', 
    context: 'The design team has uploaded 4 new Halloween creative variants for the upcoming seasonal campaign.',
    time: '5 min',
    owner: { name: 'Slawo', img: '/assets/slawo.png' },
    recommendation: 'Approve the top 2 variants based on historical CTR of similar seasonal events.',
    confidence: '89%',
    impact: '+20% CTR expected',
    destination: { name: 'Google AdMob', type: 'admob', url: 'https://admob.google.com' }
  }
];

const ExecutiveActionPass = ({ animateIn = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [renderStage, setRenderStage] = useState(animateIn ? 0 : 2); 
  const [hasEntered, setHasEntered] = useState(!animateIn);
  const [completionState, setCompletionState] = useState({ id: null, status: 'idle' });

  useEffect(() => {
    if (renderStage === 0) {
      const t1 = setTimeout(() => setRenderStage(1), 50);
      return () => clearTimeout(t1);
    } else if (renderStage === 1) {
      const t2 = setTimeout(() => setRenderStage(2), 400); // Wait for main card to animate
      return () => clearTimeout(t2);
    } else if (renderStage === 2 && !hasEntered) {
      const t3 = setTimeout(() => setHasEntered(true), 1000); // 1s buffer for stack to finish
      return () => clearTimeout(t3);
    }
  }, [renderStage, hasEntered]);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, ACTION_ITEMS.length));
  };

  const handleComplete = (id) => {
    setCompletionState({ id, status: 'success' });
    setTimeout(() => {
      setCompletionState({ id, status: 'tearing' });
      setTimeout(() => {
        handleNext();
        setCompletionState({ id: null, status: 'idle' });
      }, 700); // Wait for tear animation to finish
    }, 1500); // Hold success state for 1.5s
  };

  const isFinished = currentIndex >= ACTION_ITEMS.length;

  return (
    <div className="stacking-pass-wrapper">
      {isFinished && (
        <div className="compact-pass-container stacked-card active-card finished" style={{ position: 'relative', height: '100%' }}>
          <CheckCircle size={48} color="#30d158" />
          <h2 style={{ fontSize: '1.4rem', marginTop: '16px', color: '#1d1d1f' }}>You're all caught up!</h2>
          <p style={{ color: '#86868b' }}>No pending tasks in queue.</p>
        </div>
      )}
      
      {!isFinished && ACTION_ITEMS.map((item, index) => {
        const offset = index - currentIndex;
        
        if (offset > 4 || offset < -1) return null;
        
        const isExited = offset < 0;
        const isTop = offset === 0;
        const isCompleting = item.id === completionState.id;
        const completionStatus = isCompleting ? completionState.status : 'idle';

        let scale = 1;
        let translateY = '0px';
        let translateX = '0px';
        let opacity = 1;
        let zIndex = 100 - Math.abs(offset);
        let transitionDelay = '0ms';
        let transitionStyle = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease';

        // Animate-in sequencing logic
        if (renderStage === 0) {
          opacity = 0;
          if (isTop) {
            translateY = '20px';
            scale = 0.96;
          }
        } else if (renderStage === 1) {
          if (isTop) {
            opacity = 1;
            translateY = '0px';
            scale = 1;
          } else {
            opacity = 0; 
          }
        } else if (renderStage === 2) {
          if (isExited) {
            scale = 0.98;
            translateY = '-20px'; 
            translateX = '0px'; 
            opacity = 0;
            transitionStyle = 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out';
          } else {
            scale = 1 - (offset * 0.05);
            translateY = `-${offset * 12}px`; 
            opacity = offset >= 4 ? 0 : 1 - (offset * 0.15);
            
            if (!hasEntered && !isTop) {
              transitionDelay = `${offset * 100}ms`;
            }
          }
        }

        return (
          <div 
            key={item.id} 
            className={`compact-pass-container stacked-card ${isTop ? 'active-card' : ''} ${completionStatus === 'success' ? 'success-state' : ''} ${completionStatus === 'tearing' ? 'tearing-state' : ''}`}
            style={{
              transform: `translate(${translateX}, ${translateY}) scale(${scale})`,
              opacity: opacity,
              zIndex: zIndex,
              pointerEvents: isTop ? 'auto' : 'none',
              transitionDelay: transitionDelay,
              transition: transitionStyle
            }}
          >
            {/* LEFT SECTION (70%) */}
            <div className="pass-left">
              {isCompleting && (completionStatus === 'success' || completionStatus === 'tearing') && (
                <div className="success-overlay">
                  <CheckCircle size={48} color="white" />
                  <h3>Task Completed</h3>
                  <p>Keep Progressing</p>
                </div>
              )}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="pass-priority" style={{ color: item.priorityColor, marginBottom: 0 }}>
                    <AlertCircle size={14} />
                    <span>PRIORITY: {item.priority.toUpperCase()}</span>
                  </div>
                  <div className="pass-counter" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#86868b', letterSpacing: '0.05em' }}>
                    {String(index + 1).padStart(2, '0')} / {String(ACTION_ITEMS.length).padStart(2, '0')}
                  </div>
                </div>
                
                <h2 className="pass-title">{item.title}</h2>
                <p className="pass-context">{item.context}</p>
              </div>

              <div className="pass-meta">
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div className="pass-owner">
                    <img src={item.owner.img} alt={item.owner.name} />
                    <span>Assigned: {item.owner.name}</span>
                  </div>
                  <div className="pass-time">
                    <Clock size={14} />
                    <span>Est. {item.time}</span>
                  </div>
                </div>
                <button 
                  className="btn-next" 
                  onClick={handleNext}
                  style={{ marginLeft: 'auto', padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  Next Action <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* RIGHT SECTION (30%) */}
            <div className="pass-right">
              <div className="pass-rec">
                <div className="pass-rec-title">
                  <Sparkles size={14} /> AI Recommendation
                </div>
                <p className="pass-rec-text">{item.recommendation}</p>
              </div>

              <div className="pass-rec-metrics">
                <div className="pass-metric-block">
                  <span className="pass-metric-label">Confidence</span>
                  <span className="pass-metric-val">{item.confidence}</span>
                </div>
                <div className="pass-metric-block">
                  <span className="pass-metric-label">Expected Impact</span>
                  <span className="pass-metric-val impact">{item.impact}</span>
                </div>
              </div>

              <div className="pass-actions">
                <button className="btn-complete" onClick={() => handleComplete(item.id)}>
                  <CheckCircle size={14} /> Mark Complete
                </button>
                {item.destination && (
                  <button 
                    className="btn-take-action" 
                    onClick={() => window.open(item.destination.url, '_blank')}
                  >
                    {getDestinationIcon(item.destination.type)} Take Action
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExecutiveActionPass;
