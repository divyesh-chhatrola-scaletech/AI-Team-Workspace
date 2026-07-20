import React, { useState, useEffect, useRef } from 'react';
import './MainChatArea.css';
import { Send, TrendingDown, TrendingUp, AlertTriangle, Users, Rocket } from 'lucide-react';
import candyCrushLogo from '../assets/candy-crush-logo.png';
import ExecutiveActionPass from './ExecutiveActionPass';
import TaskDeckOverlay from './TaskDeckOverlay';
import { usePlaybook } from '../context/PlaybookContext';

const TypewriterHero = ({ prefix, emoji, name, speed = 40 }) => {
  const [displayedPrefix, setDisplayedPrefix] = useState('');
  const [displayedName, setDisplayedName] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    let prefixI = 0;
    let nameI = 0;
    const pChars = Array.from(prefix);
    const nChars = Array.from(name);
    let timeout;

    const typeName = () => {
      if (nameI < nChars.length) {
        setDisplayedName(nChars.slice(0, nameI + 1).join(''));
        nameI++;
        timeout = setTimeout(typeName, speed);
      } else {
        setShowEmoji(true);
      }
    };

    const typePrefix = () => {
      if (prefixI < pChars.length) {
        setDisplayedPrefix(pChars.slice(0, prefixI + 1).join(''));
        prefixI++;
        timeout = setTimeout(typePrefix, speed);
      } else {
        typeName();
      }
    };

    const startDelay = setTimeout(typePrefix, 300);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeout);
    };
  }, [prefix, name, speed]);

  return (
    <div className="greeting-line-1" style={{ opacity: 1, transform: 'none', display: 'flex', alignItems: 'center' }}>
      <div>
        {displayedPrefix}
        {displayedPrefix === prefix && (
          <span className="time-emoji" style={{ fontSize: '0.7em', margin: '0 4px', display: 'inline-block', transform: 'translateY(-2px)' }}>{emoji}</span>
        )}
        {displayedPrefix === prefix && ', '}
        {displayedName && <span className="gradient-name">{displayedName}</span>}
      </div>
      <span 
        className={`wave-emoji-container ${showEmoji ? 'visible' : ''}`}
        style={{ opacity: showEmoji ? 1 : 0, transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: showEmoji ? 'scale(1)' : 'scale(0.5)' }}
      >
        <span className="wave-animation">👋</span>
      </span>
    </div>
  );
};

const AnimatedCoffeeCup = ({ visible, showSteam }) => (
  <div className={`coffee-cup-container ${visible ? 'visible' : ''}`}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className={`steam-group ${showSteam ? 'active' : ''}`}>
        <path className="steam s1" d="M9 10C8.5 8 9.5 6 9 4" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path className="steam s2" d="M13 10C13.5 8 12.5 6 13 4" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </g>
      <path d="M7 10C7 10 7 16 7 17C7 18.6569 8.34315 20 10 20H14C15.6569 20 17 18.6569 17 17V10H7Z" fill="url(#cup-grad)"/>
      <path d="M17 12H18.5C19.8807 12 21 13.1193 21 14.5C21 15.8807 19.8807 17 18.5 17H17" stroke="url(#cup-grad)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 20.5H19" stroke="#3A3A3C" strokeWidth="1.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="cup-grad" x1="7" y1="10" x2="17" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#48484A" />
          <stop offset="1" stopColor="#1C1C1E" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fdfdfd', borderRadius: '12px', border: '1px solid #ffcc00' }}>
          <p style={{ color: '#1d1d1f', fontWeight: 600 }}>Failed to render component.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppIdentityCard = ({ icon, appName, portfolioName }) => (
  <div className="alert-card glass-card app-identity-card-compact">
    <div className="alert-icon-wrap identity-icon-wrap">
      <img src={icon} alt={appName} className="identity-icon" />
    </div>
    <div className="alert-content identity-content">
      <h4 className="identity-app-name">{appName}</h4>
      <div className="monitoring-status-compact">
        <div className="status-dot-pulse green-pulse"></div>
        <span>Monitored</span>
      </div>
    </div>
  </div>
);

const ThinkingIndicator = () => {
  const messages = [
    "Maya is reviewing updates...",
    "Maya is analyzing playbook...",
    "Maya is identifying priorities..."
  ];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      timeoutRef.current = setTimeout(() => {
        setIndex(prev => (prev + 1) % messages.length);
        setFade(true); 
      }, 300); 
    }, 2000); 
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.7)', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.05)', maxWidth: 'max-content' }}>
      <div className="status-dot-pulse" style={{ background: '#0a84ff', boxShadow: '0 0 0 0 rgba(10, 132, 255, 0.7)' }}></div>
      <span style={{ 
        color: '#515154', 
        fontSize: '0.9rem', 
        fontWeight: 500,
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.3s ease',
        fontFamily: 'Inter, sans-serif'
      }}>
        {messages[index]}
      </span>
    </div>
  );
};

