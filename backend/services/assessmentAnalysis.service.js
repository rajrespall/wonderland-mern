const analyzeAssessment = (assessmentData) => {
  const { communication, emotional, routine, sensory, social } = assessmentData;
  
  // Map to ISAA domains
  const analysisResults = {
    social: analyzeDomain(social, 4, "Social Relationship and Reciprocity"),
    emotional: analyzeDomain(emotional, 3, "Emotional Responsiveness"),
    communication: analyzeDomain(communication, 4, "Speech, Language and Communication"),
    routine: analyzeDomain(routine, 3, "Behavior Patterns"),
    sensory: analyzeDomain(sensory, 3, "Sensory Aspects"),
    cognitive: { severity: 0, needsAttention: false, score: 0, label: "Cognitive Component" }
  };

  // Calculate overall ISAA score
  const totalScore = Object.values(analysisResults).reduce((sum, domain) => sum + domain.score, 0);
  const isaaCategory = categorizeIsaaScore(totalScore);
  
  return generateRecommendations(analysisResults, totalScore, isaaCategory);
};

const analyzeDomain = (answers, totalQuestions, label) => {
  // Direct mapping: value from frontend is the actual ISAA score
  // In ISAA: 1 = least severe, 5 = most severe
  const maxScore = totalQuestions * 5;
  
  // Values should be treated directly as scores (with index adjustment)
  // If user selects the first option (index 0), that's most severe (5)
  const actualScore = answers.reduce((sum, val) => sum + (5 - val), 0);
  const severityScore = actualScore / maxScore;

  return {
    severity: severityScore,
    needsAttention: severityScore > 0.5,
    score: actualScore,
    label: label
  };
};

// Adjust thresholds based on your question count (17 questions total)
const categorizeIsaaScore = (score) => {
  const totalMaxScore = 17 * 5; // 85
  
  if (score < totalMaxScore * 0.3) return "No Autism";       // < 26
  if (score <= totalMaxScore * 0.5) return "Mild Autism";     // <= 43
  if (score <= totalMaxScore * 0.7) return "Moderate Autism"; // <= 60
  return "Severe Autism";                                    // > 60
};

const generateRecommendations = (analysis, totalScore, category) => {
  const recommendations = {
    priorityAreas: [],
    recommendedResources: [],
    showResources: {},
    totalScore: totalScore,
    isaaCategory: category
  };

  // Determine priority areas based on severity
  Object.entries(analysis).forEach(([domain, result]) => {
    if (result.needsAttention) {
      recommendations.priorityAreas.push({
        domain: domain,
        label: result.label
      });
      recommendations.showResources[domain] = true;
    }
  });

  return recommendations;
};

module.exports = { analyzeAssessment };