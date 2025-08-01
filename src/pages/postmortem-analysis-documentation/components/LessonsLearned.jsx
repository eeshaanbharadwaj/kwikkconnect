import React from 'react';
import Icon from 'components/AppIcon';

const LessonsLearned = ({ lessons }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'prevention': return 'text-success bg-success/10';
      case 'detection': return 'text-warning bg-warning/10';
      case 'response': return 'text-primary bg-primary/10';
      case 'recovery': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'prevention': return 'Shield';
      case 'detection': return 'Eye';
      case 'response': return 'Zap';
      case 'recovery': return 'RefreshCw';
      default: return 'Lightbulb';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="BookOpen" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Lessons Learned & Recommendations</h2>
      </div>
      
      <div className="space-y-6">
        {lessons.categories.map((category, index) => (
          <div key={index}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(category.type)}`}>
                <Icon name={getCategoryIcon(category.type)} size={16} />
              </div>
              <h3 className="text-lg font-medium text-foreground capitalize">{category.type}</h3>
            </div>
            
            <div className="space-y-3 ml-10">
              {category.items.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-muted ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </span>
                      {item.timeline && (
                        <span className="text-xs text-muted-foreground">{item.timeline}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>
                  
                  {item.actionItems && (
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Action Items:</h5>
                      <ul className="space-y-2">
                        {item.actionItems.map((action, actionIdx) => (
                          <li key={actionIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {item.owner && (
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={14} />
                        <span>Owner: {item.owner}</span>
                      </div>
                      {item.dueDate && (
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>Due: {item.dueDate}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
        <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
          <Icon name="Target" size={16} className="text-primary" />
          Overall Improvement Goal
        </h3>
        <p className="text-sm text-muted-foreground">
          {lessons.overallGoal}
        </p>
      </div>
    </div>
  );
};

export default LessonsLearned;