import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';

const CaseTable = ({ cases, selectedCases, onCaseSelect, onSelectAll, searchTerm, statusFilter, moduleFilter, severityFilter, onDeleteCase, onDeleteSelectedCases }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  const handleDeleteCase = (caseId, caseTitle) => {
    if (window.confirm(`Are you sure you want to delete case "${caseTitle}"? This action cannot be undone.`)) {
      onDeleteCase(caseId);
    }
  };

  const statusConfig = {
    'open': { color: 'text-primary', bg: 'bg-primary/10', label: 'Open' },
    'in-progress': { color: 'text-warning', bg: 'bg-warning/10', label: 'In Progress' },
    'expert-assigned': { color: 'text-accent', bg: 'bg-accent/10', label: 'Expert Assigned' },
    'resolved': { color: 'text-success', bg: 'bg-success/10', label: 'Resolved' },
    'closed': { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Closed' }
  };

  const severityConfig = {
    'low': { color: 'text-success', bg: 'bg-success/10', label: 'Low' },
    'medium': { color: 'text-warning', bg: 'bg-warning/10', label: 'Medium' },
    'high': { color: 'text-error', bg: 'bg-error/10', label: 'High' },
    'critical': { color: 'text-destructive', bg: 'bg-destructive/10', label: 'Critical' }
  };

  const filteredAndSortedCases = useMemo(() => {
    let filtered = cases.filter(caseItem => {
      const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || caseItem.status === statusFilter;
      const matchesModule = !moduleFilter || caseItem.module === moduleFilter;
      const matchesSeverity = !severityFilter || caseItem.severity === severityFilter;
      
      return matchesSearch && matchesStatus && matchesModule && matchesSeverity;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [cases, searchTerm, statusFilter, moduleFilter, severityFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleJoinSwarmRoom = (caseId) => {
    navigate('/swarm-room-real-time-collaboration', { state: { caseId } });
  };

  const handleViewCase = (caseId) => {
    navigate('/case-timeline-activity-tracking', { state: { caseId } });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const allSelected = filteredAndSortedCases.length > 0 && 
    filteredAndSortedCases.every(caseItem => selectedCases.includes(caseItem.id));

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  indeterminate={selectedCases.length > 0 && !allSelected}
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span>Case ID</span>
                  <Icon name={getSortIcon('id')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span>Title</span>
                  <Icon name={getSortIcon('title')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('module')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span>Module</span>
                  <Icon name={getSortIcon('module')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('severity')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span>Severity</span>
                  <Icon name={getSortIcon('severity')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span>Created</span>
                  <Icon name={getSortIcon('createdAt')} size={14} />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedCases.map((caseItem) => {
              const status = statusConfig[caseItem.status] || statusConfig.open;
              const severity = severityConfig[caseItem.severity] || severityConfig.low;
              
              return (
                <tr key={caseItem.id} className="hover:bg-muted/30 transition-colors duration-200">
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedCases.includes(caseItem.id)}
                      onChange={(e) => onCaseSelect(caseItem.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-mono text-foreground">{caseItem.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <button
                        onClick={() => handleViewCase(caseItem.id)}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 text-left"
                      >
                        {caseItem.title}
                      </button>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {caseItem.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground">{caseItem.module}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${severity.bg} ${severity.color}`}>
                      {severity.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{formatDate(caseItem.createdAt)}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {caseItem.expertAccepted && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleJoinSwarmRoom(caseItem.id)}
                          iconName="MessageSquare"
                          iconPosition="left"
                          className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent"
                        >
                          Join Swarm
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewCase(caseItem.id)}
                        iconName="Eye"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteCase(caseItem.id, caseItem.title)}
                        iconName="Trash2"
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {filteredAndSortedCases.map((caseItem) => {
          const status = statusConfig[caseItem.status] || statusConfig.open;
          const severity = severityConfig[caseItem.severity] || severityConfig.low;
          
          return (
            <div key={caseItem.id} className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedCases.includes(caseItem.id)}
                    onChange={(e) => onCaseSelect(caseItem.id, e.target.checked)}
                  />
                  <span className="text-xs font-mono text-muted-foreground">{caseItem.id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${severity.bg} ${severity.color}`}>
                    {severity.label}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleViewCase(caseItem.id)}
                className="text-left w-full mb-2"
              >
                <h3 className="font-medium text-foreground hover:text-primary transition-colors duration-200">
                  {caseItem.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {caseItem.description}
                </p>
              </button>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{caseItem.module}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(caseItem.createdAt)}</span>
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                {caseItem.expertAccepted && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleJoinSwarmRoom(caseItem.id)}
                    iconName="MessageSquare"
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent"
                    fullWidth
                  >
                    Join Swarm Room
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleViewCase(caseItem.id)}
                  iconName="Eye"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteCase(caseItem.id, caseItem.title)}
                  iconName="Trash2"
                  className="text-destructive hover:text-destructive"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedCases.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No cases found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter || moduleFilter || severityFilter
              ? 'Try adjusting your filters or search terms' :'No cases have been created yet'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CaseTable;