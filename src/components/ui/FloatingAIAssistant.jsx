import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { geminiService } from 'utils/geminiService';

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant powered by Gemini. I can help you with case analysis, expert recommendations, troubleshooting guidance, and more. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const [currentCaseContext, setCurrentCaseContext] = useState(null);

  // Extract case context from current route
  useEffect(() => {
    // Try to get case context from route state or URL
    const state = location.state;
    if (state?.caseDetails) {
      setCurrentCaseContext(state.caseDetails);
    } else if (location.pathname.includes('expert-matching-panel') || 
               location.pathname.includes('swarm-room') || 
               location.pathname.includes('case-timeline')) {
      // For case-specific pages, we might have case data in localStorage or need to fetch it
      const caseId = new URLSearchParams(location.search).get('caseId');
      if (caseId) {
        // In a real app, you'd fetch case details here
        setCurrentCaseContext({ id: caseId, title: 'Current Case', module: 'System' });
      }
    }
  }, [location]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Use Gemini service for AI response
      const aiResponse = await geminiService.chatAssistant(message, currentCaseContext);
      
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact support if the issue persists.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 lg:bottom-24 lg:right-6 w-80 lg:w-96 h-96 bg-card border border-border rounded-lg shadow-floating z-1200 animate-scale-in">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Assistant</h3>
                  <p className="text-xs text-success flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-1"></span>
                    Powered by Gemini
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Case Context Banner */}
            {currentCaseContext && (
              <div className="px-4 py-2 bg-accent/10 border-b border-border">
                <p className="text-xs text-accent font-medium">
                  📋 Context: {currentCaseContext.title} ({currentCaseContext.module})
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    msg.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  } rounded-lg px-3 py-2`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ?'text-primary-foreground/70' :'text-muted-foreground/70'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      <span className="text-xs ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentCaseContext 
                      ? "Ask about this case..." :"Ask me anything about cases, troubleshooting, or technical guidance..."
                    }
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    rows="2"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  iconName="Send"
                  className="shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-12 h-12 lg:w-14 lg:h-14 bg-primary text-primary-foreground rounded-full shadow-floating hover:shadow-xl transition-all duration-300 z-1200 animate-button-press ${
          isOpen ? 'rotate-180' : ''
        }`}
        data-ai-assistant
      >
        <Icon name={isOpen ? 'X' : 'Bot'} size={24} />
        
        {/* Notification Dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-accent-foreground">AI</span>
          </div>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-1100 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingAIAssistant;