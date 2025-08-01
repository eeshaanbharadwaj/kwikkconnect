import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from 'components/ui/NavigationHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';
import CaseFormModal from './components/CaseFormModal';
import CaseCreationSuccess from './components/CaseCreationSuccess';
import QuickCaseTemplates from './components/QuickCaseTemplates';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CreateNewCaseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdCaseId, setCreatedCaseId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Open modal automatically when navigating to this route
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Navigate back to dashboard when modal is closed
    navigate('/dashboard-case-management-overview');
  };

  const handleCaseCreated = (caseId) => {
    setCreatedCaseId(caseId);
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/dashboard-case-management-overview');
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCreateFromScratch = () => {
    setSelectedTemplate(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbNavigation />
      
      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Plus" size={32} color="white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Case</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Report an incident and get connected with AI-matched experts for rapid resolution
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button
              onClick={handleCreateFromScratch}
              iconName="Edit"
              iconPosition="left"
              size="lg"
            >
              Create from Scratch
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard-case-management-overview')}
              iconName="ArrowLeft"
              iconPosition="left"
              size="lg"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Quick Templates Section */}
          <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
            <QuickCaseTemplates onSelectTemplate={handleSelectTemplate} />
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-muted/50 rounded-lg p-6 lg:p-8">
            <div className="text-center">
              <Icon name="HelpCircle" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Our AI assistant can help you create a detailed case report or answer questions about the incident reporting process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  iconName="MessageSquare"
                  iconPosition="left"
                  onClick={() => {
                    // This would trigger the floating AI assistant
                    document.querySelector('[data-ai-assistant]')?.click();
                  }}
                >
                  Chat with AI Assistant
                </Button>
                <Button
                  variant="ghost"
                  iconName="FileText"
                  iconPosition="left"
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Clock" size={24} className="text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Average Resolution</h4>
              <p className="text-2xl font-bold text-success">2.4 hours</p>
              <p className="text-sm text-muted-foreground">With AI matching</p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Expert Network</h4>
              <p className="text-2xl font-bold text-primary">150+</p>
              <p className="text-sm text-muted-foreground">Available experts</p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="TrendingUp" size={24} className="text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Success Rate</h4>
              <p className="text-2xl font-bold text-accent">94%</p>
              <p className="text-sm text-muted-foreground">First-time resolution</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CaseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCaseCreated={handleCaseCreated}
        initialData={selectedTemplate}
      />

      <CaseCreationSuccess
        isOpen={isSuccessModalOpen}
        caseId={createdCaseId}
        onClose={handleCloseSuccessModal}
      />

      <FloatingAIAssistant />
    </div>
  );
};

export default CreateNewCaseForm;