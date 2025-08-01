import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import { Checkbox } from 'components/ui/Checkbox';

const CaseFormModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    module: '',
    severity: 'medium',
    urgentNotification: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moduleOptions = [
    { value: 'database', label: 'Database Systems' },
    { value: 'network', label: 'Network Infrastructure' },
    { value: 'application', label: 'Application Services' },
    { value: 'security', label: 'Security & Authentication' },
    { value: 'storage', label: 'Storage Systems' },
    { value: 'monitoring', label: 'Monitoring & Alerts' },
    { value: 'integration', label: 'System Integration' },
    { value: 'performance', label: 'Performance Optimization' }
  ];

  const severityLevels = [
    { 
      value: 'critical', 
      label: 'Critical', 
      description: 'System down, major business impact',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error'
    },
    { 
      value: 'high', 
      label: 'High', 
      description: 'Significant functionality affected',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Moderate impact on operations',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary'
    },
    { 
      value: 'low', 
      label: 'Low', 
      description: 'Minor issue, low business impact',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Case title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Case description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.module) {
      newErrors.module = 'Please select a module';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate case ID
      const caseId = `CASE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      // Create the new case object
      const newCase = {
        id: caseId,
        title: formData.title,
        description: formData.description,
        status: 'open',
        module: formData.module.charAt(0).toUpperCase() + formData.module.slice(1),
        severity: formData.severity,
        expertAccepted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save the new case to localStorage
      const savedCases = JSON.parse(localStorage.getItem('kwikkconnect_cases') || '[]');
      localStorage.setItem('kwikkconnect_cases', JSON.stringify([newCase, ...savedCases]));

      // Dispatch event to notify dashboard about new case
      window.dispatchEvent(new CustomEvent('newCaseCreated', {
        detail: {
          type: 'NEW_CASE',
          case: newCase
        }
      }));
      
      // Navigate to expert matching with case data
      navigate('/expert-matching-panel', { 
        state: { 
          caseId,
          caseData: newCase,
          fromCreate: true
        }
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating case:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      module: '',
      severity: 'medium',
      urgentNotification: false
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card rounded-lg shadow-floating animate-scale-in max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create New Case</h2>
              <p className="text-sm text-muted-foreground">Report an incident and get expert assistance</p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Case Title */}
            <Input
              label="Case Title"
              type="text"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={errors.title}
              required
              className="w-full"
            />

            {/* Case Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Case Description <span className="text-error">*</span>
              </label>
              <textarea
                placeholder="Detailed description of the issue, steps to reproduce, and any error messages..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200 ${
                  errors.description 
                    ? 'border-error bg-error/5' :'border-border bg-background'
                }`}
                rows="4"
                required
              />
              {errors.description && (
                <p className="text-sm text-error">{errors.description}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/500 characters
              </p>
            </div>

            {/* Module Selection */}
            <Select
              label="Affected Module"
              placeholder="Select the system module"
              options={moduleOptions}
              value={formData.module}
              onChange={(value) => handleInputChange('module', value)}
              error={errors.module}
              required
              searchable
            />

            {/* Severity Level */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Severity Level <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {severityLevels.map((level) => (
                  <label
                    key={level.value}
                    className={`relative flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      formData.severity === level.value
                        ? `${level.borderColor} ${level.bgColor}`
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    <input
                      type="radio"
                      name="severity"
                      value={level.value}
                      checked={formData.severity === level.value}
                      onChange={(e) => handleInputChange('severity', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.severity === level.value
                        ? `${level.borderColor} ${level.bgColor}`
                        : 'border-border'
                    }`}>
                      {formData.severity === level.value && (
                        <div className={`w-2 h-2 rounded-full ${level.color.replace('text-', 'bg-')}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        formData.severity === level.value ? level.color : 'text-foreground'
                      }`}>
                        {level.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {level.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <Checkbox
                label="Send urgent notification to experts"
                description="Immediately notify available experts for faster response"
                checked={formData.urgentNotification}
                onChange={(e) => handleInputChange('urgentNotification', e.target.checked)}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="Plus"
            iconPosition="left"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Case...' : 'Create Case'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseFormModal;