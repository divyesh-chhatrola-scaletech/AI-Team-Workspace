import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronRight } from 'lucide-react';
import './TaskDeckOverlay.css';

/* ── Demo Task Data ── */
const TASK_DATA = [
  {
    id: 1,
    number: '#01',
    title: 'Pause "Candy Blast – Android IN"',
    priority: 'critical',
    category: 'Revenue',
    owner: { id: 'slawo', name: 'Slawo', role: 'Marketing Manager AI', avatar: '/assets/slawo.png' },
    reason: 'Campaign CPI is 6.7x target and ROAS is 0.33. Continued spend is generating losses.',
    impact: 'Save $1,200/day in wasted ad spend immediately.',
  },
  {
    id: 2,
    number: '#02',
    title: 'Fix Android 15 Crash Spike',
    priority: 'critical',
    category: 'Product',
    owner: { id: 'shivani', name: 'Shivani', role: 'Product Manager AI', avatar: '/assets/shivani.png' },
    reason: 'Crash rate on Android 15 devices increased 340% after latest update. Affecting 12% of active users.',
    impact: 'Prevent 1,800+ daily user drop-offs and protect store rating.',
  },
  {
    id: 3,
    number: '#03',
    title: 'Review Google Ads Agency Email',
    priority: 'critical',
    category: 'Marketing',
    owner: { id: 'maya', name: 'Maya', role: 'Personal Assistant AI', avatar: '/assets/maya.png' },
    reason: 'Agency sent revised Q4 media plan requiring approval by EOD. Budget implications of $45,000.',
    impact: 'Lock in Q4 campaign schedule and negotiate preferred rates.',
  },
  {
    id: 4,
    number: '#04',
    title: 'Approve Halloween Creative',
    priority: 'important',
    category: 'Marketing',
    owner: { id: 'slawo', name: 'Slawo', role: 'Marketing Manager AI', avatar: '/assets/slawo.png' },
    reason: 'Design team delivered 3 variants. Approval needed for production pipeline by tomorrow.',
    impact: 'On-time seasonal campaign launch with 22% expected CTR lift.',
  },
  {
    id: 5,
    number: '#05',
    title: 'Optimize "Sweet Levels" Bid Strategy',
    priority: 'important',
    category: 'Revenue',
    owner: { id: 'mishil', name: 'Mishil', role: 'Revenue Manager AI', avatar: '/assets/mishil.png' },
    reason: 'Top campaign ROAS is 2.99 but bid ceiling may be leaving impressions on the table.',
    impact: 'Potential +15% install volume at same CPI with bid adjustments.',
  },
  {
    id: 6,
    number: '#06',
    title: 'Review Day-7 Retention Drop',
    priority: 'normal',
    category: 'Product',
    owner: { id: 'shivani', name: 'Shivani', role: 'Product Manager AI', avatar: '/assets/shivani.png' },
    reason: 'Sweet Levels – iOS US D7 retention is 18% vs portfolio average of 32%.',
    impact: 'Diagnosing root cause could improve LTV by $0.40 per user.',
  },
  {
    id: 7,
    number: '#07',
    title: 'Update UA Budget Allocation',
    priority: 'normal',
    category: 'Operations',
    owner: { id: 'slawo', name: 'Slawo', role: 'Marketing Manager AI', avatar: '/assets/slawo.png' },
    reason: 'Current allocation hasn\'t been adjusted for Q4 seasonality. Opportunity cost increasing.',
    impact: 'Better ROI alignment across 6 active campaigns.',
  },
  {
    id: 8,
    number: '#08',
    title: 'Prepare Weekly Exec Summary',
    priority: 'normal',
    category: 'Operations',
    owner: { id: 'maya', name: 'Maya', role: 'Personal Assistant AI', avatar: '/assets/maya.png' },
    reason: 'Weekly stakeholder report due Thursday. Data collection needs to start today.',
    impact: 'Keep leadership aligned on KPIs and blockers.',
  },
  {
    id: 9,
    number: '#09',
    title: 'Scale "Power Boosters" iOS Campaign',
    priority: 'normal',
    category: 'Revenue',
    owner: { id: 'mishil', name: 'Mishil', role: 'Revenue Manager AI', avatar: '/assets/mishil.png' },
    reason: 'iOS variant showing ROAS 3.2 in test market. Ready for broader geo targeting.',
    impact: 'Projected +$3,400/week in incremental revenue.',
  },
  {
    id: 10,
    number: '#10',
    title: 'Schedule App Store Listing A/B Test',
    priority: 'normal',
    category: 'Operations',
    owner: { id: 'shivani', name: 'Shivani', role: 'Product Manager AI', avatar: '/assets/shivani.png' },
    reason: 'New screenshots and description copy are ready. Test setup takes 24h to propagate.',
    impact: 'Expected +8% conversion rate improvement from listing optimization.',
  },
];

const TaskDeckOverlay = ({ onClose, setActiveEmployee }) => {
  // Sort tasks by priority
  const sortedInitial = useMemo(() => {
    const priorityOrder = { critical: 3, important: 2, normal: 1 };
    return [...TASK_DATA].sort((a, b) => {
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    });
  }, []);

  const [tasks, setTasks] = useState(sortedInitial);
  const [activeIndex, setActiveIndex] = useState(0);
  const [completingId, setCompletingId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const activeTasks = tasks.filter(t => !t.completed);
  const completedCount = tasks.filter(t => t.completed).length;

  // Find matching playbook condition for a task (simulated from global playbook)
  const getMatchedRule = (task) => {
    const rules = {
      'Revenue': { metric: 'ROAS', condition: '<', value: 1.0 },
      'Marketing': { metric: 'CPI', condition: '>', value: 5.0 },
      'Product': { metric: 'Crash Rate', condition: '>', value: 1.0 },
    };
    return rules[task.category] || null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActiveIndex(prev => Math.min(prev + 1, activeTasks.length - 1));
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTasks.length]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose?.(), 400);
  }, [onClose]);

  const handleComplete = useCallback((taskId, e) => {
    e.stopPropagation();
    setCompletingId(taskId);
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
      setCompletingId(null);
      setActiveIndex(prev => Math.min(prev, activeTasks.length - 2));
    }, 600);
  }, [activeTasks.length]);

  const handleOpenConversation = useCallback((ownerId, e) => {
    e.stopPropagation();
    setActiveEmployee?.(ownerId);
    handleClose();
  }, [setActiveEmployee, handleClose]);

  const handleCardClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const activeTask = activeTasks[activeIndex];

  return (
    <div className={`task-deck-overlay ${isClosing ? 'closing' : ''}`}>
      <div className="deck-layout">
        {/* ── Left Panel: Card Stack ── */}
        <div className="deck-stack-panel">
          <div className="deck-header">
            <div className="deck-header-left">
              <h2 className="deck-header-title">Task Deck</h2>
              <span className="deck-header-subtitle">
                {activeTasks.length} remaining • {completedCount} completed
              </span>
            </div>
            <button className="deck-close-btn" onClick={handleClose}>
              <X size={18} />
            </button>
          </div>

          {/* Card Stack */}
          <div className="deck-stack-container">
            {activeTasks.map((task, index) => {
              const isActive = index === activeIndex;
              const isBehind = index > activeIndex;
              const offset = index - activeIndex;
              const isCompleting = completingId === task.id;

              if (index < activeIndex) return null; // Cards already passed
              if (offset > 4) return null; // Only show 5 cards deep

              const stackY = isActive ? 0 : offset * 12;
              const stackScale = isActive ? 1 : 1 - offset * 0.03;
              const stackOpacity = isActive ? 1 : Math.max(0.4, 1 - offset * 0.15);

              return (
                <div
                  key={task.id}
                  className={`task-card ${isActive ? 'active-card' : 'behind'} ${isCompleting ? 'completing' : ''}`}
                  style={{
                    zIndex: 10 - offset,
                    transform: `translateY(${stackY}px) scale(${stackScale})`,
                    opacity: stackOpacity,
                    '--stack-y': `${stackY}px`,
                    '--stack-scale': stackScale,
                    animationDelay: `${index * 0.08}s`,
                  }}
                  onClick={() => !isActive && handleCardClick(index)}
                >
                  <div className={`task-card-accent ${task.priority}`} />

                  {isActive ? (
                    /* ── Full Active Card ── */
                    <div className="task-card-inner">
                      <div className="task-card-top-row">
                        <span className="task-card-number">{task.number}</span>
                        <span className={`task-card-priority-badge ${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>

                      <h3 className="task-card-title">{task.title}</h3>

                      {/* Owner Badge */}
                      <div
                        className="task-card-owner"
                        onClick={(e) => handleOpenConversation(task.owner.id, e)}
                      >
                        <img
                          src={task.owner.avatar}
                          alt={task.owner.name}
                          className="task-card-owner-avatar"
                        />
                        <div className="task-card-owner-info">
                          <span className="task-card-owner-name">{task.owner.name}</span>
                          <span className="task-card-owner-role">{task.owner.role}</span>
                        </div>
                        <ChevronRight size={14} className="task-card-owner-arrow" />
                      </div>

                      <div className="task-card-detail-section">
                        <span className="task-card-detail-label">Reason</span>
                        <p className="task-card-detail-text">{task.reason}</p>
                      </div>

                      <div className="task-card-detail-section">
                        <span className="task-card-detail-label">Potential Impact</span>
                        <p className="task-card-detail-text">{task.impact}</p>
                      </div>

                      {/* Matched Playbook Rule */}
                      {getMatchedRule(task) && (
                        <div className="task-card-detail-section">
                          <span className="task-card-detail-label" style={{ color: '#0a84ff' }}>Playbook Rule</span>
                          <p className="task-card-detail-text" style={{ fontSize: '0.82rem', color: '#0a84ff', fontWeight: 600 }}>
                            {getMatchedRule(task).metric} {getMatchedRule(task).operator} {getMatchedRule(task).threshold}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="task-card-actions">
                        <button
                          className="task-card-action-btn primary"
                          onClick={(e) => handleOpenConversation(task.owner.id, e)}
                        >
                          Open Conversation
                        </button>
                        <button
                          className="task-card-action-btn secondary"
                          onClick={(e) => handleComplete(task.id, e)}
                        >
                          Mark Complete
                        </button>
                        <button className="task-card-action-btn tertiary">
                          Remind Me Later
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── Behind Card Preview ── */
                    <div className="task-card-behind-preview">
                      <span className="task-card-behind-number">{task.number}</span>
                      <span className="task-card-behind-title">{task.title}</span>
                      <span className={`task-card-behind-badge ${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="deck-progress">
            <div className="deck-progress-dots">
              {tasks.map((task, i) => (
                <div
                  key={task.id}
                  className={`deck-progress-dot ${
                    task.completed ? 'completed' :
                    activeTasks.indexOf(task) === activeIndex ? 'active' : ''
                  }`}
                  onClick={() => {
                    if (!task.completed) {
                      setActiveIndex(activeTasks.indexOf(task));
                    }
                  }}
                />
              ))}
            </div>
            <span className="deck-progress-text">
              {completedCount}/{tasks.length}
            </span>
          </div>

          {/* Keyboard Hints */}
          <div className="deck-keyboard-hints">
            <div className="deck-kbd-hint">
              <span className="deck-kbd">↑↓</span> Navigate
            </div>
            <div className="deck-kbd-hint">
              <span className="deck-kbd">ESC</span> Close
            </div>
          </div>
        </div>

        {/* ── Right Detail Panel ── */}
        <div className="deck-detail-panel">
          {activeTask && (
            <>
              <div className="deck-detail-section">
                <span className="deck-detail-section-title">Current Task</span>
                <span className="deck-detail-section-text" style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                  {activeTask.title}
                </span>
              </div>

              <div className="deck-detail-section">
                <span className="deck-detail-section-title">Category</span>
                <span className="deck-detail-section-text">{activeTask.category}</span>
              </div>

              <div className="deck-detail-section">
                <span className="deck-detail-section-title">Assigned To</span>
                <div className="task-card-owner" onClick={(e) => handleOpenConversation(activeTask.owner.id, e)}>
                  <img src={activeTask.owner.avatar} alt={activeTask.owner.name} className="task-card-owner-avatar" />
                  <div className="task-card-owner-info">
                    <span className="task-card-owner-name">{activeTask.owner.name}</span>
                    <span className="task-card-owner-role">{activeTask.owner.role}</span>
                  </div>
                  <ChevronRight size={14} className="task-card-owner-arrow" />
                </div>
              </div>

              <div className="deck-detail-section">
                <span className="deck-detail-section-title">Why This Matters</span>
                <span className="deck-detail-section-text">{activeTask.reason}</span>
              </div>

              <div className="deck-detail-section">
                <span className="deck-detail-section-title">Expected Outcome</span>
                <span className="deck-detail-section-text">{activeTask.impact}</span>
              </div>

              {/* Completion Summary */}
              <div className="deck-completion-summary">
                <div className="deck-completion-row">
                  <span className="deck-completion-label">Progress</span>
                  <span className="deck-completion-value">{completedCount}/{tasks.length}</span>
                </div>
                <div className="deck-completion-bar-track">
                  <div
                    className="deck-completion-bar-fill"
                    style={{ width: `${(completedCount / tasks.length) * 100}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDeckOverlay;
