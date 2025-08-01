// Expert Matching Service for KwikkConnect
class ExpertMatchingService {
  constructor() {
    this.expertsDatabase = this.initializeExpertsDatabase();
    this.caseHistory = this.initializeCaseHistory();
  }

  initializeExpertsDatabase() {
    return [
      {
        id: "exp-001",
        name: "Dr. Michael Chen",
        title: "Senior Database Architect",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        availability: "available",
        successRate: 96,
        casesResolved: 247,
        avgResponseTime: 5,
        skills: ["PostgreSQL", "Connection Pooling", "Performance Tuning", "Database Architecture", "Query Optimization", "Monitoring"],
        specializations: ["Database Management", "Performance Optimization", "System Architecture"],
        timezone: "PST",
        currentWorkload: 0.3,
        recentCases: ["CASE-2024-089", "CASE-2024-092", "CASE-2024-095"],
        certifications: ["AWS Database Specialty", "PostgreSQL Professional"],
        experience: 12
      },
      {
        id: "exp-002",
        name: "Elena Rodriguez",
        title: "DevOps Engineering Lead",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        availability: "busy",
        successRate: 92,
        casesResolved: 189,
        avgResponseTime: 12,
        skills: ["Infrastructure", "Database Scaling", "Load Balancing", "Monitoring", "AWS RDS", "Docker"],
        specializations: ["DevOps", "Infrastructure", "Cloud Architecture"],
        timezone: "EST",
        currentWorkload: 0.8,
        recentCases: ["CASE-2024-087", "CASE-2024-090"],
        certifications: ["AWS Solutions Architect", "Kubernetes Administrator"],
        experience: 8
      },
      {
        id: "exp-003",
        name: "James Wilson",
        title: "Backend Systems Specialist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        availability: "available",
        successRate: 89,
        casesResolved: 156,
        avgResponseTime: 8,
        skills: ["API Development", "Database Integration", "Connection Management", "Troubleshooting", "Node.js", "Redis"],
        specializations: ["Backend Development", "System Integration", "API Design"],
        timezone: "CST",
        currentWorkload: 0.4,
        recentCases: ["CASE-2024-088", "CASE-2024-091"],
        certifications: ["Node.js Certified Developer", "Redis Professional"],
        experience: 6
      },
      {
        id: "exp-004",
        name: "Dr. Sarah Kim",
        title: "Senior Database Administrator",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        availability: "available",
        successRate: 94,
        casesResolved: 203,
        avgResponseTime: 6,
        skills: ["Database Administration", "Connection Pooling", "Performance Tuning", "Backup & Recovery", "Security", "PostgreSQL"],
        specializations: ["Database Administration", "Performance Optimization", "Security"],
        timezone: "PST",
        currentWorkload: 0.2,
        recentCases: ["CASE-2024-086", "CASE-2024-089", "CASE-2024-093"],
        certifications: ["Oracle DBA", "PostgreSQL Professional", "CISSP"],
        experience: 10
      },
      {
        id: "exp-005",
        name: "Alex Thompson",
        title: "Cloud Infrastructure Engineer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        availability: "available",
        successRate: 91,
        casesResolved: 178,
        avgResponseTime: 10,
        skills: ["Cloud Infrastructure", "Database Scaling", "AWS RDS", "Load Balancing", "Monitoring", "Terraform"],
        specializations: ["Cloud Architecture", "Infrastructure as Code", "DevOps"],
        timezone: "EST",
        currentWorkload: 0.5,
        recentCases: ["CASE-2024-085", "CASE-2024-088", "CASE-2024-092"],
        certifications: ["AWS Solutions Architect", "Kubernetes Administrator", "Terraform Associate"],
        experience: 7
      }
    ];
  }

  initializeCaseHistory() {
    return [
      {
        id: "CASE-2024-089",
        title: "Database Connection Pool Exhaustion",
        module: "Database Management",
        severity: "high",
        resolvedBy: "exp-001",
        resolutionTime: 45,
        skills: ["Connection Pooling", "PostgreSQL", "Performance Tuning"],
        status: "resolved"
      },
      {
        id: "CASE-2024-087",
        title: "Database Scaling Issues",
        module: "Infrastructure",
        severity: "medium",
        resolvedBy: "exp-002",
        resolutionTime: 120,
        skills: ["Database Scaling", "AWS RDS", "Load Balancing"],
        status: "resolved"
      },
      {
        id: "CASE-2024-088",
        title: "API Database Connection Timeout",
        module: "Backend Systems",
        severity: "high",
        resolvedBy: "exp-003",
        resolutionTime: 60,
        skills: ["Database Integration", "Connection Management", "Troubleshooting"],
        status: "resolved"
      }
    ];
  }

  calculateSkillRelevance(caseData, expertSkills) {
    const caseKeywords = this.extractKeywords(caseData);
    let matchedSkills = 0;
    let totalRelevance = 0;

    expertSkills.forEach(skill => {
      const keywordMatch = caseKeywords.some(keyword => 
        skill.toLowerCase().includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(skill.toLowerCase())
      );

      if (keywordMatch) {
        totalRelevance += 1;
        matchedSkills++;
      }
    });

    return matchedSkills > 0 ? (totalRelevance / expertSkills.length) * 100 : 0;
  }

