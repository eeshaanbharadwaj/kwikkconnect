import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { geminiService } from 'utils/geminiService';

const CaseSummaryPanel = ({ caseDetails }) => {
  const [aiSummary, setAiSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expertRecommendations, setExpertRecommendations] = useState(null);

  useEffect(() => {
    if (caseDetails) {
      generateCaseAnalysis();
    }
  }, [caseDetails]);

  const generateCaseAnalysis = async () => {
    setIsGenerating(true);
    try {
      // Generate both summary and expert recommendations
      const [summary, analysis] = await Promise.all([
        geminiService.generateCaseSummary(caseDetails),
        geminiService.analyzeCase(caseDetails)
      ]);
      
      setAiSummary(summary);
      setExpertRecommendations(analysis);
    } catch (error) {
      console.error('Error generating case analysis:', error);
      setAiSummary('Technical analysis unavailable. Please review case details manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefreshAnalysis = () => {
    generateCaseAnalysis();
  };

  if (!caseDetails) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center text-muted-foreground">
          <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No case selected for analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Case Analysis</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <Icon name="Bot" size={12} className="mr-1" />
            AI-powered technical summary
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshAnalysis}
          disabled={isGenerating}
          iconName="RefreshCw"
        >
          Refresh
        </Button>
      </div>

      {/* Case Basic Info */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Case ID</label>
            <p className="text-sm font-mono text-foreground">{caseDetails.id}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                caseDetails.status === 'expert-assigned' ? 'bg-accent' :
                caseDetails.status === 'in-progress' ? 'bg-primary' :
                caseDetails.status === 'resolved' ? 'bg-success' : 'bg-destructive'
              }`}></div>
              <span className="text-sm text-foreground capitalize">{caseDetails.status?.replace('-', ' ')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Module</label>
            <p className="text-sm text-foreground">{caseDetails.module}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Severity</label>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              caseDetails.severity === 'critical' ? 'bg-destructive/10 text-destructive' :
              caseDetails.severity === 'high' ? 'bg-accent/10 text-accent' :
              caseDetails.severity === 'medium'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}>
              {caseDetails.severity}
            </span>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            AI Technical Summary
          </label>
          {isGenerating ? (
            <div className="flex items-center space-x-2 text-muted-foreground py-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Analyzing case details...</span>
            </div>
          ) : (
            <div className="bg-background border border-border rounded p-3">
              <p className="text-sm text-foreground whitespace-pre-wrap">{aiSummary}</p>
            </div>
          )}
        </div>

        {/* Expert Recommendations */}
        {expertRecommendations && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Recommended Expertise
            </label>
            <div className="space-y-2">
              {expertRecommendations.expertiseAreas?.map((area, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="text-sm text-foreground">{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Troubleshooting Steps */}
        {expertRecommendations?.troubleshootingSteps && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Suggested Next Steps
            </label>
            <div className="space-y-1">
              {expertRecommendations.troubleshootingSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-xs text-muted-foreground mt-0.5">{index + 1}.</span>
                  <span className="text-sm text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Urgency Assessment */}
        {expertRecommendations?.urgencyLevel && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              AI Urgency Assessment
            </label>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                expertRecommendations.urgencyLevel === 'high' ? 'bg-destructive' :
                expertRecommendations.urgencyLevel === 'medium'? 'bg-accent' : 'bg-success'
              }`}></div>
              <span className="text-sm text-foreground capitalize">
                {expertRecommendations.urgencyLevel} Priority
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Case Description */}
      <div className="mt-6 pt-6 border-t border-border">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Case Description
        </label>
        <p className="text-sm text-foreground leading-relaxed">{caseDetails.description}</p>
      </div>
    </div>
  );
};

export default CaseSummaryPanel;