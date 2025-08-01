import React, { useState, useMemo, useEffect } from 'react';
import NavigationHeader from 'components/ui/NavigationHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';
import DashboardHeader from './components/DashboardHeader';
import QuickStats from './components/QuickStats';
import FilterBar from './components/FilterBar';
import CaseTable from './components/CaseTable';

const DashboardCaseManagementOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [selectedCases, setSelectedCases] = useState([]);

  // Initial mock case data
  const initialCases = [
    {
      id: 'CASE-2024-001',
      title: 'Database Connection Timeout',
      description: 'Users experiencing intermittent database connection timeouts during peak hours affecting order processing system.',
      status: 'expert-assigned',
      module: 'Database',
      severity: 'high',
      expertAccepted: true,
      createdAt: '2024-07-19T08:30:00Z',
      updatedAt: '2024-07-19T09:15:00Z'
    },
    {
      id: 'CASE-2024-002',
      title: 'API Rate Limiting Issues',
      description: 'Third-party API calls are being rate limited causing payment processing delays.',
      status: 'in-progress',
      module: 'API',
      severity: 'critical',
      expertAccepted: false,
      createdAt: '2024-07-19T07:45:00Z',
      updatedAt: '2024-07-19T08:20:00Z'
    },
    {
      id: 'CASE-2024-003',
      title: 'Frontend Performance Degradation',
      description: 'Page load times have increased significantly on the main dashboard affecting user experience.',
      status: 'open',
      module: 'Frontend',
      severity: 'medium',
      expertAccepted: false,
      createdAt: '2024-07-19T06:15:00Z',
      updatedAt: '2024-07-19T06:15:00Z'
    },
    {
      id: 'CASE-2024-004',
      title: 'Security Vulnerability in Authentication',
      description: 'Potential security vulnerability discovered in the user authentication module requiring immediate attention.',
      status: 'expert-assigned',
      module: 'Security',
      severity: 'critical',
      expertAccepted: true,
      createdAt: '2024-07-18T16:30:00Z',
      updatedAt: '2024-07-19T09:00:00Z'
    },
    {
      id: 'CASE-2024-005',
      title: 'Network Latency Spikes',
      description: 'Intermittent network latency spikes affecting real-time features and user notifications.',
      status: 'in-progress',
      module: 'Network',
      severity: 'high',
      expertAccepted: false,
      createdAt: '2024-07-18T14:20:00Z',
      updatedAt: '2024-07-19T08:45:00Z'
    },
    {
      id: 'CASE-2024-006',
      title: 'Application Memory Leak',
      description: 'Backend application showing signs of memory leak causing periodic crashes and service interruptions.',
      status: 'open',
      module: 'Backend',
      severity: 'high',
      expertAccepted: false,
      createdAt: '2024-07-18T12:10:00Z',
      updatedAt: '2024-07-18T12:10:00Z'
    },
    {
      id: 'CASE-2024-007',
      title: 'Infrastructure Scaling Issues',
      description: 'Auto-scaling policies not working correctly during traffic spikes leading to service degradation.',
      status: 'resolved',
      module: 'Infrastructure',
      severity: 'medium',
      expertAccepted: true,
      createdAt: '2024-07-17T10:30:00Z',
      updatedAt: '2024-07-19T07:20:00Z'
    },
    {
      id: 'CASE-2024-008',
      title: 'Data Synchronization Failure',
      description: 'Customer data not syncing properly between primary and backup databases causing inconsistencies.',
      status: 'expert-assigned',
      module: 'Database',
      severity: 'critical',
      expertAccepted: true,
      createdAt: '2024-07-17T09:15:00Z',
      updatedAt: '2024-07-19T08:30:00Z'
    },
    {
      id: 'CASE-2024-009',
      title: 'Mobile App Crash on iOS',
      description: 'iOS mobile application crashing on startup for users with iOS 17.5 and above.',
      status: 'in-progress',
      module: 'Application',
      severity: 'high',
      expertAccepted: false,
      createdAt: '2024-07-16T15:45:00Z',
      updatedAt: '2024-07-19T09:10:00Z'
    },
    {
      id: 'CASE-2024-010',
      title: 'Email Notification Delays',
      description: 'System-generated email notifications experiencing significant delays affecting user communication.',
      status: 'open',
      module: 'Backend',
      severity: 'low',
      expertAccepted: false,
      createdAt: '2024-07-16T11:20:00Z',
      updatedAt: '2024-07-16T11:20:00Z'
    }
  ];

  // State for cases that can be updated
  const [cases, setCases] = useState(initialCases);

  // Load cases from localStorage on component mount
  useEffect(() => {
    const savedCases = localStorage.getItem('kwikkconnect_cases');
    if (savedCases) {
      setCases(JSON.parse(savedCases));
    } else {
      // Save initial cases to localStorage
      localStorage.setItem('kwikkconnect_cases', JSON.stringify(initialCases));
    }
  }, []);

  // Save cases to localStorage whenever cases change
  useEffect(() => {
    localStorage.setItem('kwikkconnect_cases', JSON.stringify(cases));
  }, [cases]);

  // Function to add a new case
  const addNewCase = (newCase) => {
    setCases(prevCases => [newCase, ...prevCases]);
  };

  // Function to delete a case
  const deleteCase = (caseId) => {
    setCases(prevCases => prevCases.filter(c => c.id !== caseId));
    // Also remove from selected cases if it was selected
    setSelectedCases(prev => prev.filter(id => id !== caseId));
  };

  // Function to delete multiple cases
  const deleteSelectedCases = () => {
    setCases(prevCases => prevCases.filter(c => !selectedCases.includes(c.id)));
    setSelectedCases([]);
  };

  // Listen for new case creation from other components
  useEffect(() => {
    const handleNewCase = (event) => {
      if (event.detail && event.detail.type === 'NEW_CASE') {
        addNewCase(event.detail.case);
      }
    };

    window.addEventListener('newCaseCreated', handleNewCase);
    return () => window.removeEventListener('newCaseCreated', handleNewCase);
  }, []);

  // Listen for delete selected cases event
  useEffect(() => {
    const handleDeleteSelected = () => {
      deleteSelectedCases();
    };

    window.addEventListener('deleteSelectedCases', handleDeleteSelected);
    return () => window.removeEventListener('deleteSelectedCases', handleDeleteSelected);
  }, [selectedCases]);

  const filteredCases = useMemo(() => {
    return cases.filter(caseItem => {
      const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || caseItem.status === statusFilter;
      const matchesModule = !moduleFilter || caseItem.module === moduleFilter;
      const matchesSeverity = !severityFilter || caseItem.severity === severityFilter;
      
      return matchesSearch && matchesStatus && matchesModule && matchesSeverity;
    });
  }, [cases, searchTerm, statusFilter, moduleFilter, severityFilter]);

  const activeCases = cases.filter(c => ['open', 'in-progress', 'expert-assigned'].includes(c.status)).length;

  const handleCaseSelect = (caseId, isSelected) => {
    setSelectedCases(prev => 
      isSelected 
        ? [...prev, caseId]
        : prev.filter(id => id !== caseId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedCases(isSelected ? filteredCases.map(c => c.id) : []);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setModuleFilter('');
    setSeverityFilter('');
  };

  // Handler for QuickStats card click
  const handleQuickStatClick = (statLabel) => {
    switch (statLabel) {
      case 'Open Cases':
        setStatusFilter('open');
        setSeverityFilter('');
        break;
      case 'In Progress':
        setStatusFilter('in-progress');
        setSeverityFilter('');
        break;
      case 'Expert Assigned':
        setStatusFilter('expert-assigned');
        setSeverityFilter('');
        break;
      case 'Critical Issues':
        setSeverityFilter('critical');
        setStatusFilter('');
        break;
      case 'Resolved Today':
        setStatusFilter('resolved');
        setSeverityFilter('');
        break;
      case 'Total Cases':
        setStatusFilter('');
        setSeverityFilter('');
        break;
      default:
        setStatusFilter('');
        setSeverityFilter('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbNavigation />
      
      <main className="pt-16">
        <DashboardHeader 
          totalCases={cases.length}
          activeCases={activeCases}
          selectedCount={selectedCases.length}
        />
        
        <QuickStats cases={cases} onStatClick={handleQuickStatClick} />
        
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          moduleFilter={moduleFilter}
          onModuleChange={setModuleFilter}
          severityFilter={severityFilter}
          onSeverityChange={setSeverityFilter}
          onClearFilters={handleClearFilters}
          filteredCount={filteredCases.length}
          totalCount={cases.length}
        />
        
        <div className="px-4 lg:px-6 py-6">
          <CaseTable
            cases={cases}
            selectedCases={selectedCases}
            onCaseSelect={handleCaseSelect}
            onSelectAll={handleSelectAll}
            onDeleteCase={deleteCase}
            onDeleteSelectedCases={deleteSelectedCases}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            moduleFilter={moduleFilter}
            severityFilter={severityFilter}
          />
        </div>
      </main>

      <FloatingAIAssistant />
    </div>
  );
};

export default DashboardCaseManagementOverview;