const quickActions = [
  { id: 'revenue', label: 'Revenue', icon: TrendingDown, color: '#ff3b30', bg: 'rgba(255, 59, 48, 0.1)' },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp, color: '#34c759', bg: 'rgba(52, 199, 89, 0.1)' },
  { id: 'health', label: 'App Health', icon: AlertTriangle, color: '#ff9500', bg: 'rgba(255, 149, 0, 0.1)' },
  { id: 'retention', label: 'User Retention', icon: Users, color: '#0066cc', bg: 'rgba(0, 102, 204, 0.1)' },
  { id: 'growth', label: 'Growth', icon: Rocket, color: '#af52de', bg: 'rgba(175, 82, 222, 0.1)' },
];

const EMPLOYEE_DATA = {
  maya: {
    name: 'Maya',
    role: 'Personal Assistant AI',
    avatar: '/assets/maya.png',
    greeting: 'Good Morning, Rakesh',
    subtitle: 'Here is your daily brief.',
    initialMessages: [
      {
        id: 1,
        sender: 'maya',
        type: 'text',
        content: `<p>Good evening, Rakesh! 👋</p>\n<p>I've reviewed updates from Maya, Slawo, Mishil, and Shivani. Based on your Playbook and today's business signals, I've identified the highest-impact action for you right now.</p>`,
        onCompleteCallback: true
      }
    ]
  },
  slawo: {
    name: 'Slawo',
    role: 'Marketing Manager AI',
    avatar: '/assets/slawo.png',
    greeting: 'Hi Rakesh, I have the latest marketing numbers.',
    subtitle: 'Campaign performance analysis.',
    initialMessages: [
      {
        id: 1,
        sender: 'maya',
        type: 'text',
        content: `<p>Good morning! 👋</p>\n<p>Here's Candy Crush ad performance for the last 7 days.</p>\n\n<h3>Performance Overview</h3>\n<div class="stats-grid">\n  <div class="stat-box"><span>Total Spend</span><strong>$48,200</strong></div>\n  <div class="stat-box"><span>Impressions</span><strong>12.4M</strong></div>\n  <div class="stat-box"><span>Clicks</span><strong>186k</strong></div>\n  <div class="stat-box"><span>CTR</span><strong>1.5%</strong></div>\n  <div class="stat-box"><span>Installs</span><strong>9,300</strong></div>\n  <div class="stat-box"><span>CPI</span><strong>$5.18</strong></div>\n  <div class="stat-box"><span>ROAS</span><strong>2.4</strong></div>\n</div>\n\n<div class="campaign-flex">\n  <div class="campaign-col">\n    <h3>Top Campaign</h3>\n    <p>Sweet Levels – iOS US</p>\n    <ul class="message-list">\n      <li>Spend: $14,800</li>\n      <li>Installs: 3,200</li>\n    </ul>\n  </div>\n  <div class="campaign-col">\n    <h3>Needs Attention</h3>\n    <p>Candy Blast – Android IN</p>\n    <ul class="message-list">\n      <li>Spend: $6,400</li>\n      <li>Installs: 180</li>\n      <li>CPI: $35</li>\n    </ul>\n  </div>\n</div>\n\n<p>What should I change today to improve install volume without increasing total budget?</p>`
      }
    ]
  },
  shivani: {
    name: 'Shivani',
    role: 'Product Manager AI',
    avatar: '/assets/shivani.png',
    greeting: 'Product metrics are ready for review.',
    subtitle: 'Install funnel and retention data.',
    initialMessages: [
      {
        id: 1,
        sender: 'maya',
        type: 'text',
        content: `<p>Good morning! 👋</p>\n<p>Here's Candy Crush install funnel performance for the last 7 days.</p>\n\n<h3>Funnel Metrics</h3>\n<div class="stats-grid">\n  <div class="stat-box"><span>Impressions</span><strong>12.4M</strong></div>\n  <div class="stat-box"><span>Clicks</span><strong>186k</strong></div>\n  <div class="stat-box"><span>CTR</span><strong>1.5%</strong></div>\n  <div class="stat-box"><span>Installs</span><strong>9,300</strong></div>\n  <div class="stat-box"><span>Click-to-Install</span><strong>5%</strong></div>\n  <div class="stat-box"><span>Day-7 Retention</span><strong>32%</strong></div>\n  <div class="stat-box"><span>Level 10 Comp.</span><strong>61%</strong></div>\n</div>\n\n<h3>Observation</h3>\n<p>Sweet Levels – iOS US drives the highest install volume. Day-7 retention is only 18% compared to the portfolio average of 32%.</p>\n<p>Why might these users be dropping faster than average? What onboarding or product experiments should we test?</p>`
      }
    ]
  },
  mishil: {
    name: 'Mishil',
    role: 'Revenue Manager AI',
    avatar: '/assets/mishil.png',
    greeting: 'Revenue report is updated.',
    subtitle: 'Monetization and ROAS analysis.',
    initialMessages: [
      {
        id: 1,
        sender: 'maya',
        type: 'text',
        content: `<p>Good morning! 👋</p>\n<p>Here's Candy Crush revenue performance for the last 7 days.</p>\n\n<h3>Revenue Overview</h3>\n<div class="stats-grid">\n  <div class="stat-box"><span>Total Ad Spend</span><strong>$48,200</strong></div>\n  <div class="stat-box"><span>Total Revenue</span><strong>$115,600</strong></div>\n  <div class="stat-box"><span>Overall ROAS</span><strong>2.4</strong></div>\n</div>\n\n<h3>Campaign Performance</h3>\n<div class="campaign-flex">\n  <div class="campaign-col">\n    <p>Sweet Levels – iOS US</p>\n    <ul class="message-list">\n      <li>Spend: $14,800</li>\n      <li>Revenue: $44,200</li>\n      <li>ROAS: 2.99 ✅</li>\n    </ul>\n  </div>\n  <div class="campaign-col">\n    <p>Power Boosters – Android US</p>\n    <ul class="message-list">\n      <li>Spend: $11,000</li>\n      <li>Revenue: $9,800</li>\n      <li>ROAS: 0.89 ❌</li>\n    </ul>\n  </div>\n  <div class="campaign-col">\n    <p>Candy Blast – Android IN</p>\n    <ul class="message-list">\n      <li>Spend: $6,400</li>\n      <li>Revenue: $2,100</li>\n      <li>ROAS: 0.33 ❌</li>\n    </ul>\n  </div>\n</div>\n\n<p>Two campaigns are currently underperforming. Should we pause them or optimize targeting first?</p>`
      }
    ]
  }
};

