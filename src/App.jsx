import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AssistantPanel from './components/AssistantPanel';
import MainChatArea from './components/MainChatArea';
import AIEmployees from './components/AIEmployees';
import ToolsPage from './components/ToolsPage';
import PlaybookPage from './components/PlaybookPage';
import { PlaybookProvider } from './context/PlaybookContext';
import './index.css';
import './App.css';

function App() {
  const [activeEmployee, setActiveEmployee] = useState('maya');
  const [activeNavItem, setActiveNavItem] = useState('My Assistant');

  return (
    <PlaybookProvider>
      <div className="aurora-bg"></div>

      <div className="workspace-layout">
        <Sidebar activeItem={activeNavItem} setActiveItem={setActiveNavItem} />
        {activeNavItem === 'AI Employees' ? (
          <div className="full-page-container" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            <AIEmployees
              setActiveEmployee={setActiveEmployee}
              setActiveNavItem={setActiveNavItem}
            />
          </div>
        ) : activeNavItem === 'Tools' ? (
          <div className="full-page-container" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            <ToolsPage />
          </div>
        ) : activeNavItem === 'Playbook' ? (
          <div className="full-page-container" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            <PlaybookPage />
          </div>
        ) : (
          <>
            <AssistantPanel activeEmployee={activeEmployee} setActiveEmployee={setActiveEmployee} />
            <MainChatArea activeEmployee={activeEmployee} setActiveEmployee={setActiveEmployee} />
          </>
        )}
      </div>
    </PlaybookProvider>
  );
}

export default App;