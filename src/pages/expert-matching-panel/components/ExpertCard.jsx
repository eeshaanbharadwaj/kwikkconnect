import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

const ExpertCard = ({ expert, onRequestExpert }) => {
  const getAvailabilityConfig = (status) => {
    switch (status) {
      case 'available':
        return { color: 'text-success', bg: 'bg-success/10', label: 'Available', icon: 'Circle' };
      case 'busy':
        return { color: 'text-warning', bg: 'bg-warning/10', label: 'Busy', icon: 'Clock' };
      case 'offline':
        return { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Offline', icon: 'Minus' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Unknown', icon: 'HelpCircle' };
    }
  };

  const availabilityConfig = getAvailabilityConfig(expert.availability);

  const getMatchPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-primary';
    if (percentage >= 50) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-shadow duration-200">
      {/* Expert Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={expert.avatar}
            alt={expert.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${availabilityConfig.bg} rounded-full flex items-center justify-center border-2 border-card`}>
            <Icon name={availabilityConfig.icon} size={10} className={availabilityConfig.color} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg mb-1">{expert.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{expert.title}</p>
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${availabilityConfig.bg} ${availabilityConfig.color}`}>
            <Icon name={availabilityConfig.icon} size={10} />
            <span>{availabilityConfig.label}</span>
          </div>
        </div>
      </div>

      {/* Match Percentage */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Skill Match</span>
          <span className={`text-sm font-bold ${getMatchPercentageColor(expert.matchPercentage)}`}>
            {expert.matchPercentage}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              expert.matchPercentage >= 90 ? 'bg-success' :
              expert.matchPercentage >= 70 ? 'bg-primary' :
              expert.matchPercentage >= 50 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${expert.matchPercentage}%` }}
          />
        </div>
      </div>

      {/* Success Rate */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Success Rate</span>
          <span className="text-sm font-medium text-foreground">{expert.successRate}%</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-2">Relevant Skills</h4>
        <div className="flex flex-wrap gap-2">
          {expert.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
          {expert.skills.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{expert.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{expert.casesResolved}</div>
          <div className="text-xs text-muted-foreground">Cases Resolved</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{expert.avgResponseTime}</div>
          <div className="text-xs text-muted-foreground">Avg Response</div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant={expert.availability === 'available' ? 'default' : 'outline'}
        fullWidth
        iconName="UserPlus"
        iconPosition="left"
        disabled={expert.availability === 'offline'}
        onClick={() => onRequestExpert(expert)}
      >
        {expert.availability === 'offline' ? 'Unavailable' : 'Request Expert'}
      </Button>
    </div>
  );
};

export default ExpertCard;