const TypewriterHTML = ({ html, speed = 15, onComplete }) => {
  const [displayedHtml, setDisplayedHtml] = useState('');
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  useEffect(() => {
    let i = 0;
    let isTag = false;
    let timeout;
    let isMounted = true;
    
    const type = () => {
      if (!isMounted) return;
      if (i < html.length) {
        let char = html.charAt(i);
        if (char === '<') isTag = true;
        
        i++;
        setDisplayedHtml(html.substring(0, i));
        
        if (char === '>') isTag = false;
        
        timeout = setTimeout(type, isTag ? 0 : speed);
      } else {
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };
    
    type();
    
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [html, speed]);

  return <div className="message-text" dangerouslySetInnerHTML={{ __html: displayedHtml }} />;
};

/* Trigger phrases that activate the Executive Action Brief */
const BRIEF_TRIGGERS = [
  'what should i do today',
  'give me today\'s tasks',
  'today\'s tasks',
  'what are my top priorities',
  'top priorities',
  'show my action items',
  'action items',
  'what deserves my attention',
  'my tasks',
  'daily brief',
  'executive brief',
  'mission brief',
  'what\'s on my plate',
];

const isExecutiveBriefTrigger = (text) => {
  const lower = text.toLowerCase().trim();
  return BRIEF_TRIGGERS.some(trigger => lower.includes(trigger));
};

const MainChatArea = ({ activeEmployee = 'maya', setActiveEmployee }) => {
  const { playbookText } = usePlaybook();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatScrollRef = useRef(null);
  const [showHero, setShowHero] = useState(false);
  const [seqStep, setSeqStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTaskDeck, setShowTaskDeck] = useState(false);

  useEffect(() => {
    // When activeEmployee changes, trigger a smooth transition
    setIsTransitioning(true);
    setShowHero(false);
    setSeqStep(0);
    
    const transitionTimer = setTimeout(() => {
      setMessages([]); // Clear chat immediately during fade
      
      // Load new messages and start showing hero
      setShowHero(true);
      setIsTransitioning(false);
      
      // Simulate typing delay before showing the predefined message
      setTimeout(() => {
        const currentHour = new Date().getHours();
        let timeStr = 'Morning';
        if (currentHour >= 12 && currentHour < 17) timeStr = 'Afternoon';
        else if (currentHour >= 17 && currentHour < 21) timeStr = 'Evening';
        else if (currentHour >= 21 || currentHour < 4) timeStr = 'Night';

        const initial = EMPLOYEE_DATA[activeEmployee]?.initialMessages || [];
        const localizedMessages = initial.map(msg => {
          if (msg.type === 'text' && typeof msg.content === 'string') {
            return {
              ...msg,
              content: msg.content.replace(/Good morning! 👋/i, `Good ${timeStr}! 👋`)
            };
          }
          return msg;
        });

        setMessages(localizedMessages);
      }, 2200);
      
    }, 400); // 400ms fade transition duration

    return () => clearTimeout(transitionTimer);
  }, [activeEmployee]);

  useEffect(() => {
    if (showHero) {
      const t1 = setTimeout(() => setSeqStep(1), 400); // Hand wave
      const t2 = setTimeout(() => setSeqStep(2), 800); // Coffee cup fades in
      const t3 = setTimeout(() => setSeqStep(3), 1200); // Steam & subtitle text
      const t4 = setTimeout(() => setSeqStep(4), 1600); // Cards fade in
      const t5 = setTimeout(() => setSeqStep(5), 2000); // Final state

      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }
  }, [showHero, activeEmployee]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: inputValue
    };

    if (isExecutiveBriefTrigger(inputValue)) {
      const thinkMsg = {
        id: Date.now() + 1,
        sender: 'maya',
        type: 'thinking'
      };
      setMessages(prev => [...prev, userMsg, thinkMsg]);

      setTimeout(() => {
        setMessages(prev => {
          const filtered = prev.filter(m => m.type !== 'thinking');
          const textMsg = {
            id: Date.now() + 2,
            sender: 'maya',
            type: 'text',
            content: `<p>I've reviewed updates from Maya, Slawo, Mishil, and Shivani. Based on your Playbook and today's business signals, I've identified the highest-impact action for you right now.</p>`,
            onCompleteCallback: true
          };
          return [...filtered, textMsg];
        });
      }, 3500);
    } else {
      setMessages(prev => [...prev, userMsg]);
    }

    setInputValue('');
  };

  const hour = new Date().getHours();
  let timeOfDay = 'Morning';
  const activeData = EMPLOYEE_DATA[activeEmployee] || EMPLOYEE_DATA['maya'];
  
  let greetingPrefix = 'Good Morning';
  let timeEmoji = '🌅';
  let subtitleText = 'Here is your daily brief. Enjoy your coffee';

  if (hour >= 12 && hour < 17) {
    timeOfDay = 'Afternoon';
    greetingPrefix = 'Good Afternoon';
    timeEmoji = '🌤️';
  } else if (hour >= 17 && hour < 21) {
    timeOfDay = 'Evening';
    greetingPrefix = 'Good Evening';
    timeEmoji = '🌇';
  } else if (hour >= 21 || hour < 4) {
    timeOfDay = 'Night';
    greetingPrefix = 'Good Night';
    timeEmoji = '🌙';
  }

  return (
    <div className="main-chat-area glass-panel">

      <div className="chat-header">
        <div className="header-avatar-wrap">
          <img src={activeData.avatar} alt={activeData.name} />
          <div className="header-sparkle">✨</div>
        </div>
        <div className="header-title">{activeData.name} AI</div>
      </div>

      <div className={`chat-messages-container ${isTransitioning ? 'fade-out' : 'fade-in'}`} ref={chatScrollRef}>

        {/* Sticky Greeting Header */}
        <div className={`chat-sticky-header ${showHero ? 'visible' : ''}`}>
          <h1 className="hero-greeting">
            {showHero && (
              <TypewriterHero 
                prefix={greetingPrefix} 
                emoji={timeEmoji}
                name="Rakesh" 
              />
            )}
          </h1>
          
          <div className="hero-subtitle-container">
            <p className="hero-subtitle">
              {subtitleText}
            </p>
            <AnimatedCoffeeCup visible={true} showSteam={true} />
          </div>
        </div>

        {messages.map(msg => {
          if (msg.type === 'executive_pass') {
            return (
              <ErrorBoundary key={msg.id}>
                <div style={{ width: '100%', padding: '10px 0 20px 48px', display: 'flex', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
                  <ExecutiveActionPass animateIn={msg.animateIn !== false} />
                </div>
              </ErrorBoundary>
            );
          }

          if (msg.type === 'thinking') {
            return (
              <div key={msg.id} className="chat-message-row maya">
                <img src={activeData.avatar} alt="maya" className="message-avatar" />
                <ThinkingIndicator />
              </div>
            );
          }

          return (
            <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
              <img 
                src={msg.sender === 'user' ? "/assets/rakesh.png" : activeData.avatar} 
                alt={msg.sender} 
                className="message-avatar" 
              />

              <div className={`message-bubble ${msg.sender} ${msg.type === 'short_brief' ? 'short-bubble' : ''}`}>
                {msg.type === 'text' ? (
                  msg.sender === 'user' ? (
                    <div className="message-text" dangerouslySetInnerHTML={{ __html: msg.content }} />
                  ) : (
                    <TypewriterHTML 
                      html={msg.content} 
                      onComplete={() => {
                        if (msg.onCompleteCallback) {
                          setTimeout(() => {
                            setMessages(prev => {
                              if (prev.some(m => m.type === 'executive_pass')) return prev;
                              return [...prev, {
                                id: Date.now() + 3,
                                sender: 'maya',
                                type: 'executive_pass',
                                animateIn: true
                              }];
                            });
                          }, 1000);
                        }
                      }}
                    />
                  )
                ) : msg.type === 'short_brief' ? (
                  <div className="short-brief-container">
                    {msg.content.sections.map((sec, idx) => (
                      <div key={idx} className="short-brief-section">
                        <div className="short-brief-header">
                          <span className="short-brief-icon">{sec.icon}</span>
                          <h4 className="short-brief-title">{sec.title}</h4>
                        </div>
                        <div className="short-brief-items">
                          {sec.items.map((item, i) => (
                            <div key={i} className="short-brief-item">{item}</div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="short-brief-alert">
                      {msg.content.alert}
                    </div>
                  </div>
                ) : (
                  <ul className="message-brief-list">
                    {msg.content.map((item, idx) => (
                      <li key={idx} className="brief-list-item">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-bottom-section">
        <div className="chat-composer-wrap">
          <input
            type="text"
            className="chat-input"
            placeholder={`✨ Ask ${activeData.name} anything...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-send-btn" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Task Deck Overlay — slides over chat, preserves state */}
      {showTaskDeck && (
        <TaskDeckOverlay
          onClose={() => setShowTaskDeck(false)}
          setActiveEmployee={setActiveEmployee}
          playbook={playbookText}
        />
      )}
    </div>
  );
};

export default MainChatArea;
