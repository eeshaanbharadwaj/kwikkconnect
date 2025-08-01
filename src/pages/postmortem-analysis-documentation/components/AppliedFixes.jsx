import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AppliedFixes = ({ fixes }) => {
  const [expandedFix, setExpandedFix] = useState(null);

  const toggleFix = (fixId) => {
    setExpandedFix(expandedFix === fixId ? null : fixId);
  };

  const getFixStatusColor = (status) => {
    switch (status) {
      case 'successful': return 'text-success bg-success/10';
      case 'partial': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getFixTypeIcon = (type) => {
    switch (type) {
      case 'configuration': return 'Settings';
      case 'code': return 'Code';
      case 'infrastructure': return 'Server';
      case 'database': return 'Database';
      case 'network': return 'Wifi';
      default: return 'Wrench';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Wrench" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Applied Fixes & Solutions</h2>
      </div>
      
      <div className="space-y-4">
        {fixes.map((fix, index) => (
          <div key={fix.id} className="border border-border rounded-lg">
            <button
              onClick={() => toggleFix(fix.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFixStatusColor(fix.status)}`}>
                  <Icon name={getFixTypeIcon(fix.type)} size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{fix.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">{fix.type}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getFixStatusColor(fix.status)}`}>
                      {fix.status}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{fix.appliedBy}</span>
                  </div>
                </div>
              </div>
              <Icon 
                name={expandedFix === fix.id ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedFix === fix.id && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Description:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {fix.description}
                    </p>
                  </div>
                  
                  {fix.steps && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Implementation Steps:</h4>
                      <ol className="space-y-2">
                        {fix.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  
                  {fix.codeChanges && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Code Changes:</h4>
                      <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                        <pre className="text-muted-foreground whitespace-pre-wrap">{fix.codeChanges}</pre>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <h5 className="font-medium text-foreground mb-1">Applied At</h5>
                      <p className="text-sm text-muted-foreground">{fix.timestamp}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <h5 className="font-medium text-foreground mb-1">Validation</h5>
                      <p className="text-sm text-muted-foreground">{fix.validation}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <h5 className="font-medium text-foreground mb-1">Impact</h5>
                      <p className="text-sm text-muted-foreground">{fix.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedFixes;