import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CaseCreationSuccess = ({ isOpen, caseId, onClose }) => {
  const navigate = useNavigate();

  const handleViewCase = () => {
    navigate('/expert-matching-panel', { state: { caseId } });
    onClose();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard-case-management-overview');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1400 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Success Modal */}
      <div className="relative w-full max-w-md bg-card rounded-lg shadow-floating animate-scale-in">
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} color="white" />
          </div>

          {/* Success Message */}
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Case Created Successfully!
          </h3>
          <p className="text-muted-foreground mb-4">
            Your case has been created with ID: <span className="font-mono font-medium text-primary">{caseId}</span>
          </p>

          {/* AI Matching Status */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">AI Expert Matching in Progress</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Our AI is analyzing your case and finding the best experts to help resolve your issue.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleViewCase}
              iconName="Users"
              iconPosition="left"
              fullWidth
            >
              View Expert Matching
            </Button>
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              iconName="LayoutDashboard"
              iconPosition="left"
              fullWidth
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCreationSuccess;