import React from 'react';
import Icon from 'components/AppIcon';

const MatchingCriteriaSidebar = ({ matchingData }) => {
  const getConfidenceColor = (score) => {
    if (score >= 0.9) return 'text-success';
    if (score >= 0.7) return 'text-primary';
    if (score >= 0.5) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceLabel = (score) => {
    if (score >= 0.9) return 'Very High';
    if (score >= 0.7) return 'High';
    if (score >= 0.5) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Brain" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">AI Matching</h3>
      </div>

      {/* Overall Confidence */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Confidence Score</span>
          <span className={`text-sm font-bold ${getConfidenceColor(matchingData.overallConfidence)}`}>
            {Math.round(matchingData.overallConfidence * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              matchingData.overallConfidence >= 0.9 ? 'bg-success' :
              matchingData.overallConfidence >= 0.7 ? 'bg-primary' :
              matchingData.overallConfidence >= 0.5 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${matchingData.overallConfidence * 100}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${getConfidenceColor(matchingData.overallConfidence)}`}>
          {getConfidenceLabel(matchingData.overallConfidence)} Confidence
        </span>
      </div>

      {/* Matching Criteria */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-semibold text-foreground">Matching Criteria</h4>
        
        {matchingData.criteria.map((criterion, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{criterion.name}</span>
              <span className="text-sm font-medium text-primary">{criterion.weight}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="h-1.5 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${criterion.weight}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Key Factors */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-semibold text-foreground">Key Factors</h4>
        <div className="space-y-3">
          {matchingData.keyFactors.map((factor, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={14} className="text-success mt-0.5 shrink-0" />
              <span className="text-sm text-foreground">{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Time */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Analysis completed in</span>
          <span className="font-medium">{matchingData.analysisTime}ms</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
          <span>Experts evaluated</span>
          <span className="font-medium">{matchingData.expertsEvaluated}</span>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6">
        <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200">
          <Icon name="RefreshCw" size={14} />
          <span>Refresh Analysis</span>
        </button>
      </div>
    </div>
  );
};

export default MatchingCriteriaSidebar;