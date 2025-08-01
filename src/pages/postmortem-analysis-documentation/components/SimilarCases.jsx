import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const SimilarCases = ({ similarCases }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success bg-success/10';
      case 'critical': return 'text-error bg-error/10';
      case 'urgent': return 'text-warning bg-warning/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleViewCase = (caseId) => {
    console.log(`Viewing case: ${caseId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="GitBranch" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Similar Past Cases</h2>
      </div>
      
      <div className="space-y-4">
        {similarCases.map((case_, index) => (
          <div key={case_.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-foreground">{case_.title}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                    {case_.status}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-accent">
                    <Icon name="Percent" size={14} />
                    <span>{case_.similarity}% match</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {case_.description}
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Case ID</p>
                    <p className="text-sm font-medium text-foreground">{case_.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Resolved</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(case_.resolvedDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Resolution Time</p>
                    <p className="text-sm font-medium text-foreground">{case_.resolutionTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Expert</p>
                    <p className="text-sm font-medium text-foreground">{case_.primaryExpert}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {case_.commonFactors.map((factor, idx) => (
                    <span key={idx} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => handleViewCase(case_.id)}
                >
                  View Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconPosition="left"
                >
                  Copy Solution
                </Button>
              </div>
            </div>
            
            {case_.keyLearning && (
              <div className="mt-4 p-3 bg-success/5 border-l-2 border-success rounded-r">
                <h4 className="font-medium text-foreground mb-1 flex items-center gap-2">
                  <Icon name="Lightbulb" size={14} className="text-success" />
                  Key Learning
                </h4>
                <p className="text-sm text-muted-foreground">{case_.keyLearning}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="outline" size="sm" iconName="Search" iconPosition="left">
          Search More Similar Cases
        </Button>
      </div>
    </div>
  );
};

export default SimilarCases;