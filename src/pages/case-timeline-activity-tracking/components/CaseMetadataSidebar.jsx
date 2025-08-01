import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CaseMetadataSidebar = ({ caseData, experts, relatedCases }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'in-progress': 'text-primary bg-primary/10',
      'urgent': 'text-warning bg-warning/10',
      'critical': 'text-error bg-error/10',
      'resolved': 'text-success bg-success/10'
    };
    return statusColors[status] || 'text-muted-foreground bg-muted';
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      'low': 'text-success',
      'medium': 'text-warning',
      'high': 'text-error',
      'critical': 'text-error'
    };
    return priorityColors[priority] || 'text-muted-foreground';
  };

  const formatDuration = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const diffMs = now - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours % 24}h`;
    }
    return `${diffHours}h ${Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))}m`;
  };

  return (
    <div className="space-y-6">
      {/* Case Overview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={18} className="mr-2" />
          Case Overview
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Case ID</label>
            <p className="text-sm font-medium text-foreground">{caseData.id}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseData.status)}`}>
              {caseData.status.replace('-', ' ').toUpperCase()}
            </div>
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Priority</label>
            <div className="flex items-center space-x-1">
              <Icon name="AlertTriangle" size={14} className={getPriorityColor(caseData.priority)} />
              <span className={`text-sm font-medium capitalize ${getPriorityColor(caseData.priority)}`}>
                {caseData.priority}
              </span>
            </div>
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Module</label>
            <p className="text-sm text-foreground">{caseData.module}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration</label>
            <p className="text-sm text-foreground">{formatDuration(caseData.createdAt)}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Created By</label>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={12} color="white" />
              </div>
              <span className="text-sm text-foreground">{caseData.createdBy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Involved Experts */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Users" size={18} className="mr-2" />
          Involved Experts
        </h3>
        
        <div className="space-y-3">
          {experts.map((expert) => (
            <div key={expert.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{expert.name}</p>
                  <p className="text-xs text-muted-foreground">{expert.role}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Icon name="MessageSquare" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{expert.contributions}</span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${expert.isOnline ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                  <span className="text-xs text-muted-foreground">
                    {expert.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Cases */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Link" size={18} className="mr-2" />
          Related Cases
        </h3>
        
        <div className="space-y-3">
          {relatedCases.map((relatedCase) => (
            <div key={relatedCase.id} className="p-3 border border-border rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{relatedCase.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{relatedCase.id}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(relatedCase.status)}`}>
                  {relatedCase.status}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{relatedCase.similarity}% similar</span>
                <span className="text-xs text-muted-foreground">{relatedCase.resolvedIn}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="ExternalLink"
          iconPosition="right"
          className="mt-3"
        >
          View All Related
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={18} className="mr-2" />
          Quick Actions
        </h3>
        
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Plus"
            iconPosition="left"
          >
            Add Note
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Share"
            iconPosition="left"
          >
            Share Timeline
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="AlertTriangle"
            iconPosition="left"
          >
            Escalate Case
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseMetadataSidebar;