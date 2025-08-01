import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-case-management-overview',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Expert Matching',
      path: '/expert-matching-panel',
      icon: 'Users'
    },
    {
      label: 'Swarm Room',
      path: '/swarm-room-real-time-collaboration',
      icon: 'MessageSquare'
    },
    {
      label: 'Timeline',
      path: '/case-timeline-activity-tracking',
      icon: 'Clock'
    },
    {
      label: 'Postmortem',
      path: '/postmortem-analysis-documentation',
      icon: 'FileText'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCreateCase = () => {
    navigate('/create-new-case-form');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear login state if implemented in the future
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Mock user data
  const user = {
    name: 'Test User',
    email: 'testuser@kwikkconnect.com'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 glass backdrop-blur-md border-b border-white/20">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Enhanced Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/dashboard-case-management-overview')}
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow transform transition-all duration-300 group-hover:rotate-12">
              <Icon name="Zap" size={22} color="white" className="animate-float" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-gradient-primary tracking-tight">
                KwikkConnect
              </span>
              <span className="text-xs text-neutral-500 -mt-1">Case Management</span>
            </div>
          </button>
        </div>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActivePath(item.path)
                  ? 'bg-gradient-primary text-white shadow-glow transform scale-105'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60 hover:shadow-card hover:scale-105'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                className={`transition-transform duration-300 ${
                  isActivePath(item.path) ? 'animate-bounce-gentle' : 'group-hover:scale-110'
                }`}
              />
              <span className="font-medium">{item.label}</span>
              {isActivePath(item.path) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Enhanced Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={handleCreateCase}
            className="btn-primary animate-button-hover shadow-glow hover:shadow-glow transform hover:scale-105 transition-all duration-300"
          >
            Create Case
          </Button>
          
          {/* Notification Bell */}
          <button className="relative p-3 text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-white/60 transition-all duration-300 group">
            <Icon name="Bell" size={20} className="group-hover:animate-bounce-gentle" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-error rounded-full animate-pulse" />
          </button>
          
          {/* Settings */}
          <button className="p-3 text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-white/60 transition-all duration-300 group">
            <Icon name="Settings" size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          {/* Enhanced User Menu */}
          <div className="relative group">
            <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              <Icon name="User" size={18} color="white" />
            </div>
            <div className="absolute right-0 top-12 w-64 glass rounded-2xl shadow-floating opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{user.name}</div>
                    <div className="text-sm text-neutral-500">{user.email}</div>
                  </div>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors duration-200">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors duration-200">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 mt-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-3 text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-white/60 transition-all duration-300 group"
        >
          <Icon 
            name={isMobileMenuOpen ? 'X' : 'Menu'} 
            size={24} 
            className={`transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-90' : 'group-hover:scale-110'
            }`}
          />
        </button>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-white/20 animate-fade-in-down backdrop-blur-md">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActivePath(item.path)
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60 hover:shadow-card'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={isActivePath(item.path) ? 'animate-bounce-gentle' : ''}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <div className="pt-4 border-t border-white/20 mt-4">
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={handleCreateCase}
                className="btn-primary w-full animate-button-hover shadow-glow"
              >
                Create Case
              </Button>
            </div>
            <div className="pt-4 border-t border-white/20 mt-4">
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Icon name="User" size={18} color="white" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{user.name}</div>
                  <div className="text-sm text-neutral-500">{user.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 mt-2"
              >
                <Icon name="LogOut" size={18} />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;