import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from 'components/ui/NavigationHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import CaseContextSidebar from 'components/ui/CaseContextSidebar';
import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';
import ExpertCard from './components/ExpertCard';
import CaseSummaryPanel from './components/CaseSummaryPanel';
import MatchingCriteriaSidebar from './components/MatchingCriteriaSidebar';
import ExpertRequestModal from './components/ExpertRequestModal';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import expertMatchingService from 'utils/expertMatchingService';

const ExpertMatchingPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestedExperts, setRequestedExperts] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [expertsData, setExpertsData] = useState([]);
  const [matchingData, setMatchingData] = useState({});
  const [caseData, setCaseData] = useState(null);

  // Get case data from location state or use default
  useEffect(() => {
    const stateCaseData = location.state?.caseData;
    if (stateCaseData) {
      setCaseData(stateCaseData);
    } else {
      // Default case data for demonstration
      setCaseData({
        id: "CASE-2024-001",
        title: "Database Connection Timeout",
        description: `Production database experiencing intermittent connection timeouts affecting user authentication and data retrieval operations. Error logs show connection pool exhaustion during peak hours. Issue started approximately 2 hours ago and is impacting 15% of user sessions.

The problem appears to be related to recent configuration changes made to the database connection pool settings. Users are experiencing 30-60 second delays when logging in, and some transactions are failing completely.`,
        module: "Database Management",
        severity: "high",
        createdAt: "Jul 19, 2025 08:45 AM",
        reporter: "Sarah Johnson",
        affectedSystems: ["Auth Service", "User Database", "Session Manager", "API Gateway"],
        errorDetails: "Connection timeout: Unable to establish connection to database server within 30 seconds. Pool size: 50/50 active connections."
      });
    }
  }, [location.state]);

  // Perform expert matching when case data is available
  useEffect(() => {
    if (caseData) {
      performExpertMatching();
    }
  }, [caseData]);

  const performExpertMatching = async () => {
    setIsLoading(true);
    
    try {
      // Add case to history for similarity analysis
      expertMatchingService.addCaseToHistory(caseData);
      
      // Perform real expert matching
      const matchingResult = await expertMatchingService.matchExperts(caseData);
      
      // Transform experts data for display
      const transformedExperts = matchingResult.experts.map(expert => ({
        ...expert,
        skills: expert.skills.map(skill => skill.name).slice(0, 6), // Show top 6 skills
        avgResponseTime: `${expert.avgResponseTime} min`
      }));
      
      setExpertsData(transformedExperts);
      setMatchingData(matchingResult);
      
    } catch (error) {
      console.error('Error performing expert matching:', error);
      // Fallback to default data if matching fails
      setExpertsData([]);
      setMatchingData({
        overallConfidence: 0,
        analysisTime: 0,
        expertsEvaluated: 0,
        criteria: [],
        keyFactors: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestExpert = (expert) => {
    setSelectedExpert(expert);
    setIsRequestModalOpen(true);
  };

  const handleConfirmRequest = (requestData) => {
    setRequestedExperts(prev => new Set([...prev, requestData.expertId]));
    setIsRequestModalOpen(false);
    setSelectedExpert(null);
    
    // Update expert availability
    expertMatchingService.updateExpertAvailability(requestData.expertId, 'busy');
    
    // Navigate to swarm room after successful request
    setTimeout(() => {
      navigate('/swarm-room-real-time-collaboration', {
        state: {
          caseData,
          selectedExpert: expertMatchingService.getExpertById(requestData.expertId)
        }
      });
    }, 1000);
  };

  const handleEscalateToAll = () => {
    const availableExperts = expertsData.filter(expert => expert.availability === 'available');
    availableExperts.forEach(expert => {
      setRequestedExperts(prev => new Set([...prev, expert.id]));
      expertMatchingService.updateExpertAvailability(expert.id, 'busy');
    });
    
    // Navigate to swarm room
    setTimeout(() => {
      navigate('/swarm-room-real-time-collaboration', {
        state: {
          caseData,
          escalatedExperts: availableExperts
        }
      });
    }, 1000);
  };

  const handleRefreshMatching = () => {
    performExpertMatching();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <BreadcrumbNavigation caseId={caseData?.id} caseName={caseData?.title} />
        <CaseContextSidebar caseId={caseData?.id} caseTitle={caseData?.title} caseStatus="in-progress" />
        
        <main className="lg:ml-80 pt-32 lg:pt-24 pb-20 lg:pb-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Brain" size={32} className="text-primary animate-pulse" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">AI Matching in Progress</h2>
                <p className="text-muted-foreground mb-4">Analyzing expert profiles and matching skills...</p>
                <div className="w-64 bg-muted rounded-full h-2 mx-auto">
                  <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <FloatingAIAssistant />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <main className="pt-32 lg:pt-24 pb-20 lg:pb-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No Case Data</h2>
                <p className="text-muted-foreground">Please create a case first to perform expert matching.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbNavigation caseId={caseData.id} caseName={caseData.title} />
      <CaseContextSidebar caseId={caseData.id} caseTitle={caseData.title} caseStatus="in-progress" />
      
      <main className="lg:ml-80 pt-32 lg:pt-24 pb-20 lg:pb-6">
        <div className="px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Expert Matching</h1>
                <p className="text-muted-foreground">AI-powered expert recommendations for your case</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={handleRefreshMatching}
                >
                  Refresh
                </Button>
                <Button
                  variant="destructive"
                  iconName="Zap"
                  iconPosition="left"
                  onClick={handleEscalateToAll}
                  disabled={expertsData.filter(expert => expert.availability === 'available').length === 0}
                >
                  Escalate to All
                </Button>
              </div>
            </div>
            
            {/* AI Confidence Banner */}
            {matchingData.overallConfidence > 0 && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    High confidence match found ({Math.round(matchingData.overallConfidence * 100)}% accuracy)
                  </span>
                  <span className="text-xs text-success/70">• Analysis completed in {matchingData.analysisTime}ms</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Expert Cards */}
            <div className="xl:col-span-3">
              {expertsData.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {expertsData.map((expert) => (
                    <ExpertCard
                      key={expert.id}
                      expert={expert}
                      onRequestExpert={handleRequestExpert}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Qualified Experts Found</h3>
                  <p className="text-muted-foreground mb-4">No experts meet the minimum match criteria for this case.</p>
                  <Button
                    variant="outline"
                    onClick={handleRefreshMatching}
                  >
                    Retry Matching
                  </Button>
                </div>
              )}

              {/* Case Summary */}
              <CaseSummaryPanel caseData={caseData} />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <MatchingCriteriaSidebar matchingData={matchingData} />
            </div>
          </div>
        </div>
      </main>

      {/* Expert Request Modal */}
      <ExpertRequestModal
        expert={selectedExpert}
        caseData={caseData}
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setSelectedExpert(null);
        }}
        onConfirmRequest={handleConfirmRequest}
      />
      
      <FloatingAIAssistant />
    </div>
  );
};

export default ExpertMatchingPanel;