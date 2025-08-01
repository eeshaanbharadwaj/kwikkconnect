import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { Checkbox } from 'components/ui/Checkbox';

const SharePostmortemModal = ({ isOpen, onClose, caseData }) => {
  const [shareOptions, setShareOptions] = useState({
    includeTimeline: true,
    includeExpertDetails: true,
    includeTechnicalDetails: true,
    includeRecommendations: true
  });
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const [shareMethod, setShareMethod] = useState('email');

  const handleShare = () => {
    console.log('Sharing postmortem with options:', shareOptions);
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://kwikkconnect.com/postmortem/${caseData.id}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1300 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-floating w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Share Postmortem</h2>
            <p className="text-sm text-muted-foreground">Share case analysis and documentation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Share Method */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Share Method</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'email', label: 'Email', icon: 'Mail' },
                { id: 'link', label: 'Copy Link', icon: 'Link' },
                { id: 'export', label: 'Export PDF', icon: 'Download' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setShareMethod(method.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors duration-200 ${
                    shareMethod === method.id
                      ? 'border-primary bg-primary/5 text-primary' :'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon name={method.icon} size={20} />
                  <span className="text-sm font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Recipients (for email) */}
          {shareMethod === 'email' && (
            <div>
              <Input
                label="Recipients"
                type="email"
                placeholder="Enter email addresses separated by commas"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                description="Add team members, stakeholders, or other relevant parties"
              />
            </div>
          )}
          
          {/* Share Options */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Include in Share</h3>
            <div className="space-y-3">
              <Checkbox
                label="Timeline of Events"
                description="Complete chronological sequence of incident events"
                checked={shareOptions.includeTimeline}
                onChange={(e) => setShareOptions(prev => ({ ...prev, includeTimeline: e.target.checked }))}
              />
              <Checkbox
                label="Expert Contributions"
                description="Details about expert involvement and contributions"
                checked={shareOptions.includeExpertDetails}
                onChange={(e) => setShareOptions(prev => ({ ...prev, includeExpertDetails: e.target.checked }))}
              />
              <Checkbox
                label="Technical Details"
                description="Root cause analysis and technical implementation details"
                checked={shareOptions.includeTechnicalDetails}
                onChange={(e) => setShareOptions(prev => ({ ...prev, includeTechnicalDetails: e.target.checked }))}
              />
              <Checkbox
                label="Recommendations"
                description="Lessons learned and improvement recommendations"
                checked={shareOptions.includeRecommendations}
                onChange={(e) => setShareOptions(prev => ({ ...prev, includeRecommendations: e.target.checked }))}
              />
            </div>
          </div>
          
          {/* Message */}
          {shareMethod === 'email' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal message to accompany the postmortem..."
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                rows="4"
              />
            </div>
          )}
          
          {/* Preview Card */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <h4 className="font-medium text-foreground mb-2">Preview</h4>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={16} color="white" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground">{caseData.title}</h5>
                  <p className="text-sm text-muted-foreground">Postmortem Analysis • {caseData.id}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Incident resolved in {Math.floor(caseData.resolutionTime / 60)}h {caseData.resolutionTime % 60}m with {caseData.expertsCount} experts involved.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {shareMethod === 'link' && (
              <Button variant="outline" onClick={handleCopyLink} iconName="Copy" iconPosition="left">
                Copy Link
              </Button>
            )}
            <Button onClick={handleShare} iconName="Share" iconPosition="left">
              {shareMethod === 'email' ? 'Send Email' : shareMethod === 'export' ? 'Export PDF' : 'Share'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePostmortemModal;