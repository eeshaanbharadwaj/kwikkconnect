import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TimelineEntry = ({ entry, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActivityIcon = (type) => {
    const iconMap = {
      'case_created': 'Plus',
      'expert_assigned': 'UserPlus',
      'chat_message': 'MessageSquare',
      'fix_applied': 'Wrench',
      'status_change': 'RefreshCw',
      'escalation': 'ArrowUp',
      'resolution': 'CheckCircle',
      'note_added': 'FileText'
    };
    return iconMap[type] || 'Circle';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'case_created': 'text-primary',
      'expert_assigned': 'text-success',
      'chat_message': 'text-blue-500',
      'fix_applied': 'text-warning',
      'status_change': 'text-purple-500',
      'escalation': 'text-orange-500',
      'resolution': 'text-success',
      'note_added': 'text-gray-500'
    };
    return colorMap[type] || 'text-gray-400';
  };

  const getActivityBgColor = (type) => {
    const bgMap = {
      'case_created': 'bg-primary/10',
      'expert_assigned': 'bg-success/10',
      'chat_message': 'bg-blue-50',
      'fix_applied': 'bg-warning/10',
      'status_change': 'bg-purple-50',
      'escalation': 'bg-orange-50',
      'resolution': 'bg-success/10',
      'note_added': 'bg-gray-50'
    };
    return bgMap[type] || 'bg-gray-50';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString()
    };
  };

  const timeInfo = formatTime(entry.timestamp);

  return (
    <div className="relative flex items-start space-x-4 pb-8">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-border"></div>
      )}

      {/* Timeline Node */}
      <div className={`relative z-10 w-12 h-12 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${getActivityBgColor(entry.type)}`}>
        <Icon 
          name={getActivityIcon(entry.type)} 
          size={20} 
          className={getActivityColor(entry.type)}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{entry.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{entry.description}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground ml-4">
              <div className="font-medium">{timeInfo.time}</div>
              <div>{timeInfo.date}</div>
            </div>
          </div>

          {/* Actor Info */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={12} color="white" />
            </div>
            <span className="text-sm font-medium text-foreground">{entry.actor}</span>
            {entry.role && (
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                {entry.role}
              </span>
            )}
          </div>

          {/* Additional Details */}
          {entry.details && (
            <div className="space-y-2">
              {entry.details.map((detail, index) => (
                <div key={index} className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  {detail}
                </div>
              ))}
            </div>
          )}

          {/* Expandable Content */}
          {entry.expandableContent && (
            <div className="mt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
              </button>
              
              {isExpanded && (
                <div className="mt-3 p-3 bg-muted rounded border-l-4 border-primary animate-fade-in">
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {entry.expandableContent}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reactions/Metrics */}
          {entry.metrics && (
            <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-border">
              {entry.metrics.map((metric, index) => (
                <div key={index} className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name={metric.icon} size={14} />
                  <span>{metric.value}</span>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEntry;