"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight } from "lucide-react";

const savingData = {
  name: "Saving Strategies",
  topics: [
    "Importance of Saving",
    "Types of Savings Accounts",
    "Emergency Funds",
    "Saving for Goals",
    "High-Interest Savings Accounts",
    "Compound Interest",
    "Budgeting for Savings",
    "Common Saving Mistakes",
  ],
  quiz: [
    {
      question: "What is the recommended amount to have in an emergency fund?",
      options: [
        "1 month of expenses",
        "3-6 months of expenses",
        "1 year of expenses",
        "No specific amount",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which type of savings account typically offers the highest interest rate?",
      options: [
        "Regular savings account",
        "High-yield savings account",
        "Money market account",
        "Certificate of Deposit (CD)",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is compound interest?",
      options: [
        "Interest on the principal only",
        "Interest on the principal and accumulated interest",
        "A fixed interest rate",
        "Interest that is never compounded",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a common saving goal?",
      options: [
        "Buying a house",
        "Going on vacation",
        "Building an emergency fund",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      question: "What is the first step to effective budgeting?",
      options: [
        "Tracking income and expenses",
        "Cutting all expenses",
        "Setting savings goals",
        "Investing in stocks",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which of the following is a common mistake when saving?",
      options: [
        "Not starting early enough",
        "Saving too much",
        "Using a high-yield savings account",
        "Having a detailed savings plan",
      ],
      correctAnswer: 0,
    },
    {
      question: "Why is it important to set specific savings goals?",
      options: [
        "To have something to save for",
        "It makes saving easier and more focused",
        "To motivate yourself to save",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      question: "What is the purpose of an emergency fund?",
      options: [
        "To save for retirement",
        "To cover unexpected expenses",
        "To invest in stocks",
        "To buy a house",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "What percentage of your income is generally recommended to save?",
      options: ["5%", "10%", "15%", "20%"],
      correctAnswer: 2,
    },
    {
      question: "How can automatic transfers help with saving?",
      options: [
        "They make saving effortless",
        "They ensure consistent saving",
        "They help avoid spending the money",
        "All of the above",
      ],
      correctAnswer: 3,
    },
  ],
};

export default function SavingComponent() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState(savingData.topics[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleTopicComplete = (topic: string) => {
    if (!completedTopics.includes(topic)) {
      setCompletedTopics([...completedTopics, topic]);
    }
    const nextTopicIndex = savingData.topics.indexOf(topic) + 1;
    if (nextTopicIndex < savingData.topics.length) {
      setCurrentTopic(savingData.topics[nextTopicIndex]);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setShowLeaderboard(true);
  };

  return (
    <div className="flex h-screen bg-[#171717] text-black">
      <div className="w-64 border-r border-[#4f47e6]/20 p-4 bg-white">
        <h2 className="text-xl font-bold mb-4 text-black">Saving Topics</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {savingData.topics.map((topic, index) => (
              <Button
                key={topic}
                variant={
                  completedTopics.includes(topic) ? "default" : "outline"
                }
                className={`w-full justify-start ${
                  completedTopics.includes(topic)
                    ? "bg-[#4f47e6] text-white"
                    : "text-black border-[#4f47e6]"
                }`}
                onClick={() => handleTopicComplete(topic)}
              >
                {completedTopics.includes(topic) && (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                {topic}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <main className="flex-1 p-6 overflow-auto bg-white">
        <AnimatePresence mode="wait">
          {!showQuiz && !showLeaderboard && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-6 text-black">
                {currentTopic}
              </h1>
              <p className="mb-4 text-black">{getTopicContent(currentTopic)}</p>
              <Button
                onClick={() => handleTopicComplete(currentTopic)}
                className="bg-[#4f47e6] text-white hover:bg-[#4f47e6]/90"
              >
                Complete Topic <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
          {showQuiz && !showLeaderboard && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Quiz
                questions={savingData.quiz}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}
          {showLeaderboard && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Leaderboard score={score} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function getTopicContent(topic: string) {
  switch (topic) {
    case "Importance of Saving":
      return "Saving money is essential for financial stability and achieving your financial goals. It provides a safety net for unexpected expenses and helps build wealth over time.";
    case "Types of Savings Accounts":
      return "There are several types of savings accounts, including regular savings accounts, high-yield savings accounts, and money market accounts, each with its features and benefits.";
    case "Emergency Funds":
      return "An emergency fund is crucial to cover unexpected expenses like medical emergencies or car repairs. Aim to save at least 3-6 months' worth of living expenses.";
    case "Saving for Goals":
      return "Setting specific savings goals, whether for a vacation, new car, or home, can motivate you to save and help you achieve your dreams.";
    case "High-Interest Savings Accounts":
      return "High-yield savings accounts offer better interest rates than traditional savings accounts, making your money work harder for you.";
    case "Compound Interest":
      return "Compound interest allows your savings to grow faster as you earn interest on your initial investment and the interest that accumulates over time.";
    case "Budgeting for Savings":
      return "Budgeting is vital for effective saving. By tracking your income and expenses, you can identify areas to cut back and allocate more towards savings.";
    case "Common Saving Mistakes":
      return "Common saving mistakes include not having a clear goal, failing to automate savings, and neglecting to track progress. Avoiding these pitfalls can lead to better savings outcomes.";
    default:
      return "Select a topic to learn more about saving strategies.";
  }
}

interface QuizProps {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (index === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      onComplete(score + (index === currentQuestion.correctAnswer ? 1 : 0));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <Button
            key={option}
            variant="outline"
            onClick={() => handleOptionClick(index)}
            className="w-full text-black"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

interface LeaderboardProps {
  score: number;
}

const Leaderboard = ({ score }: LeaderboardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quiz Completed!</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg">
          Your Score: {score}/{savingData.quiz.length}
        </h3>
        <Progress
          value={(score / savingData.quiz.length) * 100}
          className="mt-4"
        />
      </CardContent>
    </Card>
  );
};
