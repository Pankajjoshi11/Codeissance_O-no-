"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Trophy,
  CheckCircle,
  User,
} from "lucide-react"; // Added User icon for leaderboard
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const subtopics = [
  "Introduction to Budgeting",
  "Creating a Budget Plan",
  "Understanding Income and Expenses",
  "Tracking Your Spending",
  "Saving and Investing",
  "Debt Management",
  "Financial Goal Setting",
  "Reviewing and Adjusting Your Budget",
];

const subtopicContents = [
  "Budgeting is a financial plan that helps you allocate your income to various expenses. It is essential for managing finances effectively and achieving financial goals.",
  "Creating a budget plan involves determining your income sources and listing all your expenses. Start by categorizing your expenses into fixed and variable costs.",
  "Understanding your income and expenses is crucial for effective budgeting. Track all sources of income and categorize your expenses to see where your money is going.",
  "Tracking your spending can help you identify areas where you may be overspending. Use tools like apps or spreadsheets to keep track of your expenses daily.",
  "Saving and investing are critical components of a sound financial strategy. Allocate a portion of your income to savings and consider investment options for long-term growth.",
  "Debt management involves understanding your debts and creating a plan to pay them off. Prioritize high-interest debts and consider consolidation options if needed.",
  "Setting financial goals gives you direction. Define short-term and long-term goals, and ensure your budget aligns with these goals to track your progress.",
  "Regularly reviewing and adjusting your budget helps you stay on track. Monitor your progress and make necessary adjustments to align with your changing financial situation.",
];

const quizQuestions = [
  {
    question: "What is the primary purpose of budgeting?",
    options: [
      "To restrict spending",
      "To plan for future expenses",
      "To make a profit",
      "To reduce savings",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which of the following is considered a fixed expense?",
    options: ["Groceries", "Utilities", "Rent", "Entertainment"],
    correctAnswer: 2,
  },
  {
    question: "What should you do first when creating a budget?",
    options: [
      "List all expenses",
      "Determine your income",
      "Set financial goals",
      "Track past spending",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is an emergency fund?",
    options: [
      "A fund for entertainment",
      "Savings for unexpected expenses",
      "Money set aside for investments",
      "A type of loan",
    ],
    correctAnswer: 1,
  },
  {
    question: "How often should you review your budget?",
    options: ["Daily", "Monthly", "Annually", "Never"],
    correctAnswer: 1,
  },
];

export default function Component() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState(
    Array(quizQuestions.length).fill(null)
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alice", score: 95, avatar: "A" },
    { name: "Bob", score: 88, avatar: "B" },
    { name: "Charlie", score: 82, avatar: "C" },
  ]);

  useEffect(() => {
    setProgress(((currentTopic + 1) / subtopics.length) * 100);
  }, [currentTopic]);

  const handleNext = () => {
    if (currentTopic < subtopics.length - 1) {
      setCurrentTopic(currentTopic + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevious = () => {
    if (currentTopic > 0) {
      setCurrentTopic(currentTopic - 1);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleQuizSubmit = () => {
    const score = quizAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    setQuizScore(score);
    setLeaderboard((prev) =>
      [...prev, { name: "You", score: score * 20, avatar: "Y" }].sort(
        (a, b) => b.score - a.score
      )
    );
    setQuizSubmitted(true);
  };

  const getMedalStyle = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-500"; // Gold
      case 1:
        return "text-silver-500"; // Silver
      case 2:
        return "text-bronze-500"; // Bronze
      default:
        return "text-white"; // Default color for others
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white p-4 sm:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Budgeting Fundamentals</h1>
        <Progress
          value={progress}
          className="w-full h-2 bg-yellow-500"
          style={{
            height: '20px', // Set the height of the progress bar
            borderRadius: '5px', // Optional: for rounded corners
            backgroundColor: 'transparent', // Make background transparent
            backgroundImage: linear-gradient(to right, rgb(76, 175, 80) ${progress}%, rgb(253, 216, 53) ${progress}%, rgb(253, 216, 53) 100%), // Green for completed, Yellow for uncompleted
        }}
  />        
        <p className="text-gray-300 text-sm">{Math.round(progress)}%</p>
      </header>
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        <nav className="w-full lg:w-1/4 mb-8 lg:mb-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold text-white">
                Course Contents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                <ul className="space-y-1">
                  {subtopics.map((topic, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={currentTopic === index ? "default" : "ghost"}
                        className={`w-full justify-start text-left h-auto py-3 px-4 flex items-center ${
                          currentTopic === index
                            ? "bg-[#4f47e6] text-white"
                            : "text-gray-300 hover:text-white hover:bg-gray-700"
                        }`}
                        onClick={() => setCurrentTopic(index)}
                      >
                        <span className="truncate">{topic}</span>
                        {index < currentTopic && (
                          <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </nav>
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTopic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    {subtopics[currentTopic]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    {subtopicContents[currentTopic]}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={handlePrevious}
                      disabled={currentTopic === 0}
                    >
                      <ChevronLeft />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={handleNext}
                    >
                      {currentTopic === subtopics.length - 1
                        ? "Take Quiz"
                        : "Next"}
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          {showQuiz && !quizSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800 border-gray-700 mt-4">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <form>
                    {quizQuestions.map((question, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="font-semibold text-white ">{question.question}</h3>
                        <RadioGroup
                          value={quizAnswers[index]}
                          onValueChange={(value) =>
                            handleQuizAnswer(index, parseInt(value))
                          }
                        >
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center mb-2"
                            >
                              <RadioGroupItem
                                id={question-${index}-option-${optionIndex}}
                                value={optionIndex.toString()}
                                className="h-4 w-4 border-gray-600 focus:ring-blue-500"
                              />
                              <Label
                                htmlFor={question-${index}-option-${optionIndex}}
                                className="ml-2"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="mt-4"
                      onClick={handleQuizSubmit}
                    >
                      Submit Quiz
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {quizSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Your Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-white">
                    You scored {quizScore} out of {quizQuestions.length}.
                  </p>
                  <p className="text-white">
                    Your performance will be ranked on the leaderboard.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-xl font-semibold text-white">Leaderboard</h4>
                    <div className="flex flex-col space-y-2">
                      {leaderboard.map((entry, index) => (
                        <div
                          key={index}
                          className={`flex justify-between p-2 rounded ${
                            index < 3 ? getMedalStyle(index) : "text-white"
                          } bg-gray-700`}
                        >
                          <div className="flex items-center">
                            <Avatar className="mr-2">
                              <AvatarFallback>{entry.avatar}</AvatarFallback>
                            </Avatar>
                            <span>{entry.name}</span>
                          </div>
                          <span>{entry.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}