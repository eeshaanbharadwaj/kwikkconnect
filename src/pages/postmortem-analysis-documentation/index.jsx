import React, { useState } from 'react';
import NavigationHeader from 'components/ui/NavigationHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import CaseContextSidebar from 'components/ui/CaseContextSidebar';
import FloatingAIAssistant from 'components/ui/FloatingAIAssistant';
import PostmortemHeader from './components/PostmortemHeader';
import ExecutiveSummary from './components/ExecutiveSummary';
import RootCauseAnalysis from './components/RootCauseAnalysis';
import TimelineVisualization from './components/TimelineVisualization';
import ExpertContributions from './components/ExpertContributions';
import AppliedFixes from './components/AppliedFixes';
import LessonsLearned from './components/LessonsLearned';
import SimilarCases from './components/SimilarCases';
import SharePostmortemModal from './components/SharePostmortemModal';
import PostmortemSidebar from './components/PostmortemSidebar';

const PostmortemAnalysisDocumentation = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Mock case data
  const caseData = {
    id: "CASE-2024-001",
    title: "Database Connection Timeout",
    description: "Critical database connectivity issues affecting user authentication and data retrieval across multiple services.",
    status: "resolved",
    resolutionTime: 185, // minutes
    expertsCount: 4,
    impact: "High",
    resolvedDate: "2024-12-19T08:30:00Z"
  };

  // Mock executive summary data
  const executiveSummary = {
    overview: `On December 19, 2024, at 06:15 AM, our production database experienced critical connection timeout issues that affected user authentication and data retrieval services. The incident was detected within 3 minutes through automated monitoring alerts and resolved within 3 hours and 5 minutes through coordinated expert collaboration. The root cause was identified as a misconfigured connection pool setting that was introduced during a routine maintenance update the previous evening.`,
    rootCause: "Database connection pool misconfiguration during routine maintenance, causing connection exhaustion under normal load conditions.",
    resolution: "Reverted connection pool settings to previous stable configuration and implemented additional monitoring for connection pool metrics.",
    keyTakeaway: "Implement staged rollouts for database configuration changes and enhance pre-deployment testing procedures to catch configuration issues before they reach production."
  };

  // Mock root cause analysis data
  const rootCauseAnalysis = {
    sections: [
      {
        type: "primary",
        icon: "AlertTriangle",
        title: "Primary Root Cause",
        subtitle: "Database Connection Pool Misconfiguration",
        description: `The primary root cause was a misconfigured database connection pool setting that was changed during routine maintenance on December 18, 2024. The max_connections parameter was inadvertently reduced from 200 to 50, while the connection_timeout was increased from 30 seconds to 120 seconds. This combination created a bottleneck where connections were held longer than necessary while the pool size was insufficient to handle normal application load.`,
        evidence: [
          "Database logs showing connection pool exhaustion starting at 06:15 AM",
          "Configuration diff showing parameter changes made during maintenance window",
          "Application logs indicating timeout errors correlating with database issues",
          "Monitoring data showing connection count hitting the new 50-connection limit"
        ],
        impact: "Complete service degradation for authentication and data retrieval operations affecting approximately 15,000 active users."
      },
      {
        type: "contributing",
        icon: "Settings",
        title: "Contributing Factor",
        subtitle: "Insufficient Testing of Configuration Changes",
        description: `The configuration changes were not adequately tested in a staging environment that replicated production load conditions. The staging environment used a smaller dataset and lower concurrent user simulation, which did not reveal the connection pool limitations.`,
        evidence: [
          "Staging environment configuration showing only 10 concurrent user simulation",
          "Test results from staging showing no connection issues with reduced load",
          "Missing load testing procedures for database configuration changes"
        ],
        impact: "Configuration issue went undetected until production deployment under real user load."
      },
      {
        type: "contributing",
        icon: "Clock",
        title: "Contributing Factor",
        subtitle: "Delayed Detection and Escalation",
        description: `While automated monitoring detected the issue within 3 minutes, the initial alert was categorized as a warning rather than critical, causing a 15-minute delay in expert escalation. The on-call engineer initially attempted standard troubleshooting procedures before escalating to database specialists.`,
        evidence: [
          "Alert logs showing initial warning classification at 06:18 AM",
          "Escalation timeline showing database expert involvement at 06:33 AM",
          "On-call response logs indicating standard troubleshooting attempts"
        ],
        impact: "Extended incident duration by approximately 15 minutes due to delayed expert involvement."
      }
    ]
  };

  // Mock timeline data
  const timelineData = {
    events: [
      {
        type: "incident",
        title: "Database Connection Issues Begin",
        description: "First connection timeout errors detected in application logs. Users begin experiencing authentication failures and slow page loads.",
        timestamp: "2024-12-19T06:15:00Z",
        actor: "System",
        details: [
          "Connection timeout errors spike to 95% of requests",
          "User authentication service becomes unresponsive",
          "Database connection pool reaches maximum capacity"
        ]
      },
      {
        type: "detection",
        title: "Automated Monitoring Alert Triggered",
        description: "Monitoring system detects abnormal database response times and connection failures, triggering initial warning alert.",
        timestamp: "2024-12-19T06:18:00Z",
        actor: "Monitoring System",
        details: [
          "Database response time exceeds 5-second threshold",
          "Connection failure rate above 50%",
          "Alert sent to on-call engineer"
        ]
      },
      {
        type: "investigation",
        title: "Initial Investigation Started",
        description: "On-call engineer begins standard troubleshooting procedures, checking application logs and basic database connectivity.",
        timestamp: "2024-12-19T06:22:00Z",
        actor: "Sarah Chen (On-call Engineer)",
        duration: "11 minutes",
        details: [
          "Verified database server health and resources",
          "Checked application deployment logs for recent changes",
          "Attempted connection pool restart"
        ]
      },
      {
        type: "escalation",
        title: "Escalation to Database Expert",
        description: "Issue escalated to database specialist after initial troubleshooting fails to resolve connection problems.",
        timestamp: "2024-12-19T06:33:00Z",
        actor: "Sarah Chen",
        details: [
          "Database specialist Michael Rodriguez contacted",
          "Incident severity upgraded to critical",
          "Additional monitoring enabled for database metrics"
        ]
      },
      {
        type: "investigation",
        title: "Database Configuration Analysis",
        description: "Database expert identifies connection pool configuration as potential root cause and begins detailed analysis.",
        timestamp: "2024-12-19T06:45:00Z",
        actor: "Michael Rodriguez (Database Expert)",
        duration: "25 minutes",
        details: [
          "Reviewed recent configuration changes",
          "Analyzed connection pool metrics and limits",
          "Identified discrepancy in max_connections setting"
        ]
      },
      {
        type: "fix",
        title: "Configuration Rollback Applied",
        description: "Database connection pool settings reverted to previous stable configuration to restore service availability.",
        timestamp: "2024-12-19T07:10:00Z",
        actor: "Michael Rodriguez",
        duration: "8 minutes",
        details: [
          "max_connections restored from 50 to 200",
          "connection_timeout reduced from 120s to 30s",
          "Connection pool restarted with new settings"
        ]
      },
      {
        type: "resolution",
        title: "Service Fully Restored",
        description: "All database connections stabilized, authentication service restored, and user access fully functional.",
        timestamp: "2024-12-19T07:20:00Z",
        actor: "System",
        details: [
          "Connection success rate returns to 99.9%",
          "User authentication response time under 200ms",
          "All dependent services operational"
        ]
      }
    ]
  };

  // Mock expert contributions data
  const expertContributions = [
    {
      name: "Michael Rodriguez",
      role: "Senior Database Administrator",
      department: "Infrastructure Team",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      timeInvolved: "2h 35m",
      messagesCount: 23,
      expertiseScore: 9,
      responseTime: "< 2 min",
      contributions: [
        {
          type: "diagnosis",
          description: "Identified connection pool misconfiguration as root cause through systematic analysis of database metrics and recent configuration changes.",
          timestamp: "06:45 AM",
          impact: "Critical - Led to rapid identification of root cause"
        },
        {
          type: "solution",
          description: "Implemented configuration rollback to restore service availability while maintaining data integrity and system stability.",
          timestamp: "07:10 AM",
          impact: "High - Restored service within 10 minutes"
        },
        {
          type: "validation",
          description: "Verified service restoration and implemented additional monitoring to prevent similar issues in the future.",
          timestamp: "07:25 AM",
          impact: "Medium - Ensured stable recovery"
        }
      ]
    },
    {
      name: "Sarah Chen",
      role: "DevOps Engineer",
      department: "Platform Team",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      timeInvolved: "3h 5m",
      messagesCount: 31,
      expertiseScore: 8,
      responseTime: "< 1 min",
      contributions: [
        {
          type: "detection",
          description: "First responder who detected the incident through monitoring alerts and initiated the incident response process.",
          timestamp: "06:18 AM",
          impact: "Critical - Enabled rapid incident detection"
        },
        {
          type: "escalation",
          description: "Escalated to appropriate database specialist after initial troubleshooting, ensuring expert involvement.",
          timestamp: "06:33 AM",
          impact: "High - Accelerated expert engagement"
        },
        {
          type: "validation",
          description: "Coordinated post-incident validation and monitoring to ensure complete service restoration.",
          timestamp: "07:30 AM",
          impact: "Medium - Confirmed stable resolution"
        }
      ]
    },
    {
      name: "Alex Thompson",
      role: "Application Architect",
      department: "Development Team",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      timeInvolved: "1h 20m",
      messagesCount: 15,
      expertiseScore: 7,
      responseTime: "< 5 min",
      contributions: [
        {
          type: "investigation",
          description: "Analyzed application-level impacts and provided insights into connection usage patterns that helped identify the scope of the issue.",
          timestamp: "06:50 AM",
          impact: "Medium - Provided application context"
        },
        {
          type: "validation",
          description: "Validated application functionality post-fix and confirmed all dependent services were operating normally.",
          timestamp: "07:35 AM",
          impact: "Medium - Ensured application stability"
        }
      ]
    }
  ];

  // Mock applied fixes data
  const appliedFixes = [
    {
      id: "fix-001",
      title: "Database Connection Pool Configuration Rollback",
      type: "configuration",
      status: "successful",
      appliedBy: "Michael Rodriguez",
      timestamp: "Dec 19, 2024 at 07:10 AM",
      description: "Reverted database connection pool settings to the previous stable configuration to immediately restore service availability. This involved changing the max_connections parameter back to 200 and reducing connection_timeout to 30 seconds.",
      steps: [
        "Accessed database configuration management system",
        "Identified previous stable configuration from backup",
        "Applied rollback for max_connections parameter (50 → 200)",
        "Applied rollback for connection_timeout parameter (120s → 30s)",
        "Restarted database connection pool service",
        "Verified configuration changes took effect",
        "Monitored connection metrics for stability"
      ],
      validation: "Connection success rate returned to 99.9% within 2 minutes",
      impact: "Complete service restoration for all affected applications"
    },
    {
      id: "fix-002",
      title: "Enhanced Database Connection Monitoring",
      type: "infrastructure",
      status: "successful",
      appliedBy: "Sarah Chen",
      timestamp: "Dec 19, 2024 at 07:25 AM",
      description: "Implemented additional monitoring alerts for database connection pool metrics to provide early warning of similar issues in the future.",
      steps: [
        "Configured connection pool utilization alerts at 70% threshold",
        "Added connection timeout rate monitoring with 5% threshold",
        "Set up database configuration change notifications",
        "Implemented automated health checks for connection pool status",
        "Created dashboard for real-time connection metrics visibility"
      ],
      validation: "All new monitoring alerts tested and confirmed functional",
      impact: "Improved early detection capabilities for future incidents"
    },
    {
      id: "fix-003",
      title: "Configuration Change Process Documentation",
      type: "process",
      status: "successful",
      appliedBy: "Alex Thompson",
      timestamp: "Dec 19, 2024 at 08:15 AM",
      description: "Updated database configuration change procedures to include mandatory load testing and staged rollout requirements to prevent similar issues.",
      steps: [
        "Documented new configuration change approval process",
        "Added mandatory staging environment load testing requirement",
        "Created configuration change impact assessment template",
        "Established rollback procedures for database changes",
        "Updated team training materials with new procedures"
      ],
      validation: "Process documentation reviewed and approved by team leads",
      impact: "Reduced risk of future configuration-related incidents"
    }
  ];

  // Mock lessons learned data
  const lessonsLearned = {
    categories: [
      {
        type: "prevention",
        items: [
          {
            title: "Implement Staged Database Configuration Rollouts",
            description: "Database configuration changes should be deployed in stages, starting with a subset of connections or a canary environment before full production deployment.",
            priority: "high",
            timeline: "Within 2 weeks",
            owner: "Infrastructure Team",
            dueDate: "Jan 2, 2025",
            actionItems: [
              "Design staged rollout process for database configurations",
              "Implement canary deployment capability for database settings",
              "Create automated rollback triggers for configuration issues",
              "Establish configuration change approval workflow"
            ]
          },
          {
            title: "Enhance Load Testing for Configuration Changes",
            description: "Staging environments must replicate production load conditions when testing database configuration changes to identify potential bottlenecks.",
            priority: "high",
            timeline: "Within 3 weeks",
            owner: "Platform Team",
            dueDate: "Jan 9, 2025",
            actionItems: [
              "Upgrade staging environment to match production capacity",
              "Implement realistic load testing scenarios",
              "Create automated load testing for configuration changes",
              "Establish performance benchmarks for configuration validation"
            ]
          }
        ]
      },
      {
        type: "detection",
        items: [
          {
            title: "Improve Alert Classification and Escalation",
            description: "Database connection issues should trigger immediate critical alerts rather than warnings to ensure rapid expert engagement.",
            priority: "medium",
            timeline: "Within 1 week",
            owner: "DevOps Team",
            dueDate: "Dec 26, 2024",
            actionItems: [
              "Review and update alert severity classifications",
              "Implement intelligent alert escalation based on impact",
              "Create direct escalation paths for database issues",
              "Establish expert on-call rotation for critical systems"
            ]
          },
          {
            title: "Implement Proactive Connection Pool Monitoring",
            description: "Add predictive monitoring for connection pool utilization to detect issues before they impact users.",
            priority: "medium",
            timeline: "Within 2 weeks",
            owner: "Monitoring Team",
            dueDate: "Jan 2, 2025",
            actionItems: [
              "Deploy connection pool utilization trending",
              "Implement predictive alerting for pool exhaustion",
              "Create automated scaling recommendations",
              "Establish baseline metrics for normal operation"
            ]
          }
        ]
      },
      {
        type: "response",
        items: [
          {
            title: "Streamline Expert Escalation Process",
            description: "Create direct escalation paths for database issues to reduce time to expert involvement during critical incidents.",
            priority: "medium",
            timeline: "Within 1 week",
            owner: "Incident Response Team",
            dueDate: "Dec 26, 2024",
            actionItems: [
              "Define clear escalation criteria for database issues",
              "Create expert contact matrix for different issue types",
              "Implement automated expert notification system",
              "Establish incident severity assessment guidelines"
            ]
          }
        ]
      },
      {
        type: "recovery",
        items: [
          {
            title: "Automate Configuration Rollback Procedures",
            description: "Implement automated rollback capabilities for database configuration changes to reduce recovery time during incidents.",
            priority: "low",
            timeline: "Within 4 weeks",
            owner: "Automation Team",
            dueDate: "Jan 16, 2025",
            actionItems: [
              "Develop automated configuration rollback system",
              "Create configuration version control and backup",
              "Implement one-click rollback functionality",
              "Establish automated validation of rollback success"
            ]
          }
        ]
      }
    ],
    overallGoal: "Reduce database configuration-related incident resolution time from 3+ hours to under 30 minutes through improved prevention, detection, and automated response capabilities."
  };

  // Mock similar cases data
  const similarCases = [
    {
      id: "CASE-2024-089",
      title: "Connection Pool Exhaustion During Peak Traffic",
      description: "Database connection pool reached maximum capacity during Black Friday traffic surge, causing widespread service degradation.",
      status: "resolved",
      similarity: 87,
      resolvedDate: "2024-11-29",
      resolutionTime: "45 minutes",
      primaryExpert: "Michael Rodriguez",
      commonFactors: ["Connection Pool", "High Load", "Configuration"],
      keyLearning: "Implemented dynamic connection pool scaling based on traffic patterns to prevent future exhaustion during peak periods."
    },
    {
      id: "CASE-2024-067",
      title: "Database Timeout After Maintenance Window",
      description: "Post-maintenance database connectivity issues caused by incorrect timeout configuration, affecting user authentication services.",
      status: "resolved",
      similarity: 82,
      resolvedDate: "2024-10-15",
      resolutionTime: "1h 20m",
      primaryExpert: "Sarah Chen",
      commonFactors: ["Maintenance", "Timeout", "Authentication"],
      keyLearning: "Established mandatory post-maintenance validation procedures to catch configuration issues before they impact users."
    },
    {
      id: "CASE-2024-034",
      title: "Application Database Connection Failures",
      description: "Intermittent database connection failures caused by misconfigured connection retry logic in application layer.",
      status: "resolved",
      similarity: 75,
      resolvedDate: "2024-08-22",
      resolutionTime: "2h 15m",
      primaryExpert: "Alex Thompson",
      commonFactors: ["Connection Failures", "Application Layer", "Retry Logic"],
      keyLearning: "Implemented circuit breaker pattern and improved connection retry mechanisms to handle database connectivity issues gracefully."
    }
  ];

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleExport = () => {
    console.log('Exporting postmortem as PDF...');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbNavigation 
        caseId={caseData.id} 
        caseName={caseData.title}
      />
      <CaseContextSidebar 
        caseId={caseData.id}
        caseTitle={caseData.title}
        caseStatus={caseData.status}
      />
      
      <main className="lg:ml-80 pt-32 lg:pt-24">
        <div className="flex gap-6 p-4 lg:p-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <PostmortemHeader 
              caseData={caseData}
              onShare={handleShare}
              onExport={handleExport}
            />
            
            <ExecutiveSummary summary={executiveSummary} />
            
            <RootCauseAnalysis analysis={rootCauseAnalysis} />
            
            <TimelineVisualization timeline={timelineData} />
            
            <ExpertContributions experts={expertContributions} />
            
            <AppliedFixes fixes={appliedFixes} />
            
            <LessonsLearned lessons={lessonsLearned} />
            
            <SimilarCases similarCases={similarCases} />
          </div>
          
          {/* Sidebar */}
          <PostmortemSidebar 
            onShare={handleShare}
            onExport={handleExport}
            caseData={caseData}
          />
        </div>
      </main>
      
      <SharePostmortemModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        caseData={caseData}
      />
      
      <FloatingAIAssistant />
      
      {/* Mobile bottom padding for case context sidebar */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default PostmortemAnalysisDocumentation;