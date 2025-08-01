import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ParticipantsPanel = ({ caseDetails }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const participants = [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Database Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      status: "online",
      isTyping: false,
      lastSeen: null
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "System Administrator",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      status: "online",
      isTyping: true,
      lastSeen: null
    },
    {
      id: 3,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      status: "online",
      isTyping: false,
      lastSeen: null
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      status: "away",
      isTyping: false,
      lastSeen: "2 min ago"
    },
    {
      id: 5,
      name: "Alex Thompson",
      role: "Security Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      status: "offline",
      isTyping: false,
      lastSeen: "1 hour ago"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'offline':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Participants</h3>
            <p className="text-sm text-muted-foreground">
              {participants.filter(p => p.status === 'online').length} online
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md hover:bg-muted transition-colors duration-200"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
        </div>
      </div>

      {/* Participants List */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {participant.avatar ? (
                    <img src={participant.avatar} alt={participant.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                  )}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(participant.status)}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground truncate">{participant.name}</p>
                  {participant.isTyping && (
                    <span className="text-xs text-muted-foreground animate-pulse">typing...</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{participant.role}</p>
                {participant.lastSeen && (
                  <p className="text-xs text-muted-foreground">{participant.lastSeen}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
          <Icon name="UserPlus" size={16} />
          <span>Invite Expert</span>
        </button>
      </div>
    </div>
  );
};

export default ParticipantsPanel;