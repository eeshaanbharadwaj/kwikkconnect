import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const PostmortemSidebar = ({ onShare, onExport, caseData }) => {
  const quickActions = [
    {
      label: 'Share Postmortem',
      icon: 'Share',
      action: onShare,
      variant: 'default'
    },
    {
      label: 'Export PDF',
      icon: 'Download',
      action: onExport,
      variant: 'outline'
    },
    {
      label: 'Add to Knowledge Base',
      icon: 'BookOpen',
      action: () => console.log('Add to knowledge base'),
      variant: 'outline'
    },
    {
      label: 'Create Follow-up',
      icon: 'Plus',
      action: () => console.log('Create follow-up'),
      variant: 'outline'
    }
  ];

  const relatedLinks = [
    {
      label: 'View Original Case',
      icon: 'ExternalLink',
      href: `/case/${caseData.id}`
    },
    {
      label: 'Expert Profiles',
      icon: 'Users',
      href: '/experts'
    },
    {
      label: 'Similar Cases',
      icon: 'GitBranch',
      href: '/cases/similar'
    },
    {
      label: 'Knowledge Base',
      icon: 'BookOpen',
      href: '/knowledge-base'
    }
  ];

  const caseMetrics = [
    {
      label: 'Resolution Time',
      value: `${Math.floor(caseData.resolutionTime / 60)}h ${caseData.resolutionTime % 60}m`,
      icon: 'Clock'
    },
    {
      label: 'Experts Involved',
      value: caseData.expertsCount,
      icon: 'Users'
    },
    {
      label: 'Messages Exchanged',
      value: '127',
      icon: 'MessageSquare'
    },
    {
      label: 'Fixes Applied',
      value: '3',
      icon: 'Wrench'
    }
  ];

  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-32 space-y-6">
        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                iconName={action.icon}
                iconPosition="left"
                onClick={action.action}
                fullWidth
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Case Metrics */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Case Metrics</h3>
          <div className="space-y-3">
            {caseMetrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={metric.icon} size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Related Links */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Related</h3>
          <div className="space-y-2">
            {relatedLinks.map((link, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <Icon name={link.icon} size={16} />
                <span>{link.label}</span>
                <Icon name="ExternalLink" size={12} className="ml-auto" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Version Info */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Document Info</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Version:</span>
              <span className="font-medium">1.0</span>
            </div>
            <div className="flex justify-between">
              <span>Created:</span>
              <span className="font-medium">Dec 19, 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span className="font-medium">Dec 19, 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-medium text-success">Final</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PostmortemSidebar;