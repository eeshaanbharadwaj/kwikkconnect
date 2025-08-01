import React, { useState, useEffect, useMemo } from 'react';
import NavigationHeader from 'components/ui/NavigationHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import CaseContextSidebar from 'components/ui/CaseContextSidebar';
import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';
import TimelineFilters from './components/TimelineFilters';
import TimelineContainer from './components/TimelineContainer';
import CaseMetadataSidebar from './components/CaseMetadataSidebar';

const CaseTimelineActivityTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    activityType: 'all',
    dateRange: 'all',
    startDate: '',
    endDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock case data
  const caseData = {
    id: "CASE-2024-001",
    title: "Database Connection Timeout",
    status: "in-progress",
    priority: "high",
    module: "Database Management",
    createdAt: "2024-07-19T08:30:00Z",
    createdBy: "Sarah Johnson"
  };

  // Mock experts data
  const expertsData = [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Database Expert",
      contributions: 12,
      isOnline: true
    },
    {
      id: 2,
      name: "Emily Chen",
      role: "System Administrator",
      contributions: 8,
      isOnline: true
    },
    {
      id: 3,
      name: "David Kumar",
      role: "DevOps Engineer",
      contributions: 5,
      isOnline: false
    }
  ];

  // Mock related cases
  const relatedCasesData = [
    {
      id: "CASE-2024-045",
      title: "Connection Pool Exhaustion",
      status: "resolved",
      similarity: 87,
      resolvedIn: "2h 15m"
    },
    {
      id: "CASE-2024-032",
      title: "Database Timeout Issues",
      status: "resolved",
      similarity: 73,
      resolvedIn: "4h 30m"
    },
    {
      id: "CASE-2024-018",
      title: "MySQL Performance Degradation",
      status: "resolved",
      similarity: 65,
      resolvedIn: "6h 45m"
    }
  ];

  // Mock timeline entries
  const timelineEntries = [
    {
      id: 1,
      type: "case_created",
      title: "Case Created",
      description: "New incident reported for database connection timeout",
      actor: "Sarah Johnson",
      role: "Reporter",
      timestamp: "2024-07-19T08:30:00Z",
      details: [
        "Initial severity: High",
        "Affected systems: Production database cluster",
        "Impact: 500+ users unable to access application"
      ]
    },
    {
      id: 2,
      type: "expert_assigned",
      title: "Expert Assigned",
      description: "Database expert Michael Rodriguez assigned to case",
      actor: "AI System",
      role: "Automated",
      timestamp: "2024-07-19T08:32:00Z",
      details: [
        "Match confidence: 94%",
        "Expertise: Database optimization, connection pooling",
        "Availability: Immediate"
      ],
      metrics: [
        { icon: "Target", value: "94%", label: "match" },
        { icon: "Clock", value: "2m", label: "response time" }
      ]
    },
    {
      id: 3,
      type: "chat_message",
      title: "Initial Analysis Started",
      description: "Expert began investigating connection timeout patterns",
      actor: "Michael Rodriguez",
      role: "Database Expert",
      timestamp: "2024-07-19T08:35:00Z",
      expandableContent: `Initial findings from connection analysis:\n\n1. Connection pool size: 50 (configured)\n2. Active connections: 48 (96% utilization)\n3. Average connection hold time: 15.3 seconds\n4. Timeout threshold: 10 seconds\n\nRecommendation: Increase pool size and optimize long-running queries.`
    },
    {
      id: 4,
      type: "expert_assigned",
      title: "Additional Expert Joined",
      description: "System Administrator Emily Chen joined the investigation",
      actor: "Michael Rodriguez",
      role: "Database Expert",
      timestamp: "2024-07-19T08:45:00Z",
      details: [
        "Requested for: System-level diagnostics",
        "Expertise: Server monitoring, resource optimization"
      ]
    },
    {
      id: 5,
      type: "fix_applied",
      title: "Connection Pool Optimization",
      description: "Applied temporary fix to increase connection pool size",
      actor: "Emily Chen",
      role: "System Administrator",
      timestamp: "2024-07-19T09:15:00Z",
      details: [
        "Pool size increased: 50 → 100",
        "Connection timeout: 10s → 20s",
        "Applied to: Production cluster nodes 1-3"
      ],
      expandableContent: `Configuration changes applied:\n\n# Database connection pool settings\nmax_connections = 100\nconnection_timeout = 20\npool_recycle = 3600\npool_pre_ping = true\n\n# Monitoring enabled for:\n- Connection utilization\n- Query execution time\n- Resource consumption`,
      metrics: [
        { icon: "TrendingUp", value: "85%", label: "improvement" },
        { icon: "Users", value: "500+", label: "users restored" }
      ]
    },
    {
      id: 6,
      type: "status_change",
      title: "Status Updated",
      description: "Case status changed from Critical to In Progress",
      actor: "Emily Chen",
      role: "System Administrator",
      timestamp: "2024-07-19T09:30:00Z",
      details: [
        "Previous status: Critical",
        "New status: In Progress",
        "Reason: Immediate issue resolved, monitoring ongoing"
      ]
    },
    {
      id: 7,
      type: "chat_message",
      title: "Root Cause Analysis",
      description: "Identified underlying cause of connection exhaustion",
      actor: "Michael Rodriguez",
      role: "Database Expert",
      timestamp: "2024-07-19T09:45:00Z",
      expandableContent: `Root cause analysis completed:\n\n**Primary Issue:**\nLong-running analytical queries were holding connections for extended periods, causing pool exhaustion during peak hours.\n\n**Contributing Factors:**\n1. Inefficient query patterns in reporting module\n2. Missing query timeouts\n3. Inadequate connection pool monitoring\n\n**Recommended Actions:**\n1. Implement query optimization for reporting\n2. Add dedicated read-only connection pool\n3. Set up proactive monitoring alerts`
    },
    {
      id: 8,
      type: "note_added",
      title: "Monitoring Setup",
      description: "Configured enhanced monitoring for database connections",
      actor: "David Kumar",
      role: "DevOps Engineer",
      timestamp: "2024-07-19T10:00:00Z",
      details: [
        "Grafana dashboard created",
        "Alert thresholds configured",
        "Slack notifications enabled"
      ]
    }
  ];

  // Filter timeline entries based on search and filters
  const filteredEntries = useMemo(() => {
    let filtered = [...timelineEntries];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(entry =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.actor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply activity type filter
    if (filters.activityType !== 'all') {
      filtered = filtered.filter(entry => entry.type === filters.activityType);
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        
        switch (filters.dateRange) {
          case 'today':
            return entryDate >= today;
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return entryDate >= yesterday && entryDate < today;
          case 'last_7_days':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return entryDate >= weekAgo;
          case 'last_30_days':
            const monthAgo = new Date(today);
            monthAgo.setDate(monthAgo.getDate() - 30);
            return entryDate >= monthAgo;
          case 'custom':
            if (filters.startDate && filters.endDate) {
              const startDate = new Date(filters.startDate);
              const endDate = new Date(filters.endDate);
              endDate.setHours(23, 59, 59, 999);
              return entryDate >= startDate && entryDate <= endDate;
            }
            return true;
          default:
            return true;
        }
      });
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [searchQuery, filters]);

  const handleExport = () => {
    // Mock export functionality
    const exportData = {
      caseId: caseData.id,
      exportDate: new Date().toISOString(),
      entries: filteredEntries,
      totalEntries: filteredEntries.length
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `case-timeline-${caseData.id}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more entries
    setTimeout(() => {
      setIsLoading(false);
      setHasMore(false); // For demo, assume no more entries
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbNavigation caseId={caseData.id} caseName={caseData.title} />
      <CaseContextSidebar 
        caseId={caseData.id} 
        caseTitle={caseData.title} 
        caseStatus={caseData.status} 
      />

      {/* Main Content */}
      <main className="lg:ml-80 pt-4 pb-20 lg:pb-6">
        <div className="px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Timeline Section */}
              <div className="xl:col-span-3">
                <TimelineFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onExport={handleExport}
                  onSearch={setSearchQuery}
                  searchQuery={searchQuery}
                  totalEntries={timelineEntries.length}
                  filteredEntries={filteredEntries.length}
                />
                
                <TimelineContainer
                  entries={filteredEntries}
                  isLoading={isLoading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                />
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-1">
                <div className="sticky top-32">
                  <CaseMetadataSidebar
                    caseData={caseData}
                    experts={expertsData}
                    relatedCases={relatedCasesData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FloatingAIAssistant />
    </div>
  );
};

export default CaseTimelineActivityTracking;