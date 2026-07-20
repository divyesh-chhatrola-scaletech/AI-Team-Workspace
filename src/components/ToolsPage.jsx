import React from 'react';
import { Link2, CheckCircle2, Unplug } from 'lucide-react';
import './ToolsPage.css';

const TOOLS = [
    {
        id: 'google-ads',
        name: 'Google Ads',
        description: 'Connect to sync campaign performance, spend, and ROAS directly into your marketing dashboard.',
        icon: '/assets/google-ads.svg',
        connected: true
    },
    {
        id: 'admob',
        name: 'Google AdMob',
        description: 'Track your app monetization, eCPM, and ad revenue natively within your AI Lab environment.',
        icon: '/assets/admob.svg',
        connected: true
    },
    {
        id: 'google-play',
        name: 'Google Play IAP',
        description: 'Monitor in-app purchases, subscriptions, and active user trends from the Google Play Store.',
        icon: '/assets/google-play.svg',
        connected: true
    },
    {
        id: 'firebase',
        name: 'Firebase Analytics',
        description: 'Bring real-time user engagement, retention metrics, and crash reporting to your product dashboard.',
        icon: '/assets/firebase.svg',
        connected: true
    },
    {
        id: 'google-workspace',
        name: 'Google Workspace',
        description: 'Integrate Docs, Sheets, and Drive for seamless AI context gathering and document drafting.',
        icon: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
        connected: false
    },
    {
        id: 'slack',
        name: 'Slack',
        description: 'Connect your channels to let AI employees read context and send automated team updates.',
        icon: 'https://www.vectorlogo.zone/logos/slack/slack-icon.svg',
        connected: false
    },
    {
        id: 'outlook',
        name: 'Microsoft Outlook',
        description: 'Sync your calendar and emails to automate scheduling and draft intelligent email responses.',
        icon: 'https://img.icons8.com/color/48/000000/microsoft-outlook-2019.png',
        connected: false
    }
];

const ToolsPage = () => {
    return (
        <div className="tools-page-container">
            <h2 className="tools-page-title">Available Integrations</h2>
            <p className="tools-page-subtitle">Connect your platforms to provide real-time data to your AI team.</p>

            <div className="tools-grid">
                {TOOLS.map((tool) => (
                    <div key={tool.id} className="tool-card glass-panel">
                        {tool.connected && (
                            <div className="tool-status-chip">
                                <CheckCircle2 size={12} />
                                <span>Connected</span>
                            </div>
                        )}
                        <div className="tool-icon-wrapper">
                            <img src={tool.icon} alt={tool.name} className="tool-icon" onError={(e) => { e.target.onerror = null; e.target.src = '/assets/react.svg'; }} />
                        </div>

                        <div className="tool-info">
                            <h3 className="tool-name">{tool.name}</h3>
                            <p className="tool-desc">{tool.description}</p>
                        </div>

                        <div className="tool-actions">
                            <button className={`connect-btn ${tool.connected ? 'disconnect-btn' : ''}`}>
                                {tool.connected ? <Unplug size={16} /> : <Link2 size={16} />}
                                <span>{tool.connected ? 'Disconnect' : 'Connect'}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToolsPage;