import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const CaseContextSidebar = ({ caseId = "CASE-2024-001", caseTitle = "Database Connection Timeout", caseStatus = "in-progress" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const caseNavigationItems = [
    {
      label: 'Expert Matching',
      path: '/expert-matching-panel',
      icon: 'Users',
      description: 'Find and assign experts'
    },
    {
      label: 'Swarm Room',
      path: '/swarm-room-real-time-collaboration',
      icon: 'MessageSquare',
      description: 'Real-time collaboration',
      badge: '3 active'
    },
    {
      label: 'Timeline',
      path: '/case-timeline-activity-tracking',
      icon: 'Clock',
      description: 'Activity tracking'
    },
    {
      label: 'Postmortem',
      path: '/postmortem-analysis-documentation',
      icon: 'FileText',
      description: 'Analysis & documentation'
    }
  ];

  const statusConfig = {
    'in-progress': { color: 'text-primary', bg: 'bg-primary/10', label: 'In Progress' },
    'urgent': { color: 'text-warning', bg: 'bg-warning/10', label: 'Urgent' },
    'critical': { color: 'text-error', bg: 'bg-error/10', label: 'Critical' },
    'resolved': { color: 'text-success', bg: 'bg-success/10', label: 'Resolved' }
  };

  const currentStatus = statusConfig[caseStatus] || statusConfig['in-progress'];

  // Only show sidebar on case-specific pages
  const caseSpecificPaths = [
    '/expert-matching-panel',
    '/swarm-room-real-time-collaboration',
    '/case-timeline-activity-tracking',
    '/postmortem-analysis-documentation'
  ];

  if (!caseSpecificPaths.includes(location.pathname)) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-16 bottom-0 z-900 bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">CASE ID</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.color}`}>
                      {currentStatus.label}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground truncate">{caseId}</h3>
                  <p className="text-sm text-muted-foreground truncate mt-1">{caseTitle}</p>
                </div>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {caseNavigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 group ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={isActivePath(item.path) ? 'text-primary-foreground' : 'group-hover:text-primary transition-colors duration-200'}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isActivePath(item.path) 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-accent text-accent-foreground'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${
                      isActivePath(item.path) ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200">
                  <Icon name="Plus" size={16} />
                  <span>Add Note</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200">
                  <Icon name="Share" size={16} />
                  <span>Share Case</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-1100 bg-card border-t border-border">
        <div className="flex items-center justify-around p-2">
          {caseNavigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActivePath(item.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && (
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CaseContextSidebar;