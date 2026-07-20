import React, { useState } from 'react';
import { Settings, MessageSquare } from 'lucide-react';
import './AIEmployees.css';

const EMPLOYEES = [
    {
        id: 'maya',
        name: 'Maya',
        role: 'Personal Assistant AI',
        status: 'Active',
        image: '/assets/maya.png'
    },
    {
        id: 'slawo',
        name: 'Slawo',
        role: 'Marketing Manager AI',
        status: 'Monitoring Ads',
        image: '/assets/slawo.png'
    },
    {
        id: 'mishil',
        name: 'Mishil',
        role: 'Revenue Manager AI',
        status: 'Analyzing Revenue',
        image: '/assets/mishil.png'
    },
    {
        id: 'shivani',
        name: 'Shivani',
        role: 'Product Manager AI',
        status: 'Checking Health',
        image: '/assets/shivani.png'
    }
];

const AIEmployees = ({ setActiveEmployee, setActiveNavItem }) => {
    const handleChat = (employeeId) => {
        setActiveEmployee?.(employeeId);
        setActiveNavItem?.('My Assistant');
    };

    const handleConfigure = () => {
        setActiveNavItem?.('Playbook');
    };

    return (
        <div className="ai-employees-container">
            <h2 className="ai-employees-title">AI Employees</h2>
            <p className="ai-employees-subtitle">Manage and collaborate with your specialized AI agent employees.</p>
            <div className="employees-grid">
                {EMPLOYEES.map((employee) => {
                    return (
                        <div key={employee.id} className="employee-card glass-panel">
                            <div className="employee-avatar-wrapper">
                                <img src={employee.image} alt={employee.name} className="employee-avatar" />
                            </div>
                            <div className="employee-info" style={{ marginBottom: '20px' }}>
                                <h4 className={`employee-name gradient-${employee.id}`}>{employee.name}</h4>
                                <p className="employee-role">{employee.role}</p>
                                <span className="employee-status-badge">{employee.status}</span>
                            </div>

                            <div className="employee-actions">
                                <button
                                    className="employee-action-btn config-btn"
                                    onClick={handleConfigure}
                                >
                                    <Settings size={16} />
                                    <span>Configure</span>
                                </button>
                                <button
                                    className="employee-action-btn chat-btn"
                                    onClick={() => handleChat(employee.id)}
                                >
                                    <MessageSquare size={16} />
                                    <span>Chat</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AIEmployees;