  extractKeywords(caseData) {
    const text = `${caseData.title} ${caseData.description} ${caseData.module}`;
    const keywords = [
      'database', 'connection', 'timeout', 'pool', 'postgresql', 'mysql', 'oracle',
      'performance', 'tuning', 'scaling', 'infrastructure', 'monitoring', 'aws',
      'api', 'backend', 'integration', 'troubleshooting', 'architect', 'administration'
    ];

    return keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  calculateAvailabilityScore(expert) {
    if (expert.availability === 'available') {
      return 100 - (expert.currentWorkload * 100);
    }
    return 0;
  }

  calculateResponseTimeScore(expert) {
    const maxResponseTime = 30;
    return Math.max(0, 100 - (expert.avgResponseTime / maxResponseTime) * 100);
  }

  calculateSuccessRateScore(expert) {
    return expert.successRate;
  }

  calculateCaseSimilarityScore(caseData, expert) {
    const similarCases = this.caseHistory.filter(historyCase => 
      historyCase.resolvedBy === expert.id && 
      historyCase.status === 'resolved'
    );

    if (similarCases.length === 0) return 0;

    const relevantCases = similarCases.filter(historyCase => {
      const caseKeywords = this.extractKeywords(historyCase);
      const currentKeywords = this.extractKeywords(caseData);
      
      return caseKeywords.some(keyword => 
        currentKeywords.includes(keyword)
      );
    });

    return (relevantCases.length / similarCases.length) * 100;
  }

  calculateMatchPercentage(caseData, expert) {
    const skillRelevance = this.calculateSkillRelevance(caseData, expert.skills);
    const availability = this.calculateAvailabilityScore(expert);
    const responseTime = this.calculateResponseTimeScore(expert);
    const successRate = this.calculateSuccessRateScore(expert);
    const caseSimilarity = this.calculateCaseSimilarityScore(caseData, expert);

    const weights = {
      skillRelevance: 0.35,
      availability: 0.20,
      responseTime: 0.15,
      successRate: 0.25,
      caseSimilarity: 0.05
    };

    const matchPercentage = (
      skillRelevance * weights.skillRelevance +
      availability * weights.availability +
      responseTime * weights.responseTime +
      successRate * weights.successRate +
      caseSimilarity * weights.caseSimilarity
    );

    return Math.round(matchPercentage);
  }

  async matchExperts(caseData) {
    const startTime = Date.now();
    
    const expertsWithScores = this.expertsDatabase.map(expert => ({
      ...expert,
      matchPercentage: this.calculateMatchPercentage(caseData, expert),
      skillRelevance: this.calculateSkillRelevance(caseData, expert.skills),
      availabilityScore: this.calculateAvailabilityScore(expert),
      responseTimeScore: this.calculateResponseTimeScore(expert),
      caseSimilarityScore: this.calculateCaseSimilarityScore(caseData, expert)
    }));

    const sortedExperts = expertsWithScores.sort((a, b) => b.matchPercentage - a.matchPercentage);
    const qualifiedExperts = sortedExperts.filter(expert => expert.matchPercentage >= 60);

    const analysisTime = Date.now() - startTime;

    return {
      experts: qualifiedExperts,
      analysisTime,
      expertsEvaluated: this.expertsDatabase.length,
      overallConfidence: this.calculateOverallConfidence(qualifiedExperts),
      criteria: [
        { name: "Skill Relevance", weight: 35 },
        { name: "Success Rate", weight: 25 },
        { name: "Availability", weight: 20 },
        { name: "Response Time", weight: 15 },
        { name: "Case Similarity", weight: 5 }
      ],
      keyFactors: this.generateKeyFactors(caseData, qualifiedExperts)
    };
  }

  calculateOverallConfidence(experts) {
    if (experts.length === 0) return 0;
    
    const avgMatchPercentage = experts.reduce((sum, expert) => sum + expert.matchPercentage, 0) / experts.length;
    const topExpertScore = experts[0]?.matchPercentage || 0;
    
    return Math.min(0.95, (avgMatchPercentage + topExpertScore) / 200);
  }

  generateKeyFactors(caseData, experts) {
    const factors = [];
    
    if (experts.length > 0) {
      const topExpert = experts[0];
      
      const relevantSkills = topExpert.skills
        .slice(0, 3)
        .map(skill => `${skill} expertise`);
      
      factors.push(...relevantSkills);
      
      if (topExpert.availability === 'available') {
        factors.push('Available for immediate response');
      }
      
      if (topExpert.successRate > 90) {
        factors.push('High success rate with similar issues');
      }
      
      if (topExpert.caseSimilarityScore > 50) {
        factors.push('Recent similar case resolution');
      }
    }
    
    return factors.slice(0, 5);
  }

  getExpertById(expertId) {
    return this.expertsDatabase.find(expert => expert.id === expertId);
  }

  updateExpertAvailability(expertId, availability) {
    const expert = this.expertsDatabase.find(e => e.id === expertId);
    if (expert) {
      expert.availability = availability;
    }
  }

  addCaseToHistory(caseData) {
    this.caseHistory.push({
      id: caseData.id,
      title: caseData.title,
      module: caseData.module,
      severity: caseData.severity,
      status: 'open',
      createdAt: new Date().toISOString()
    });
  }
}

const expertMatchingService = new ExpertMatchingService();

export default expertMatchingService; 