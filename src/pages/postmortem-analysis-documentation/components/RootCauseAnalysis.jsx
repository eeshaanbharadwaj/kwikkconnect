import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RootCauseAnalysis = ({ analysis }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Search" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Root Cause Analysis</h2>
      </div>
      
      <div className="space-y-4">
        {analysis.sections.map((section, index) => (
          <div key={index} className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  section.type === 'primary' ? 'bg-error/10 text-error' :
                  section.type === 'contributing'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={section.icon} size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                </div>
              </div>
              <Icon 
                name={expandedSections[index] ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSections[index] && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                  
                  {section.evidence && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Evidence:</h4>
                      <ul className="space-y-1">
                        {section.evidence.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.impact && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-foreground mb-1">Impact:</h4>
                      <p className="text-sm text-muted-foreground">{section.impact}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RootCauseAnalysis;