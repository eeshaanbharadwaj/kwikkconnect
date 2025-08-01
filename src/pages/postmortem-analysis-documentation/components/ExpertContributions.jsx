import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ExpertContributions = ({ experts }) => {
  const getContributionColor = (type) => {
    switch (type) {
      case 'diagnosis': return 'text-primary bg-primary/10';
      case 'solution': return 'text-success bg-success/10';
      case 'escalation': return 'text-warning bg-warning/10';
      case 'validation': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getContributionIcon = (type) => {
    switch (type) {
      case 'diagnosis': return 'Stethoscope';
      case 'solution': return 'Lightbulb';
      case 'escalation': return 'ArrowUp';
      case 'validation': return 'CheckCircle';
      default: return 'MessageSquare';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Users" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Expert Contributions</h2>
      </div>
      
      <div className="space-y-6">
        {experts.map((expert, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <Image
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">{expert.role} • {expert.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{expert.timeInvolved}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="MessageSquare" size={14} />
                      <span>{expert.messagesCount} messages</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {expert.contributions.map((contribution, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getContributionColor(contribution.type)}`}>
                          <Icon name={getContributionIcon(contribution.type)} size={12} />
                        </div>
                        <span className="text-sm font-medium text-foreground capitalize">{contribution.type}</span>
                        <span className="text-xs text-muted-foreground">• {contribution.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {contribution.description}
                      </p>
                      {contribution.impact && (
                        <div className="mt-2 p-2 bg-success/5 border-l-2 border-success rounded-r">
                          <p className="text-xs text-success font-medium">Impact: {contribution.impact}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-accent" />
                    <span>Expertise Score: {expert.expertiseScore}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} className="text-success" />
                    <span>Response Time: {expert.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertContributions;