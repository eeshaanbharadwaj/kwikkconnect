import React from 'react';
import Icon from 'components/AppIcon';

const TimelineVisualization = ({ timeline }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'incident': return 'AlertTriangle';
      case 'detection': return 'Eye';
      case 'escalation': return 'ArrowUp';
      case 'investigation': return 'Search';
      case 'fix': return 'Wrench';
      case 'resolution': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'incident': return 'text-error bg-error/10';
      case 'detection': return 'text-warning bg-warning/10';
      case 'escalation': return 'text-primary bg-primary/10';
      case 'investigation': return 'text-accent bg-accent/10';
      case 'fix': return 'text-success bg-success/10';
      case 'resolution': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Clock" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Timeline of Events</h2>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-6">
          {timeline.events.map((event, index) => (
            <div key={index} className="relative flex items-start gap-4">
              {/* Timeline dot */}
              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${getEventColor(event.type)}`}>
                <Icon name={getEventIcon(event.type)} size={20} />
              </div>
              
              {/* Event content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="font-medium text-foreground">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(event.timestamp)}</span>
                    <Icon name="Clock" size={14} />
                    <span>{formatTime(event.timestamp)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {event.description}
                </p>
                
                {event.details && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <h4 className="font-medium text-foreground mb-2">Details:</h4>
                    <ul className="space-y-1">
                      {event.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {event.actor && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="User" size={14} />
                    <span>By: {event.actor}</span>
                    {event.duration && (
                      <>
                        <Icon name="Timer" size={14} className="ml-2" />
                        <span>Duration: {event.duration}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;