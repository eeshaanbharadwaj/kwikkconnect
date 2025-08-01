import React from 'react';
import Icon from 'components/AppIcon';

const QuickCaseTemplates = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'database-connection',
      title: 'Database Connection Issue',
      description: 'Connection timeouts, failed queries, or database unavailability',
      module: 'database',
      severity: 'high',
      icon: 'Database',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      template: {
        title: 'Database Connection Timeout',
        description: `**Issue Description:**\nExperiencing database connection timeouts when attempting to connect to the production database.\n\n**Error Messages:**\n- Connection timeout after 30 seconds\n- Unable to establish connection to database server\n\n**Steps to Reproduce:**\n1. Attempt to connect to database\n2. Wait for connection timeout\n3. Error occurs consistently\n\n**Impact:**\n- Users unable to access application\n- Data operations failing`,
        module: 'database',
        severity: 'high'
      }
    },
    {
      id: 'network-connectivity',
      title: 'Network Connectivity Problem',
      description: 'Network outages, slow connections, or routing issues',
      module: 'network',
      severity: 'critical',
      icon: 'Wifi',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      template: {
        title: 'Network Connectivity Loss',
        description: `**Issue Description:**\nComplete network connectivity loss affecting multiple services and users.\n\n**Symptoms:**\n- Unable to reach external services\n- Internal network communication failing\n- DNS resolution issues\n\n**Affected Systems:**\n- Web applications\n- API services\n- Database connections\n\n**Business Impact:**\n- Complete service unavailability\n- Customer-facing applications down`,
        module: 'network',
        severity: 'critical'
      }
    },
    {
      id: 'application-error',
      title: 'Application Error',
      description: 'Application crashes, unexpected behavior, or functionality issues',
      module: 'application',
      severity: 'medium',
      icon: 'AlertTriangle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      template: {
        title: 'Application Unexpected Behavior',
        description: `**Issue Description:**\nApplication displaying unexpected behavior and generating errors for specific user actions.\n\n**Error Details:**\n- Error code: 500 Internal Server Error\n- Occurs when users attempt specific operations\n- Intermittent but reproducible\n\n**User Impact:**\n- Certain features unavailable\n- User workflow disrupted\n- Data processing delays\n\n**Environment:**\n- Production environment\n- Affects approximately 15% of users`,
        module: 'application',
        severity: 'medium'
      }
    },
    {
      id: 'security-incident',
      title: 'Security Incident',
      description: 'Security breaches, unauthorized access, or suspicious activity',
      module: 'security',
      severity: 'critical',
      icon: 'Shield',
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      template: {
        title: 'Suspicious Security Activity Detected',
        description: `**Security Alert:**\nUnusual login patterns and potential unauthorized access attempts detected.\n\n**Indicators:**\n- Multiple failed login attempts from unknown IPs\n- Unusual access patterns outside business hours\n- Potential brute force attack detected\n\n**Immediate Actions Taken:**\n- Monitoring systems activated\n- Suspicious IPs flagged\n- Security team notified\n\n**Required Response:**\n- Immediate security assessment\n- Access log analysis\n- Potential account lockdowns`,
        module: 'security',
        severity: 'critical'
      }
    },
    {
      id: 'performance-degradation',
      title: 'Performance Degradation',
      description: 'Slow response times, high resource usage, or system lag',
      module: 'performance',
      severity: 'medium',
      icon: 'TrendingDown',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      template: {
        title: 'System Performance Degradation',
        description: `**Performance Issue:**\nSignificant slowdown in system response times affecting user experience.\n\n**Metrics:**\n- Average response time increased by 300%\n- CPU utilization at 85%\n- Memory usage at 90%\n\n**User Impact:**\n- Slow page load times\n- Delayed data processing\n- Timeout errors occurring\n\n**Monitoring Data:**\n- Started approximately 2 hours ago\n- Affecting all application modules\n- No recent deployments or changes`,
        module: 'performance',
        severity: 'medium'
      }
    },
    {
      id: 'storage-issue',
      title: 'Storage System Issue',
      description: 'Disk space, backup failures, or storage accessibility problems',
      module: 'storage',
      severity: 'high',
      icon: 'HardDrive',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      template: {
        title: 'Storage System Capacity Alert',
        description: `**Storage Alert:**\nCritical storage capacity reached on production systems.\n\n**Current Status:**\n- Primary storage: 95% full\n- Backup storage: 88% full\n- Log storage: 92% full\n\n**Immediate Risks:**\n- Application failures due to insufficient space\n- Backup operations may fail\n- Log rotation issues\n\n**Required Actions:**\n- Immediate space cleanup\n- Archive old data\n- Expand storage capacity`,
        module: 'storage',
        severity: 'high'
      }
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Quick Start Templates</h3>
        <p className="text-sm text-muted-foreground">
          Select a template to quickly create a case with pre-filled information
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.template)}
            className="text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${template.bgColor}`}>
                <Icon name={template.icon} size={20} className={template.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {template.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {template.module}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    template.severity === 'critical' ? 'bg-error/10 text-error' :
                    template.severity === 'high' ? 'bg-warning/10 text-warning' :
                    template.severity === 'medium'? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                  }`}>
                    {template.severity}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickCaseTemplates;