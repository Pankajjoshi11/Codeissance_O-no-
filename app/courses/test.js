const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded API key (replace 'YOUR_API_KEY' with your actual API key)
const apiKey = "AIzaSyDkNMeTY3I0pxdAyIVoWVp5RjOKg-Xd6Ak"; // Replace with your actual API key

// Initialize the Google Generative AI client with the hardcoded API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model for "gemini-1.5-flash"
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the subtopics for Budgeting
const subtopics = [
  "Understanding Budgeting Basics",
  "Creating a Personal Budget",
  "Tracking Your Expenses",
  "Saving and Investing",
  "Managing Debt",
];

// Generate lessons for each subtopic
async function generateLessons() {
  const lessons = {};
  for (const subtopic of subtopics) {
    const prompt = `Write a lesson about ${subtopic} in financial literacy, approximately 250 words long.`;
    try {
      const result = await model.generateContent(prompt);
      if (result && result.response && result.response.text) {
        lessons[subtopic] = result.response.text();
      } else {
        console.error("No valid response received from the model for subtopic:", subtopic);
      }
    } catch (error) {
      console.error("Error generating lesson for subtopic:", subtopic, error);
    }
  }
  return lessons;
}

// Call the function to generate lessons and print the JSON output
generateLessons()
  .then(lessons => {
    console.log(JSON.stringify(lessons, null, 2));
  })
  .catch(error => {
    console.error("Error generating lessons:", error);
  });