import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const DashboardHeader = ({ totalCases, activeCases, selectedCount }) => {
  const navigate = useNavigate();

  const handleCreateCase = () => {
    navigate('/create-new-case-form');
  };

  const handleDeleteSelected = () => {
    // This will be handled by the parent component
    window.dispatchEvent(new CustomEvent('deleteSelectedCases'));
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Title and Stats */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="LayoutDashboard" size={24} className="text-primary" />
              <h1 className="text-2xl font-semibold text-foreground">Case Management Dashboard</h1>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Total Cases:</span>
                <span className="font-medium text-foreground">{totalCases}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Active:</span>
                <span className="font-medium text-primary">{activeCases}</span>
              </div>
              {selectedCount > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Selected:</span>
                  <span className="font-medium text-accent">{selectedCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {selectedCount > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={handleDeleteSelected}
                >
                  Delete ({selectedCount})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Archive"
                  iconPosition="left"
                >
                  Archive ({selectedCount})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Users"
                  iconPosition="left"
                >
                  Assign Expert
                </Button>
              </div>
            )}
            
            <Button
              variant="default"
              onClick={handleCreateCase}
              iconName="Plus"
              iconPosition="left"
              className="bg-primary hover:bg-primary/90"
            >
              Create New Case
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;