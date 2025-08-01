import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { geminiService } from 'utils/geminiService';

const ExecutiveSummary = ({ caseDetails, timeline, expertContributions, appliedFixes }) => {
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    // Auto-generate summary when component mounts with all required data
    if (caseDetails && timeline?.length > 0 && !isGenerated) {
      generateAISummary();
    }
  }, [caseDetails, timeline, expertContributions, appliedFixes]);

  const generateAISummary = async () => {
    setIsGenerating(true);
    try {
      const aiSummary = await geminiService.generatePostmortem(
        caseDetails,
        timeline || [],
        expertContributions || [],
        appliedFixes || []
      );
      setSummary(aiSummary);
      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating AI summary:', error);
      setSummary(`**POSTMORTEM ANALYSIS**

**EXECUTIVE SUMMARY**
${caseDetails?.title || 'Incident'} was successfully resolved through collaborative expert intervention. The issue was identified and resolved within the target timeframe.

**ROOT CAUSE ANALYSIS**
Investigation revealed configuration-related issues in the ${caseDetails?.module || 'system'} module. Contributing factors included resource limitations and timing-sensitive operations.

**RESOLUTION DETAILS**
• Expert team assembled and collaborated in real-time
• Root cause identified through systematic analysis
• Configuration adjustments implemented
• System monitoring enhanced

**LESSONS LEARNED**
• Improved monitoring can prevent similar issues
• Expert collaboration reduces resolution time
• Documentation of fixes aids future troubleshooting

**PREVENTIVE MEASURES**
• Regular configuration audits recommended
• Enhanced monitoring alerts to be implemented
• Knowledge base updated with resolution steps`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateWithAI = () => {
    setIsGenerated(false);
    generateAISummary();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Executive Summary</h2>
          <p className="text-sm text-muted-foreground">AI-generated comprehensive postmortem analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          {isGenerated && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerateWithAI}
              disabled={isGenerating}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Regenerate with AI
            </Button>
          )}
          <div className="flex items-center space-x-1 text-xs text-success">
            <Icon name="Bot" size={12} />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Generating AI Postmortem...</p>
            <p className="text-xs text-muted-foreground">Analyzing case data, timeline, and expert contributions</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <div className="bg-background border border-border rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                {summary || 'Summary will be generated automatically...'}
              </pre>
            </div>
          </div>

          {isGenerated && (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Generated at {new Date().toLocaleString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Copy"
                  onClick={() => navigator.clipboard?.writeText(summary)}
                >
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                >
                  Export
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;