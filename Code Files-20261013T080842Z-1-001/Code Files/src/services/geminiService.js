const { GoogleGenAI } = require('@google/genai');

// Initialize the Gemini client using the environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generates a personalized workout recommendation using Google Gemini
const generateWorkoutRecommendation = async (age, fitnessGoal, experience) => {
  try {
    const prompt = `Generate a personalized workout recommendation for a person with the following details:
- Age: ${age}
- Fitness Goal: ${fitnessGoal}
- Experience Level: ${experience}

Please keep the recommendation extremely direct, practical, and concise (within 2-3 paragraph). Do not include any greeting, markdown bold stars (*), bullet points, or introductory phrases. Speak directly and provide a clear step-by-step execution plan also.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });
    return response.text ? response.text.trim() : 'No recommendation could be generated.';
  } catch (error) {
    console.error('Gemini Recommendation Error:', error.message);
    throw new Error('Failed to generate workout recommendation from Gemini AI');
  }
};

// Generates personalized fitness insights using Google Gemini
const generateFitnessInsights = async (totalWorkouts, averageDuration, totalCaloriesBurned) => {
  try {
    const prompt = `Analyze this user's fitness progress and generate a highly personalized, encouraging fitness insight:
- Total Workouts Logged: ${totalWorkouts}
- Average Workout Duration: ${averageDuration} minutes
- Total Calories Burned: ${totalCaloriesBurned} kcal

Please keep the insight extremely direct, actionable, and concise (within 2-3 sentences). Do not include any greeting, markdown bold stars (*), bullet points, or introductory phrases. Provide guidance on what to adjust or continue.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text ? response.text.trim() : 'No insight could be generated.';
  } catch (error) {
    console.error('Gemini Insights Error:', error.message);
    throw new Error('Failed to generate fitness insights from Gemini AI');
  }
};

module.exports = {
  generateWorkoutRecommendation,
  generateFitnessInsights,
};
