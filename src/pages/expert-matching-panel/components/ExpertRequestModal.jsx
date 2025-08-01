import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const ExpertRequestModal = ({ expert, caseData, isOpen, onClose, onConfirmRequest }) => {
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onConfirmRequest({
      expertId: expert.id,
      message,
      urgency,
      caseId: caseData.id
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const getUrgencyConfig = (level) => {
    switch (level) {
      case 'urgent':
        return { color: 'text-error', bg: 'bg-error/10', label: 'Urgent' };
      case 'high':
        return { color: 'text-warning', bg: 'bg-warning/10', label: 'High Priority' };
      case 'normal':
        return { color: 'text-primary', bg: 'bg-primary/10', label: 'Normal' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Normal' };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1300 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-floating w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="UserPlus" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Request Expert</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Expert Info */}
          <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
            <Image
              src={expert.avatar}
              alt={expert.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">{expert.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{expert.title}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-primary font-medium">{expert.matchPercentage}% match</span>
                <span className="text-muted-foreground">{expert.successRate}% success rate</span>
              </div>
            </div>
          </div>

          {/* Case Context */}
          <div className="p-4 bg-primary/5 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Case Context</h4>
            <div className="space-y-1 text-sm">
              <div><span className="text-muted-foreground">Case ID:</span> <span className="font-medium">{caseData.id}</span></div>
              <div><span className="text-muted-foreground">Title:</span> <span className="font-medium">{caseData.title}</span></div>
              <div><span className="text-muted-foreground">Module:</span> <span className="font-medium">{caseData.module}</span></div>
              <div><span className="text-muted-foreground">Severity:</span> <span className="font-medium capitalize">{caseData.severity}</span></div>
            </div>
          </div>

          {/* Request Form */}
          <div className="space-y-4">
            {/* Urgency Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Request Priority</label>
              <div className="grid grid-cols-3 gap-3">
                {['normal', 'high', 'urgent'].map((level) => {
                  const config = getUrgencyConfig(level);
                  return (
                    <button
                      key={level}
                      onClick={() => setUrgency(level)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        urgency === level
                          ? `border-primary ${config.bg} ${config.color}`
                          : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">{config.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <Input
                label="Additional Message (Optional)"
                type="text"
                placeholder="Provide any additional context or specific requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                description="This message will be sent to the expert along with the case details"
              />
            </div>
          </div>

          {/* Expected Response Time */}
          <div className="p-4 bg-success/5 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Expected Response Time</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {expert.name}'s availability and current workload, you can expect a response within{' '}
              <span className="font-medium text-success">{expert.avgResponseTime}</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
          >
            {isSubmitting ? 'Sending Request...' : 'Send Request'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpertRequestModal;