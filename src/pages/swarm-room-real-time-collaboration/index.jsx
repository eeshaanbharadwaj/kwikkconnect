import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import NavigationHeader from 'components/ui/NavigationHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';
import CaseContextSidebar from 'components/ui/CaseContextSidebar';
import ParticipantsPanel from './components/ParticipantsPanel';
import ChatInterface from './components/ChatInterface';
import CaseTimelinePanel from './components/CaseTimelinePanel';
import Icon from '../../components/AppIcon';


const SwarmRoomRealTimeCollaboration = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState('timeline');

  useEffect(() => {
    // Get case details from location state or search params
    if (location.state?.caseDetails) {
      setCaseDetails(location.state.caseDetails);
    } else {
      // Mock case details - in real app, fetch from API using caseId
      const caseId = searchParams.get('caseId') || 'CASE-2024-001';
      setCaseDetails({
        id: caseId,
        title: 'Database Connection Timeout',
        description: 'Users experiencing intermittent database connection timeouts during peak hours affecting order processing system.',
        module: 'Database',
        severity: 'high',
        status: 'expert-assigned',
        expertAccepted: true,
        createdAt: '2024-07-19T08:30:00Z',
        updatedAt: '2024-07-19T09:15:00Z'
      });
    }
  }, [location.state, searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbNavigation />
      
      <main className="flex h-screen pt-16">
        {/* Left Sidebar - Participants */}
        <div className="w-80 border-r border-border bg-card">
          <ParticipantsPanel caseDetails={caseDetails} />
        </div>

        {/* Center - Chat Interface */}
        <div className="flex-1 flex flex-col">
          <ChatInterface caseDetails={caseDetails} />
        </div>

        {/* Right Sidebar - Case Details & Timeline */}
        <div className={`${isRightPanelCollapsed ? 'w-12' : 'w-96'} border-l border-border bg-card transition-all duration-300 relative`}>
          <button
            onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
          >
            <Icon name={isRightPanelCollapsed ? 'ChevronLeft' : 'ChevronRight'} size={12} />
          </button>

          {!isRightPanelCollapsed && (
            <div className="flex flex-col h-full">
              {/* Tab Navigation */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveRightTab('timeline')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeRightTab === 'timeline' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveRightTab('context')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeRightTab === 'context' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Case Context
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
                {activeRightTab === 'timeline' && (
                  <CaseTimelinePanel caseDetails={caseDetails} />
                )}
                {activeRightTab === 'context' && (
                  <CaseContextSidebar caseDetails={caseDetails} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <FloatingAIAssistant />
    </div>
  );
};

export default SwarmRoomRealTimeCollaboration;