"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight } from "lucide-react";

const investingData = {
  name: "Investing Basics",
  topics: [
    "Understanding Investments",
    "Types of Investments",
    "Risk and Return",
    "Diversification",
    "Investment Strategies",
    "Market Analysis",
    "Retirement Accounts",
    "Common Investment Mistakes",
  ],
  quiz: [
    {
      question: "What is an investment?",
      options: [
        "A way to save money",
        "Putting money into an asset to earn returns",
        "Spending money on luxury items",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of the following is a type of investment?",
      options: ["Stocks", "Bonds", "Real Estate", "All of the above"],
      correctAnswer: 3,
    },
    {
      question: "What does risk refer to in investing?",
      options: [
        "The chance of losing money",
        "The potential for high returns",
        "The amount invested",
        "The duration of the investment",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is diversification?",
      options: [
        "Investing in a single stock",
        "Spreading investments across different assets",
        "Keeping all money in cash",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a common investment strategy for beginners?",
      options: [
        "Day trading",
        "Buy and hold",
        "Penny stocks",
        "Timing the market",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is fundamental analysis?",
      options: [
        "Analyzing financial statements and company performance",
        "Studying market trends",
        "Evaluating the overall economy",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is a 401(k)?",
      options: [
        "A type of investment account for retirement",
        "A mutual fund",
        "A savings account",
        "A stock option",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is a common mistake new investors make?",
      options: [
        "Researching investments",
        "Investing without a plan",
        "Diversifying their portfolio",
        "Using dollar-cost averaging",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does 'buy low, sell high' mean?",
      options: [
        "Investing in stocks after they rise",
        "Buying assets at a low price and selling at a higher price",
        "Keeping assets until they lose value",
        "Investing in bonds",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the purpose of an index fund?",
      options: [
        "To replicate the performance of a market index",
        "To invest in startup companies",
        "To focus on a single stock",
        "To generate high returns quickly",
      ],
      correctAnswer: 0,
    },
  ],
};

export default function InvestingComponent() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleTopicComplete = () => {
    const topic = investingData.topics[currentTopicIndex];
    if (!completedTopics.includes(topic)) {
      setCompletedTopics([...completedTopics, topic]);
    }

    const nextTopicIndex = currentTopicIndex + 1;
    if (nextTopicIndex < investingData.topics.length) {
      setCurrentTopicIndex(nextTopicIndex);
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
        <h2 className="text-xl font-bold mb-4 text-black">Investing Topics</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {investingData.topics.map((topic, index) => (
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
                onClick={handleTopicComplete}
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
                {investingData.topics[currentTopicIndex]}
              </h1>
              <p className="mb-4 text-black">
                {getTopicContent(investingData.topics[currentTopicIndex])}
              </p>
              <Button
                onClick={handleTopicComplete}
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
                questions={investingData.quiz}
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
    case "Understanding Investments":
      return "Investments are assets purchased with the expectation of generating income or appreciation over time. Understanding how investments work is crucial for building wealth.";
    case "Types of Investments":
      return "Common types of investments include stocks, bonds, real estate, and mutual funds. Each type has its own risk and return profile.";
    case "Risk and Return":
      return "Risk refers to the potential of losing money on an investment, while return is the gain or loss made on the investment. Higher risk often leads to higher potential returns.";
    case "Diversification":
      return "Diversification involves spreading investments across various assets to reduce risk. It helps protect your portfolio from market volatility.";
    case "Investment Strategies":
      return "Investment strategies can vary from passive (buy and hold) to active (trading). Understanding different strategies helps investors meet their financial goals.";
    case "Market Analysis":
      return "Market analysis involves evaluating securities and market trends to make informed investment decisions. It includes both fundamental and technical analysis.";
    case "Retirement Accounts":
      return "Retirement accounts, such as 401(k)s and IRAs, provide tax advantages for saving for retirement. Understanding these accounts can maximize your retirement savings.";
    case "Common Investment Mistakes":
      return "Common investment mistakes include emotional investing, lack of research, and failing to diversify. Avoiding these pitfalls is key to successful investing.";
    default:
      return "Select a topic to learn more about investing.";
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (index: number) => {
    setUserAnswers([...userAnswers, index]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const score = userAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    onComplete(score);
  };

  return (
    <div>
      {!showResults ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {questions[currentQuestionIndex].question}
          </h2>
          <div className="space-y-2">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                className="w-full text-white border-[#4f47e6] hover:bg-[#4f47e6] hover:text-white"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p>
            Your Score:{" "}
            {
              userAnswers.filter(
                (answer, index) => answer === questions[index].correctAnswer
              ).length
            }
            /{questions.length}
          </p>
          <Button
            onClick={() => onComplete(0)}
            className="mt-4 bg-[#4f47e6] text-white hover:bg-[#4f47e6]/90"
          >
            Finish
          </Button>
        </div>
      )}
    </div>
  );
}

interface LeaderboardProps {
  score: number;
}

function Leaderboard({ score }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">Thank you for participating!</p>
        <p className="font-bold">Your Score: {score}</p>
        <Progress value={(score / 10) * 100} className="mt-2" />
      </CardContent>
    </Card>
  );
}
