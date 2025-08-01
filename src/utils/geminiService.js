import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Error handling utilities for Gemini API
 */
class GeminiErrorHandler {
  static isQuotaExceeded(error) {
    return error?.message?.includes('429') || 
           error?.message?.includes('quota') || 
           error?.message?.includes('rate limit');
  }

  static isNetworkError(error) {
    return error?.message?.includes('fetch') || 
           error?.message?.includes('network') ||
           error?.code === 'NETWORK_ERROR';
  }

  static getRetryDelay(error, attempt = 1) {
    // Check for retry delay in error response
    if (error?.message?.includes('retryDelay')) {
      const match = error.message.match(/"retryDelay":"(\d+)s"/);
      if (match) {
        return parseInt(match[1]) * 1000; // Convert to milliseconds
      }
    }
    
    // Exponential backoff: 2^attempt * 1000ms with jitter
    const baseDelay = Math.pow(2, attempt) * 1000;
    const jitter = Math.random() * 1000;
    return Math.min(baseDelay + jitter, 60000); // Max 60 seconds
  }

  static async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Gemini AI Service for KwikkConnect
 * Handles all AI-powered features including chat, case analysis, expert matching, and postmortem generation
 */
class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.proModel = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Rate limiting configuration
    this.lastRequestTime = 0;
    this.minRequestInterval = 1000; // 1 second between requests
    this.maxRetries = 3;
  }

  /**
   * Rate limiting helper
   */
  async rateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await GeminiErrorHandler.sleep(waitTime);
    }
    
    this.lastRequestTime = Date.now();
  }

  /**
   * Generic API call wrapper with retry logic
   */
  async callWithRetry(apiCall, fallbackResponse, maxRetries = this.maxRetries) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.rateLimit();
        return await apiCall();
      } catch (error) {
        lastError = error;
        console.error(`API call attempt ${attempt} failed:`, error);
        
        // Don't retry on certain errors
        if (!GeminiErrorHandler.isQuotaExceeded(error) && 
            !GeminiErrorHandler.isNetworkError(error)) {
          break;
        }
        
        // Don't wait after the last attempt
        if (attempt < maxRetries) {
          const delay = GeminiErrorHandler.getRetryDelay(error, attempt);
          console.log(`Retrying in ${delay}ms...`);
          await GeminiErrorHandler.sleep(delay);
        }
      }
    }
    
    // All retries failed, return fallback response
    console.error('All retry attempts failed, using fallback response');
    return this.handleApiError(lastError, fallbackResponse);
  }

  /**
   * Handle API errors and provide user-friendly responses
   */
  handleApiError(error, fallbackResponse) {
    if (GeminiErrorHandler.isQuotaExceeded(error)) {
      return {
        ...fallbackResponse,
        error: true,
        errorMessage: 'AI service is temporarily busy due to high demand. Please try again in a few minutes.',
        errorType: 'quota_exceeded'
      };
    }
    
    if (GeminiErrorHandler.isNetworkError(error)) {
      return {
        ...fallbackResponse,
        error: true,
        errorMessage: 'Network connection issue. Please check your internet connection and try again.',
        errorType: 'network_error'
      };
    }
    
    return {
      ...fallbackResponse,
      error: true,
      errorMessage: 'AI service is temporarily unavailable. Please try again later.',
      errorType: 'service_error'
    };
  }

  /**
   * General chat assistant for floating AI widget
   */
  async chatAssistant(prompt, caseContext = null) {
    const fallbackResponse = 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact support if the issue persists.';
    
    return this.callWithRetry(async () => {
      let contextualPrompt = prompt;
      
      if (caseContext) {
        contextualPrompt = `
Context: You are an AI assistant helping with case "${caseContext.title}" (ID: ${caseContext.id})
Case Details: ${caseContext.description}
Module: ${caseContext.module}
Severity: ${caseContext.severity}
Status: ${caseContext.status}

User Question: ${prompt}

Please provide helpful, technical guidance related to this case. Be concise but informative.
        `;
      } else {
        contextualPrompt = `
You are KwikkConnect's AI assistant, helping with IT incident management and expert collaboration.
Provide helpful, professional responses about case management, troubleshooting, or technical guidance.

User Question: ${prompt}
        `;
      }

      const result = await this.model.generateContent(contextualPrompt);
      const response = await result.response;
      return response.text();
    }, fallbackResponse);
  }

  /**
   * Analyze case and suggest experts based on case details
   */
  async analyzeCase(caseData) {
    const fallbackResponse = {
      expertiseAreas: [caseData?.module || "General IT Support", "System Administration", "Troubleshooting"],
      troubleshootingSteps: [
        "Review system logs for error patterns",
        "Check system resource utilization", 
        "Verify configuration settings",
        "Test core functionality"
      ],
      potentialCauses: [
        "Configuration issue requiring review",
        "Resource limitation or capacity issue",
        "Network connectivity problem",
        "Service dependency failure"
      ],
      urgencyLevel: caseData?.severity || "medium",
      recommendations: "Manual analysis required. Please engage appropriate technical experts to investigate this issue further."
    };

    return this.callWithRetry(async () => {
      const prompt = `
Analyze this IT incident case and provide expert matching recommendations:

Title: ${caseData.title}
Description: ${caseData.description}
Module: ${caseData.module}
Severity: ${caseData.severity}

Based on this information, suggest 3 types of experts that would be most suitable:
1. Primary expertise area
2. Secondary skills needed
3. Experience level required

Also provide:
- Initial troubleshooting steps
- Potential root causes
- Urgency assessment

Format your response as JSON with these fields:
{
  "expertiseAreas": ["area1", "area2", "area3"],
  "troubleshootingSteps": ["step1", "step2", "step3"],
  "potentialCauses": ["cause1", "cause2"],
  "urgencyLevel": "high|medium|low",
  "recommendations": "detailed analysis"
}
      `;

      const result = await this.proModel.generateContent(prompt);
      const response = await result.response;
      
      try {
        return JSON.parse(response.text());
      } catch {
        // Fallback if JSON parsing fails
        return {
          expertiseAreas: [caseData.module, "System Administration", "Troubleshooting"],
          troubleshootingSteps: ["Check system logs", "Verify configuration", "Test connectivity"],
          potentialCauses: ["Configuration issue", "Resource limitation"],
          urgencyLevel: caseData.severity,
          recommendations: response.text()
        };
      }
    }, fallbackResponse);
  }

  /**
   * Summarize chat log for late joiners in swarm room
   */
  async summarizeChatLog(chatMessages, caseDetails) {
    const fallbackResponse = `Chat summary temporarily unavailable due to high AI service demand. 

**Current Case:** ${caseDetails?.title || 'Technical Issue'}
**Status:** Active collaboration in progress
**Recent Activity:** Please review the last 5-10 messages for current status and next steps.

The team is actively working on resolution. Please join the conversation to get up to speed.`;

    return this.callWithRetry(async () => {
      const chatText = chatMessages.map(msg => 
        `${msg.sender}: ${msg.content}`
      ).join('\n');

      const prompt = `
You are summarizing a technical collaboration session for late joiners.

Case: ${caseDetails.title}
Description: ${caseDetails.description}

Chat Log:
${chatText}

Provide a concise summary (2-3 paragraphs) covering:
1. Current status and what has been discovered
2. Key actions taken or planned
3. Next steps or pending items

Keep it professional and technical, focusing on actionable information.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }, fallbackResponse);
  }

  /**
   * Suggest quick fixes based on case details and current context
   */
  async suggestQuickFix(caseDetails, chatContext = '') {
    const fallbackResponse = `**Quick Fix Suggestion**

Based on the case details for "${caseDetails?.title || 'the current issue'}", here are some general troubleshooting steps:

**Immediate Actions:**
1. Check system status and error logs
2. Verify service availability and connectivity
3. Review recent configuration changes
4. Restart affected services if safe to do so

**Risk Level:** Low to Medium
**Expected Outcome:** Initial diagnostics and potential quick resolution

Please consult with technical experts in the chat for more specific guidance.`;

    return this.callWithRetry(async () => {
      const prompt = `
Provide a quick fix suggestion for this technical issue:

Case: ${caseDetails.title}
Description: ${caseDetails.description}
Module: ${caseDetails.module}
Severity: ${caseDetails.severity}

${chatContext ? `Current Discussion Context: ${chatContext}` : ''}

Suggest:
1. One immediate action that can be taken
2. Step-by-step instructions (max 5 steps)
3. Expected outcome
4. Risk level (low/medium/high)

Format as a clear, actionable recommendation that a technical expert can execute.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }, fallbackResponse);
  }

  /**
   * Find similar past cases for reference
   */
  async findSimilarCases(currentCase, pastCases = []) {
    const fallbackResponse = `**Similar Cases Analysis**

Unable to perform AI-powered analysis at this time. Here are some general recommendations:

**Manual Review Suggested:**
- Search case history for similar keywords: "${currentCase?.module}", "${currentCase?.title}"
- Review cases with similar severity levels
- Check recent incidents in the same system/module

**Common Solutions to Consider:**
- Configuration rollback if recent changes were made
- Service restart procedures
- Network connectivity verification
- Resource utilization checks

Please consult with experienced team members who may have encountered similar issues.`;

    return this.callWithRetry(async () => {
      const prompt = `
Current Issue:
Title: ${currentCase.title}
Description: ${currentCase.description}
Module: ${currentCase.module}

Find similar patterns from past cases and suggest solutions:

${pastCases.length > 0 ? 
  'Past Cases: ' + pastCases.map(c => `${c.title} (${c.module}) - Status: ${c.status}`).join('\n') 
  : 'No past case data available'}

Provide:
1. Similar issue patterns identified
2. Common solutions that worked
3. Lessons learned
4. Preventive measures

If no similar cases found, suggest general troubleshooting approaches for this type of issue.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }, fallbackResponse);
  }

  /**
   * Generate comprehensive postmortem analysis
   */
  async generatePostmortem(caseDetails, timeline, expertContributions, appliedFixes) {
    const fallbackResponse = `# Postmortem Analysis - ${caseDetails?.title || 'Technical Incident'}

## Executive Summary
Postmortem generation is temporarily unavailable due to AI service limitations. This document provides a basic template for manual completion.

## Incident Details
- **Case ID:** ${caseDetails?.id || 'N/A'}
- **Module:** ${caseDetails?.module || 'Unknown'}
- **Severity:** ${caseDetails?.severity || 'Unknown'}
- **Duration:** ${caseDetails?.resolvedAt ? 'Resolved' : 'Ongoing'}

## Timeline of Events
${timeline?.map(t => `- ${t.timestamp}: ${t.action}`).join('\n') || 'Please manually document key timeline events'}

## Applied Fixes
${appliedFixes?.map(f => `- ${f.description}`).join('\n') || 'Please document all fixes and solutions applied'}

## Expert Contributions
${expertContributions?.map(e => `- ${e.expert}: ${e.contribution}`).join('\n') || 'Please document expert contributions and insights'}

## Next Steps
1. Complete root cause analysis
2. Document lessons learned
3. Update runbooks and procedures
4. Schedule follow-up review

*This is a basic template. Please complete the detailed analysis manually.*`;

    return this.callWithRetry(async () => {
      const prompt = `
Generate a comprehensive postmortem analysis for this resolved incident:

Case Details:
Title: ${caseDetails.title}
Description: ${caseDetails.description}
Module: ${caseDetails.module}
Severity: ${caseDetails.severity}
Duration: ${caseDetails.resolvedAt ? 
  new Date(caseDetails.resolvedAt).getTime() - new Date(caseDetails.createdAt).getTime() : 'Unknown'} ms

Timeline: ${timeline.map(t => `${t.timestamp}: ${t.action}`).join('\n')}

Expert Contributions: ${expertContributions.map(e => `${e.expert}: ${e.contribution}`).join('\n')}

Applied Fixes: ${appliedFixes.map(f => `- ${f.description}`).join('\n')}

Generate a professional postmortem with:

1. EXECUTIVE SUMMARY (2-3 sentences)
2. ROOT CAUSE ANALYSIS (primary and contributing factors)
3. TIMELINE OF EVENTS (key milestones)
4. RESOLUTION DETAILS (what was done to fix it)
5. LESSONS LEARNED (3-5 key takeaways)
6. PREVENTIVE MEASURES (recommendations to prevent recurrence)
7. KNOWLEDGE BASE UPDATES (suggested documentation updates)

Format in clear sections with bullet points where appropriate.
      `;

      const result = await this.proModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }, fallbackResponse);
  }

  /**
   * Stream response for real-time chat interface
   */
  async streamChatResponse(prompt, caseContext = null, onChunk) {
    try {
      await this.rateLimit();
      
      let contextualPrompt = prompt;
      
      if (caseContext) {
        contextualPrompt = `
Context: Technical support for case "${caseContext.title}" (${caseContext.module})
Case Status: ${caseContext.status}
Severity: ${caseContext.severity}

User: ${prompt}

Provide helpful technical guidance:
        `;
      }

      const result = await this.model.generateContentStream(contextualPrompt);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text && onChunk) {
          onChunk(text);
        }
      }
    } catch (error) {
      console.error('Error in streaming chat:', error);
      if (onChunk) {
        if (GeminiErrorHandler.isQuotaExceeded(error)) {
          onChunk('AI service is temporarily busy due to high demand. Please try again in a few minutes.');
        } else {
          onChunk('I\'m experiencing technical difficulties. Please try again.');
        }
      }
    }
  }

  /**
   * Generate case summary for expert matching panel
   */
  async generateCaseSummary(caseDetails) {
    const fallbackResponse = `**Case Summary for Expert Review**

**Issue:** ${caseDetails?.title || 'Technical incident requiring expert attention'}
**Module:** ${caseDetails?.module || 'System component'}
**Severity:** ${caseDetails?.severity || 'Medium'}

**Technical Summary:** Expert analysis needed for this ${caseDetails?.module || 'system'} issue. The incident requires immediate attention from qualified technical personnel.

**Key Symptoms:** Detailed symptom analysis requires AI service availability.

**Impact Assessment:** Service impact assessment pending expert review.

**Skills Required:** ${caseDetails?.module || 'General'} expertise, troubleshooting, and incident response skills.`;

    return this.callWithRetry(async () => {
      const prompt = `
Create a concise technical summary for expert review:

Case: ${caseDetails.title}
Module: ${caseDetails.module}
Severity: ${caseDetails.severity}
Description: ${caseDetails.description}

Generate:
1. Technical summary (2-3 sentences)
2. Key symptoms
3. Impact assessment
4. Skills required for resolution

Keep it concise and technical, suitable for expert review.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }, fallbackResponse);
  }
}

// Export singleton instance
export const geminiService = new GeminiService();
export default geminiService;