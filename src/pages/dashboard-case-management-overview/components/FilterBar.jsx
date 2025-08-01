import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange, 
  moduleFilter, 
  onModuleChange, 
  severityFilter, 
  onSeverityChange,
  onClearFilters,
  filteredCount,
  totalCount
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'expert-assigned', label: 'Expert Assigned' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const moduleOptions = [
    { value: '', label: 'All Modules' },
    { value: 'Database', label: 'Database' },
    { value: 'Network', label: 'Network' },
    { value: 'Security', label: 'Security' },
    { value: 'Application', label: 'Application' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'API', label: 'API' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' }
  ];

  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const hasActiveFilters = searchTerm || statusFilter || moduleFilter || severityFilter;

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 lg:max-w-md">
            <Input
              type="search"
              placeholder="Search cases by title or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusChange}
              placeholder="Status"
              className="w-full sm:w-40"
            />
            
            <Select
              options={moduleOptions}
              value={moduleFilter}
              onChange={onModuleChange}
              placeholder="Module"
              className="w-full sm:w-40"
            />
            
            <Select
              options={severityOptions}
              value={severityFilter}
              onChange={onSeverityChange}
              placeholder="Severity"
              className="w-full sm:w-40"
            />

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-muted-foreground">
              Showing {filteredCount} of {totalCount} cases
            </span>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={14} className="text-primary" />
                <span className="text-primary font-medium">Filters applied</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;