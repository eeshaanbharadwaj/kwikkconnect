import React from 'react';

import Button from 'components/ui/Button';

const PostmortemHeader = ({ caseData, onShare, onExport }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success bg-success/10';
      case 'critical': return 'text-error bg-error/10';
      case 'urgent': return 'text-warning bg-warning/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">{caseData.title}</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseData.status)}`}>
              {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{caseData.description}</p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Case ID</p>
              <p className="text-sm font-medium text-foreground">{caseData.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Resolution Time</p>
              <p className="text-sm font-medium text-foreground">{formatDuration(caseData.resolutionTime)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experts Involved</p>
              <p className="text-sm font-medium text-foreground">{caseData.expertsCount}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Impact Level</p>
              <p className="text-sm font-medium text-foreground">{caseData.impact}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export PDF
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Share"
            iconPosition="left"
            onClick={onShare}
          >
            Share Postmortem
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostmortemHeader;