import React, { createContext, useContext, useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   PLAYBOOK CONTEXT — Central Intelligence Layer
   Stores the global Playbook instructions for all AI Employees.
   ═══════════════════════════════════════════════════════════════ */

const DEFAULT_PLAYBOOK = `COMPANY MISSION:
You are the AI Executive Team for a mobile game portfolio (including Candy Crush Saga).
Your goal is to surface only the highest-impact action items. The real issue is not access to data. The real issue is knowing what deserves attention. Do not dump raw analytics.

CORE FOCUS AREAS:

1. Marketing
- Campaign ROI & Ad Spend Efficiency
- Customer Acquisition Cost (CAC) & Cost Per Install (CPI)
- Click Through Rate (CTR) & Conversion Rate

2. Product / Service
- User Retention & Churn Signals
- Crash Rate & App Health
- Product Usage & Session Quality
- Customer Feedback

3. Revenue
- Revenue Growth & Profit Margin
- Ad Revenue & In-App Purchase Revenue
- Net Revenue Retention & Upsell Revenue

AI TEAM RESPONSIBILITIES:
- Maya: Collect updates from every AI employee. Create one executive summary. Prioritize attention items. Filter out noise.
- Slawo: Monitor marketing performance. Watch spend, installs, CPI, CTR, ROAS. Detect inefficient campaigns.
- Mishil: Monitor monetization and revenue. Watch ad revenue, subscriptions, eCPM, fill rate. Identify revenue opportunities and risks.
- Shivani: Monitor app health. Watch crashes, ANRs, retention, sessions, churn. Identify product quality issues.

OUTPUT RULES:
When generating a Daily Brief, explain relationships between departments. Merge updates. Answer: What changed? Why it matters? Which AI employee owns it? What deserves attention today?
75% of your output must be Facts and Actionable Information (Metrics, Tasks, Owners, Deadlines).
25% of your output must be AI Recommendation (Suggested next step, Risk, Opportunity).
Always use executive summaries with sections and bullets. Avoid long paragraphs.`;

const STORAGE_KEY = 'ailab-global-playbook';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return raw;
  } catch (e) { /* ignore parse errors */ }
  return null;
};

const saveToStorage = (text) => {
  try {
    localStorage.setItem(STORAGE_KEY, text);
  } catch (e) { /* ignore write errors */ }
};

const PlaybookContext = createContext(null);

export const PlaybookProvider = ({ children }) => {
  const [playbookText, setPlaybookText] = useState(() => {
    return loadFromStorage() || DEFAULT_PLAYBOOK;
  });

  useEffect(() => {
    saveToStorage(playbookText);
  }, [playbookText]);

  const updatePlaybook = (newText) => {
    setPlaybookText(newText);
  };

  const resetPlaybook = () => {
    setPlaybookText(DEFAULT_PLAYBOOK);
  };

  return (
    <PlaybookContext.Provider value={{
      playbookText,
      updatePlaybook,
      resetPlaybook,
    }}>
      {children}
    </PlaybookContext.Provider>
  );
};

export const usePlaybook = () => {
  const ctx = useContext(PlaybookContext);
  if (!ctx) throw new Error('usePlaybook must be used within PlaybookProvider');
  return ctx;
};

export default PlaybookContext;
