import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CaseTimelinePanel = ({ caseDetails }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const timelineEvents = [
    {
      id: 1,
      type: 'case_created',
      title: 'Case Created',
      description: 'Database connection timeout issue reported',
      timestamp: new Date('2025-01-19T08:30:00'),
      user: 'Sarah Chen',
      severity: 'high',
      icon: 'AlertCircle'
    },
    {
      id: 2,
      type: 'expert_assigned',
      title: 'Expert Assigned',
      description: 'Michael Rodriguez assigned as database expert',
      timestamp: new Date('2025-01-19T08:45:00'),
      user: 'System',
      severity: 'medium',
      icon: 'UserCheck'
    },
    {
      id: 3,
      type: 'analysis_started',
      title: 'Analysis Started',
      description: 'Initial investigation of connection pool status',
      timestamp: new Date('2025-01-19T09:00:00'),
      user: 'Michael Rodriguez',
      severity: 'medium',
      icon: 'Search'
    },
    {
      id: 4,
      type: 'fix_applied',
      title: 'Quick Fix Applied',
      description: 'Increased max_connections from 15 to 25',
      timestamp: new Date('2025-01-19T09:15:00'),
      user: 'Michael Rodriguez',
      severity: 'low',
      icon: 'Zap'
    },
    {
      id: 5,
      type: 'monitoring_added',
      title: 'Monitoring Enabled',
      description: 'Real-time connection monitoring implemented',
      timestamp: new Date('2025-01-19T09:30:00'),
      user: 'Sarah Chen',
      severity: 'low',
      icon: 'Activity'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Events', icon: 'List' },
    { key: 'case_created', label: 'Case Events', icon: 'AlertCircle' },
    { key: 'expert_assigned', label: 'Expert Events', icon: 'UserCheck' },
    { key: 'analysis_started', label: 'Analysis', icon: 'Search' },
    { key: 'fix_applied', label: 'Fixes', icon: 'Zap' },
    { key: 'monitoring_added', label: 'Monitoring', icon: 'Activity' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-destructive';
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10';
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      case 'low':
        return 'bg-success/10';
      default:
        return 'bg-muted';
    }
  };

  const filteredEvents = timelineEvents.filter(event => 
    activeFilter === 'all' || event.type === activeFilter
  );

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Timeline</h3>
          <span className="text-sm text-muted-foreground">
            {filteredEvents.length} events
          </span>
        </div>
        
        {/* Filters */}
        <div className="flex space-x-1 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                activeFilter === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={filter.icon} size={12} />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Events */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="flex space-x-3">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getSeverityBg(event.severity)}`}>
                  <Icon name={event.icon} size={16} className={getSeverityColor(event.severity)} />
                </div>
                {index < filteredEvents.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mt-2"></div>
                )}
              </div>
              
              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                  <span className="text-xs text-muted-foreground">{formatTime(event.timestamp)}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">by {event.user}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBg(event.severity)} ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseTimelinePanel;