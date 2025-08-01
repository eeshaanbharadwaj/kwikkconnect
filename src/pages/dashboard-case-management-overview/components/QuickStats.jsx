import React from 'react';
import Icon from 'components/AppIcon';

const QuickStats = ({ cases, onStatClick }) => {
  const stats = [
    {
      label: 'Total Cases',
      value: cases.length,
      icon: 'FileText',
      color: 'text-primary',
      bg: 'bg-primary/10',
      tooltip: 'All cases in the system.'
    },
    {
      label: 'Open Cases',
      value: cases.filter(c => c.status === 'open').length,
      icon: 'AlertCircle',
      color: 'text-warning',
      bg: 'bg-warning/10',
      tooltip: 'Cases that are currently open.'
    },
    {
      label: 'In Progress',
      value: cases.filter(c => c.status === 'in-progress').length,
      icon: 'Clock',
      color: 'text-accent',
      bg: 'bg-accent/10',
      tooltip: 'Cases being actively worked on.'
    },
    {
      label: 'Expert Assigned',
      value: cases.filter(c => c.status === 'expert-assigned').length,
      icon: 'Users',
      color: 'text-primary',
      bg: 'bg-primary/10',
      tooltip: 'Cases with an expert assigned.'
    },
    {
      label: 'Critical Issues',
      value: cases.filter(c => c.severity === 'critical').length,
      icon: 'AlertTriangle',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      tooltip: 'Cases marked as critical severity.'
    },
    {
      label: 'Resolved Today',
      value: cases.filter(c => {
        const today = new Date().toDateString();
        return c.status === 'resolved' && new Date(c.updatedAt).toDateString() === today;
      }).length,
      icon: 'CheckCircle',
      color: 'text-success',
      bg: 'bg-success/10',
      tooltip: 'Cases resolved today.'
    }
  ];

  const handleCardClick = (stat) => {
    if (onStatClick) onStatClick(stat.label);
  };

  const handleKeyDown = (e, stat) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(stat);
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <button
              key={index}
              className="group bg-background rounded-xl border border-border p-4 shadow-sm transition-all duration-200 transform hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary relative"
              onClick={() => handleCardClick(stat)}
              onKeyDown={e => handleKeyDown(e, stat)}
              tabIndex={0}
              title={stat.tooltip}
              type="button"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center transition-all duration-200 group-hover:scale-110`}>
                  <Icon name={stat.icon} size={24} className={stat.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">{stat.value}</p>
                  <p className="text-base text-muted-foreground truncate group-hover:text-foreground font-medium transition-colors duration-200">{stat.label}</p>
                </div>
              </div>
              {/* Tooltip (for accessibility, also use title attr) */}
              <span className="sr-only">{stat.tooltip}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;