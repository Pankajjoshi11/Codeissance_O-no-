"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, Trophy } from "lucide-react";

const budgetingData = {
  name: "Personal Budgeting Basics",
  topics: [
    "Understanding Income",
    "Expense Tracking",
    "Savings Strategies",
    "Debt Management",
    "Creating a Budget Plan",
    "Emergency Funds",
    "Investment Basics",
    "Retirement Planning",
  ],
  quiz: [
    {
      question: "What is a budget?",
      options: [
        "A plan for saving money",
        "A list of expenses",
        "A method to track income",
        "A financial goal",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is gross income?",
      options: [
        "Income after taxes",
        "Total income before taxes and deductions",
        "Money earned from investments",
        "Income minus expenses",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of the following is considered a fixed expense?",
      options: [
        "Groceries",
        "Rent or mortgage",
        "Entertainment",
        "Clothing",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the 50/30/20 rule in budgeting?",
      options: [
        "50% for savings, 30% for needs, 20% for wants",
        "50% for needs, 30% for wants, 20% for savings",
        "50% for debt repayment, 30% for savings, 20% for expenses",
        "50% for investment, 30% for emergency fund, 20% for leisure",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is an emergency fund?",
      options: [
        "Money for day-to-day expenses",
        "Savings for luxury purchases",
        "Money set aside for unexpected expenses",
        "Fund for paying off debt",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which is a good savings strategy?",
      options: [
        "Spend first, save what's left",
        "Set a fixed percentage of income for savings",
        "Only save if you earn extra income",
        "Save after paying off all debts",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a common mistake in debt management?",
      options: [
        "Paying the minimum payment only",
        "Paying off high-interest debts first",
        "Using a debt repayment plan",
        "Avoiding additional debt",
      ],
      correctAnswer: 0,
    },
    {
      question: "What type of income is earned without continuous effort?",
      options: [
        "Active income",
        "Passive income",
        "Gross income",
        "Net income",
      ],
      correctAnswer: 1,
    },
    {
      question: "Why is diversification important in investing?",
      options: [
        "It guarantees high returns",
        "It reduces risk by spreading investments",
        "It maximizes short-term profits",
        "It increases the likelihood of losses",
      ],
      correctAnswer: 1,
    },
    {
      question: "At what age should you start planning for retirement?",
      options: [
        "As soon as you start earning",
        "In your 40s",
        "After paying off all debts",
        "Right before retiring",
      ],
      correctAnswer: 0,
    },
  ],
};


export default function BudgetingComponent() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState(budgetingData.topics[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizTimeLeft, setQuizTimeLeft] = useState(60); // 60 seconds timer

  useEffect(() => {
    if (showQuiz && quizTimeLeft > 0) {
      const timer = setTimeout(() => setQuizTimeLeft(quizTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (quizTimeLeft === 0) {
      setShowReview(true);
    }
  }, [quizTimeLeft, showQuiz]);

  const handleTopicComplete = (topic: string) => {
    if (!completedTopics.includes(topic)) {
      setCompletedTopics([...completedTopics, topic]);
    }
    const nextTopicIndex = budgetingData.topics.indexOf(topic) + 1;
    if (nextTopicIndex < budgetingData.topics.length) {
      setCurrentTopic(budgetingData.topics[nextTopicIndex]);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (answers: number[]) => {
    setAnswers(answers);
    setShowReview(true);
  };

  return (
    <div className="flex h-screen bg-[#171717] text-black">
      <div className="w-64 border-r border-[#4f47e6]/20 p-4 bg-white">
        <h2 className="text-xl font-bold mb-4 text-black">Budgeting Topics</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {budgetingData.topics.map((topic, index) => (
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
          {!showQuiz && !showReview && (
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
          {showQuiz && !showReview && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Quiz
                questions={budgetingData.quiz}
                onComplete={handleQuizComplete}
                timeLeft={quizTimeLeft}
              />
            </motion.div>
          )}
          {showReview && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewQuiz
                questions={budgetingData.quiz}
                userAnswers={answers}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function getTopicContent(topic: string) {
  switch (topic) {
    case "Understanding Income":
      return `
        Income is the money you receive from various sources, such as your job, investments, or side businesses. 
        Knowing how much you earn, including gross and net income, helps you plan a budget that reflects your financial capacity. 
        It is essential to distinguish between active income (money you work for) and passive income (money you earn without ongoing effort, like investments).
      `;

    case "Expense Tracking":
      return `
        Tracking expenses involves recording everything you spend money on, from fixed expenses like rent and utilities to variable ones like entertainment and groceries. 
        This helps you understand where your money is going and allows you to identify areas where you can cut back if necessary. 
        Use tools like apps or spreadsheets to keep track of your daily, weekly, or monthly expenses.
      `;

    case "Savings Strategies":
      return `
        Saving money is key to financial health and preparing for future needs or emergencies. 
        Some common savings strategies include paying yourself first (setting aside savings before spending on anything else), 
        using automatic transfers to a savings account, and setting specific goals like saving for retirement, vacations, or large purchases.
      `;

    case "Debt Management":
      return `
        Managing debt effectively means having a strategy to pay off any loans or credit card debt while minimizing interest payments. 
        Popular methods include the debt snowball (paying off the smallest debts first to build momentum) and the debt avalanche (paying off high-interest debt first). 
        It’s also important to avoid taking on unnecessary new debt and make payments on time to protect your credit score.
      `;

    case "Creating a Budget Plan":
      return `
        A budget plan is a tool that helps you allocate your income to different spending categories such as rent, groceries, entertainment, and savings. 
        Start by listing your total income and then assign amounts to essential expenses, discretionary spending, and savings. 
        Stick to the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings or debt repayment.
      `;

    case "Emergency Funds":
      return `
        An emergency fund is money set aside to cover unexpected expenses, such as medical bills, car repairs, or sudden job loss. 
        Experts recommend having 3 to 6 months of living expenses saved in an easily accessible account. 
        The goal is to avoid going into debt when faced with an emergency.
      `;

    case "Investment Basics":
      return `
        Investing is putting your money into assets such as stocks, bonds, or real estate with the expectation of earning a return over time. 
        The goal of investing is to grow your wealth and help achieve long-term financial goals like retirement. 
        It’s important to understand the risks involved and diversify your investments to manage risk.
      `;

    case "Retirement Planning":
      return `
        Retirement planning involves setting financial goals for your life after work and figuring out how much you need to save and invest to achieve those goals. 
        Contributing to retirement accounts like a 401(k) or IRA helps you take advantage of compound interest and tax benefits. 
        The sooner you start, the more time your money has to grow, ensuring a comfortable retirement.
      `;

    default:
      return "Select a topic to learn more about budgeting.";
  }
}

interface QuizProps {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  onComplete: (answers: number[]) => void;
  timeLeft: number;
}

function Quiz({ questions, onComplete, timeLeft }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswer = (answerIndex: number) => {
    setUserAnswers([...userAnswers, answerIndex]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      onComplete(userAnswers);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black">
          Quiz: {questions[currentQuestion].question}
        </CardTitle>
        <Progress value={(currentQuestion / questions.length) * 100} />
        <p className="text-black">Time Left: {timeLeft}s</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <li key={index}>
              <Button
                onClick={() => handleAnswer(index)}
                className="w-full py-2 text-white bg-[#4f47e6] hover:bg-[#4f47e6]/90"
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface ReviewQuizProps {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  userAnswers: number[];
}

function ReviewQuiz({ questions, userAnswers }: ReviewQuizProps) {
  const correctCount = userAnswers.reduce(
    (count, answer, index) =>
      answer === questions[index].correctAnswer ? count + 1 : count,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black flex items-center">
          You scored {correctCount}/{questions.length}
          <Trophy className="ml-2 h-6 w-6 text-yellow-500" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
