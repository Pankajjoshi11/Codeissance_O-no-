"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight } from "lucide-react";

const retirementData = {
  name: "Retirement Planning",
  topics: [
    "Understanding Retirement Needs",
    "Types of Retirement Accounts",
    "Calculating Retirement Savings",
    "Social Security Benefits",
    "Investment Strategies for Retirement",
    "Retirement Withdrawals",
    "Common Retirement Mistakes",
    "Planning for Healthcare Costs",
  ],
  quiz: [
    {
      question: "What is the recommended retirement savings goal?",
      options: [
        "1x your salary",
        "3x your salary",
        "10x your salary",
        "At least 15x your salary",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "Which of the following is a tax-advantaged retirement account?",
      options: ["Traditional IRA", "Roth IRA", "401(k)", "All of the above"],
      correctAnswer: 3,
    },
    {
      question: "What is the purpose of Social Security?",
      options: [
        "To provide health insurance",
        "To support retirees financially",
        "To fund educational expenses",
        "To pay off debts",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "At what age can you start withdrawing from a 401(k) without penalty?",
      options: ["55", "59½", "62", "65"],
      correctAnswer: 1,
    },
    {
      question: "What does dollar-cost averaging mean?",
      options: [
        "Investing the same amount regularly, regardless of market conditions",
        "Timing the market for maximum returns",
        "Investing all funds at once",
        "Buying only high-performing stocks",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is a common mistake in retirement planning?",
      options: [
        "Starting to save early",
        "Underestimating expenses",
        "Investing in a diversified portfolio",
        "Contributing to retirement accounts",
      ],
      correctAnswer: 1,
    },
    {
      question: "How can healthcare costs impact retirement savings?",
      options: [
        "They are not a concern",
        "They can significantly deplete savings",
        "They are always covered by insurance",
        "They only affect those over 70",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a common rule of thumb for retirement savings?",
      options: [
        "Save 10% of your income",
        "Save 15% of your income",
        "Save as much as you can",
        "Only save what you can afford",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the best strategy for retirement withdrawals?",
      options: [
        "Withdraw a fixed percentage annually",
        "Withdraw based on market performance",
        "Only withdraw when necessary",
        "Withdraw the entire amount at once",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the purpose of a retirement plan?",
      options: [
        "To save for future expenses",
        "To ensure a steady income in retirement",
        "To manage taxes efficiently",
        "All of the above",
      ],
      correctAnswer: 3,
    },
  ],
};

export default function RetirementComponent() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState(retirementData.topics[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleTopicComplete = (topic: string) => {
    if (!completedTopics.includes(topic)) {
      setCompletedTopics([...completedTopics, topic]);
    }
    const nextTopicIndex = retirementData.topics.indexOf(topic) + 1;
    if (nextTopicIndex < retirementData.topics.length) {
      setCurrentTopic(retirementData.topics[nextTopicIndex]);
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
        <h2 className="text-xl font-bold mb-4 text-black">Retirement Topics</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {retirementData.topics.map((topic, index) => (
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
                questions={retirementData.quiz}
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
    case "Understanding Retirement Needs":
      return "Understanding how much money you will need for retirement is crucial for effective planning. Consider factors like lifestyle, expenses, and life expectancy.";
    case "Types of Retirement Accounts":
      return "Common retirement accounts include Traditional IRAs, Roth IRAs, and 401(k)s. Each has unique benefits and tax implications.";
    case "Calculating Retirement Savings":
      return "Calculating how much to save for retirement involves considering your desired retirement age, expected expenses, and other income sources.";
    case "Social Security Benefits":
      return "Social Security can provide a steady income during retirement. Understanding how benefits work and when to claim them is vital for planning.";
    case "Investment Strategies for Retirement":
      return "Investment strategies should align with your retirement goals, risk tolerance, and time horizon. Diversification is key to managing risk.";
    case "Retirement Withdrawals":
      return "Knowing how and when to withdraw funds from your retirement accounts can impact your financial stability. Consider strategies to minimize taxes.";
    case "Common Retirement Mistakes":
      return "Common mistakes include underestimating expenses, not saving enough, and failing to plan for healthcare costs. Avoiding these can improve retirement security.";
    case "Planning for Healthcare Costs":
      return "Healthcare can be a significant expense in retirement. Planning for insurance, out-of-pocket costs, and long-term care is essential.";
    default:
      return "Select a topic to learn more about retirement planning.";
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

function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">
        {question.question}
      </h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(index === question.correctAnswer)}
            className="w-full text-white"
          >
            {option}
          </Button>
        ))}
      </div>
      <Progress
        value={((currentQuestion + 1) / questions.length) * 100}
        className="mt-4"
      />
    </div>
  );
}

interface LeaderboardProps {
  score: number;
}

function Leaderboard({ score }: LeaderboardProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Quiz Complete!</h2>
      <p className="text-black">Your Score: {score}</p>
      <Button
        onClick={() => window.location.reload()}
        className="mt-4 bg-[#4f47e6] text-white hover:bg-[#4f47e6]/90"
      >
        Retake Quiz
      </Button>
    </div>
  );
}
