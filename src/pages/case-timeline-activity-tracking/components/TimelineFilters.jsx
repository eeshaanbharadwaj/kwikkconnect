import React from 'react';

import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import Input from 'components/ui/Input';

const TimelineFilters = ({ 
  filters, 
  onFiltersChange, 
  onExport, 
  onSearch,
  searchQuery,
  totalEntries,
  filteredEntries 
}) => {
  const activityTypeOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'case_created', label: 'Case Creation' },
    { value: 'expert_assigned', label: 'Expert Assignments' },
    { value: 'chat_message', label: 'Chat Messages' },
    { value: 'fix_applied', label: 'Fixes Applied' },
    { value: 'status_change', label: 'Status Changes' },
    { value: 'escalation', label: 'Escalations' },
    { value: 'resolution', label: 'Resolutions' },
    { value: 'note_added', label: 'Notes Added' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Side - Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search timeline events..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Activity Type Filter */}
          <div className="w-full sm:w-48">
            <Select
              options={activityTypeOptions}
              value={filters.activityType}
              onChange={(value) => handleFilterChange('activityType', value)}
              placeholder="Activity Type"
            />
          </div>

          {/* Date Range Filter */}
          <div className="w-full sm:w-40">
            <Select
              options={dateRangeOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Date Range"
            />
          </div>
        </div>

        {/* Right Side - Actions & Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredEntries} of {totalEntries} entries
          </div>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>

          {/* Clear Filters */}
          {(filters.activityType !== 'all' || filters.dateRange !== 'all' || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={() => {
                onFiltersChange({
                  activityType: 'all',
                  dateRange: 'all'
                });
                onSearch('');
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Custom Date Range Inputs */}
      {filters.dateRange === 'custom' && (
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4 pt-4 border-t border-border">
          <div className="flex-1">
            <Input
              type="date"
              label="From Date"
              value={filters.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              type="date"
              label="To Date"
              value={filters.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineFilters;