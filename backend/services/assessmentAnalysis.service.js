const analyzeAssessment = (assessmentData) => {
    const { communication, emotional, routine, sensory, social } = assessmentData;
    
    const analysisResults = {
      communication: analyzeDomain(communication, 4),
      emotional: analyzeDomain(emotional, 3),
      routine: analyzeDomain(routine, 3),
      sensory: analyzeDomain(sensory, 3),
      social: analyzeDomain(social, 4)
    };
  
    return generateRecommendations(analysisResults);
  };
  
const analyzeDomain = (answers, totalQuestions) => {
    // Calculate severity score (0-1)
    const maxScore = totalQuestions * 4; // 4 is max answer value
    const actualScore = answers.reduce((sum, val) => sum + val, 0);
    const severityScore = actualScore / maxScore;
  
    return {
      severity: severityScore,
      needsAttention: severityScore > 0.5,
      score: actualScore
    };
  };
  
const generateRecommendations = (analysis) => {
    const recommendations = {
      priorityAreas: [],
      recommendedResources: [],
      showResources: {}
    };
  
    // Determine priority areas based on severity
    Object.entries(analysis).forEach(([domain, result]) => {
      if (result.needsAttention) {
        recommendations.priorityAreas.push(domain);
        recommendations.showResources[domain] = true;
      }
    });
  
    return recommendations;
  };
  
module.exports = { analyzeAssessment };