import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const BreadcrumbNavigation = ({ caseId = null, caseName = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard-case-management-overview': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/create-new-case-form': { label: 'Create Case', icon: 'Plus' },
    '/expert-matching-panel': { label: 'Expert Matching', icon: 'Users' },
    '/swarm-room-real-time-collaboration': { label: 'Swarm Room', icon: 'MessageSquare' },
    '/case-timeline-activity-tracking': { label: 'Timeline', icon: 'Clock' },
    '/postmortem-analysis-documentation': { label: 'Postmortem', icon: 'FileText' }
  };

  const generateBreadcrumbs = () => {
    const currentPath = location.pathname;
    const breadcrumbs = [];

    // Always start with Dashboard
    breadcrumbs.push({
      label: 'Dashboard',
      path: '/dashboard-case-management-overview',
      icon: 'LayoutDashboard',
      isClickable: currentPath !== '/dashboard-case-management-overview'
    });

    // Add case context if we're in a case-specific workflow
    if (caseId && currentPath !== '/dashboard-case-management-overview' && currentPath !== '/create-new-case-form') {
      breadcrumbs.push({
        label: caseName || `Case #${caseId}`,
        path: null,
        icon: 'Folder',
        isClickable: false,
        isCaseContext: true
      });
    }

    // Add current page if not dashboard
    if (currentPath !== '/dashboard-case-management-overview') {
      const currentRoute = routeMap[currentPath];
      if (currentRoute) {
        breadcrumbs.push({
          label: currentRoute.label,
          path: currentPath,
          icon: currentRoute.icon,
          isClickable: false,
          isCurrent: true
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on dashboard
  if (location.pathname === '/dashboard-case-management-overview') {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="sticky top-16 z-900 bg-background border-b border-border px-4 lg:px-6 py-3">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            <div className="flex items-center space-x-2">
              {crumb.isClickable ? (
                <button
                  onClick={() => handleBreadcrumbClick(crumb.path)}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                >
                  <Icon 
                    name={crumb.icon} 
                    size={14} 
                    className="group-hover:text-primary transition-colors duration-200" 
                  />
                  <span className="group-hover:text-primary transition-colors duration-200">
                    {crumb.label}
                  </span>
                </button>
              ) : (
                <div className={`flex items-center space-x-2 ${
                  crumb.isCurrent 
                    ? 'text-foreground font-medium' 
                    : crumb.isCaseContext 
                      ? 'text-primary font-medium' :'text-muted-foreground'
                }`}>
                  <Icon 
                    name={crumb.icon} 
                    size={14} 
                    className={crumb.isCurrent ? 'text-primary' : ''} 
                  />
                  <span>{crumb.label}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;