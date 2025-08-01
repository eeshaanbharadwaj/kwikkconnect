import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { geminiService } from 'utils/geminiService';

// Debug geminiService import
console.log('geminiService imported:', geminiService);
console.log('geminiService methods:', Object.getOwnPropertyNames(geminiService));
console.log('summarizeChatLog method:', geminiService.summarizeChatLog);

const ChatInterface = ({ caseDetails }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI Assistant",
      avatar: null,
      content: `Welcome to the swarm room! I've analyzed the case details and here's a quick summary:\n\n**Issue:** ${caseDetails?.title || 'Database connection timeout'}\n**Severity:** ${caseDetails?.severity || 'High'}\n**Affected Systems:** ${caseDetails?.module || 'Production database cluster'}\n\nI'll be monitoring the conversation and providing suggestions as we progress.`,
      timestamp: new Date("2025-01-19T08:45:00"),
      type: "system",
      isAI: true
    },
    {
      id: 2,
      sender: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      content: "Hi everyone! I\'m here to help with the database issue. Let me start by checking the current connection pool status.",
      timestamp: new Date("2025-01-19T08:46:00"),
      type: "message"
    },
    {
      id: 3,
      sender: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      content: "Thanks for joining, Michael! I've uploaded the error logs and configuration files. The timeouts started around 8 AM this morning.",timestamp: new Date("2025-01-19T08:47:00"),type: "message"
    }
  ]);

  const typingUsers = ["Emma Wilson"];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate initial AI analysis when component mounts
    if (caseDetails && messages.length <= 3) {
      generateAIAnalysis();
    }
  }, [caseDetails]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateAIAnalysis = async () => {
    if (!caseDetails) return;
    
    setIsAIGenerating(true);
    try {
      const analysis = await geminiService.analyzeCase(caseDetails);
      const aiMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `🔍 **Initial Analysis Complete**\n\n**Recommended Expertise:** ${analysis.expertiseAreas?.join(', ')}\n\n**Suggested Next Steps:**\n${analysis.troubleshootingSteps?.map(step => `• ${step}`).join('\n')}\n\n**Potential Root Causes:**\n${analysis.potentialCauses?.map(cause => `• ${cause}`).join('\n')}\n\n**Urgency Level:** ${analysis.urgencyLevel}`,
        timestamp: new Date(),
        type: "suggestion",
        isAI: true,
        hasAction: true
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI analysis:', error);
    } finally {
      setIsAIGenerating(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      content: message,
      timestamp: new Date(),
      type: "message"
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Trigger AI suggestions for technical queries
    if (message.toLowerCase().includes('help') || 
        message.toLowerCase().includes('suggest') || 
        message.toLowerCase().includes('fix')) {
      generateAISuggestion(message);
    }
  };

  const generateAISuggestion = async (userMessage) => {
    setIsAIGenerating(true);
    try {
      const suggestion = await geminiService.suggestQuickFix(caseDetails, userMessage);
      const aiMessage = {
        id: messages.length + 2,
        sender: "AI Assistant",
        avatar: null,
        content: `💡 **AI Suggestion**\n\n${suggestion}`,
        timestamp: new Date(),
        type: "suggestion",
        isAI: true,
        hasAction: true
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsAIGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating AI suggestion:', error);
      setIsAIGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
        content: `📎 Uploaded: ${file.name}`,
        timestamp: new Date(),
        type: "file",
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + " KB"
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleApplyFix = async () => {
    setIsAIGenerating(true);
    try {
      const fixMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `✅ **Fix Applied Successfully**\n\nConfiguration updated based on analysis:\n• Implemented recommended changes\n• System parameters optimized\n• Monitoring enabled\n\nThe issue should be resolved. Continuing to monitor for stability.`,
        timestamp: new Date(),
        type: "system",
        isAI: true
      };
      setMessages(prev => [...prev, fixMessage]);
    } catch (error) {
      console.error('Error applying fix:', error);
    } finally {
      setIsAIGenerating(false);
    }
  };

  const generateChatSummary = async () => {
    console.log('AI Summary button clicked');
    console.log('Messages:', messages);
    console.log('Case Details:', caseDetails);
    console.log('API Key available:', !!import.meta.env.VITE_GEMINI_API_KEY);
    
    setIsAIGenerating(true);
    try {
      // Check if API key is available
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY environment variable.');
      }
      
      console.log('Calling geminiService.summarizeChatLog...');
      const summary = await geminiService.summarizeChatLog(messages, caseDetails);
      console.log('Summary generated:', summary);
      
      const summaryMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `📋 **Chat Summary for Late Joiners**\n\n${summary}`,
        timestamp: new Date(),
        type: "system",
        isAI: true
      };
      console.log('Adding summary message to chat');
      setMessages(prev => [...prev, summaryMessage]);
    } catch (error) {
      console.error('Error in generateChatSummary:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Add error message to chat
      const errorMessage = {
        id: messages.length + 1,
        sender: "AI Assistant",
        avatar: null,
        content: `❌ **Summary Generation Failed**\n\n${error.message.includes('API key') 
          ? 'Gemini API key not configured. Please set the VITE_GEMINI_API_KEY environment variable to enable AI features.'
          : 'Unable to generate chat summary at this time. Please try again later or contact support if the issue persists.'
        }\n\nError: ${error.message}`,
        timestamp: new Date(),
        type: "system",
        isAI: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAIGenerating(false);
    }
  };

  const renderMessage = (msg) => {
    const isOwnMessage = msg.sender === "You";
    const isSystemMessage = msg.type === "system" || msg.isAI;
    const isAI = msg.isAI || msg.sender === "AI Assistant";
    return (
      <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
        <div className={`flex max-w-[80%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
          {/* Avatar with status ring */}
          {!isOwnMessage && !isSystemMessage && (
            <div className="relative w-10 h-10">
              <span className={`absolute w-full h-full rounded-full border-2 ${msg.status === 'online' ? 'border-success' : msg.status === 'away' ? 'border-warning' : 'border-muted'} top-0 left-0`}></span>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {msg.avatar ? (
                  <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
            {!isSystemMessage && (
              <div className={`text-xs text-muted-foreground mb-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>{msg.sender} • {formatTime(msg.timestamp)}</div>
            )}
            <div className={`rounded-2xl px-5 py-3 shadow-md transition-all duration-200 ${
              isSystemMessage
                ? 'bg-gradient-to-r from-muted/80 to-muted/60 border border-border text-foreground'
                : isOwnMessage
                  ? 'bg-gradient-to-br from-primary to-blue-500 text-primary-foreground border-2 border-primary/30'
                  : isAI
                    ? 'bg-gradient-to-br from-accent/80 to-accent/40 text-accent-foreground border-2 border-accent/30'
                  : 'bg-card border border-border text-foreground'
            } ${msg.type === 'suggestion' ? 'ring-2 ring-accent/60' : ''}`}> 
              {msg.type === 'code' ? (
                <div>
                  <div className="text-xs text-muted-foreground mb-2 flex items-center space-x-1">
                    <Icon name="Code" size={12} />
                    <span>{msg.language?.toUpperCase() || 'CODE'}</span>
                  </div>
                  <pre className="text-sm font-mono bg-background/50 p-2 rounded border overflow-x-auto">
                    <code>{msg.content}</code>
                  </pre>
                </div>
              ) : msg.type === 'file' ? (
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={16} />
                  <div>
                    <p className="text-sm font-medium">{msg.fileName}</p>
                    <p className="text-xs text-muted-foreground">{msg.fileSize}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.hasAction && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleApplyFix}
                        iconName="Zap"
                        iconPosition="left"
                        disabled={isAIGenerating}
                      >
                        Apply Fix
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={generateChatSummary}
                        iconName="FileText"
                        iconPosition="left"
                        disabled={isAIGenerating}
                      >
                        Summarize Chat
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background to-blue-50 relative">
      {/* Header */}
      <div className="p-4 border-b border-border bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Swarm Room Chat</h3>
            <p className="text-sm text-muted-foreground flex items-center">
              4 participants active
              {isAIGenerating && (
                <span className="ml-2 text-accent">• AI analyzing...</span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Icon name="Search" size={16} />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Icon name="MoreVertical" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Fade at top */}
      <div className="absolute top-16 left-0 right-0 h-6 pointer-events-none bg-gradient-to-b from-blue-100/60 to-transparent z-10" />
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(renderMessage)}
        {/* AI Generating Indicator */}
        {isAIGenerating && (
          <div className="flex items-center space-x-2 text-accent mb-4 animate-fade-in">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm">AI is analyzing and generating suggestions...</span>
          </div>
        )}
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center space-x-2 text-muted-foreground animate-fade-in">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm">{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Fade at bottom */}
      <div className="absolute bottom-20 left-0 right-0 h-8 pointer-events-none bg-gradient-to-t from-blue-100/60 to-transparent z-10" />
      {/* AI Summary Button */}
      <div className="px-4 py-2 flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            console.log('AI Summary button clicked - onClick triggered');
            generateChatSummary();
          }}
          iconName="FileText"
          iconPosition="left"
          disabled={isAIGenerating}
        >
          AI Summary
        </Button>
      </div>
      {/* Input Area */}
      <div className="p-4 border-t border-border bg-white/80 backdrop-blur sticky bottom-0 z-10">
        <div className="flex items-end space-x-2">
          <button
            onClick={handleFileUpload}
            className="p-2 rounded-full bg-background shadow hover:bg-blue-100 hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-blue-300"
          >
            <Icon name="Paperclip" size={20} />
          </button>
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (try asking for help or suggestions)"
              className="w-full px-4 py-3 text-base bg-background border border-border rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300 max-h-32 resize-none transition-all duration-200"
              rows="2"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            iconName="Send"
            size="lg"
            className="rounded-full shadow hover:bg-blue-600 hover:shadow-lg transition-all duration-200"
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.log,.xml,.json,.sql,.py,.js,.jsx,.ts,.tsx"
        />
      </div>
    </div>
  );
};

export default ChatInterface;