"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function InteractiveBudgetCalculator() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [result, setResult] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const calculateBudget = () => {
    const incomeNum = parseFloat(income) || 0;
    const expensesNum = parseFloat(expenses) || 0;
    const savingsGoalNum = parseFloat(savingsGoal) || 0;

    const remaining = incomeNum - expensesNum - savingsGoalNum;
    const savingsPercentage = (savingsGoalNum / incomeNum) * 100;

    setResult({
      remaining: remaining.toFixed(2),
      savingsPercentage: savingsPercentage.toFixed(2),
    });

    setPieChartData([
      { name: "Expenses", value: expensesNum },
      { name: "Savings", value: savingsGoalNum },
      { name: "Remaining", value: remaining },
    ]);

    setBarChartData([
      { name: "Income", value: incomeNum },
      { name: "Expenses", value: expensesNum },
      { name: "Savings", value: savingsGoalNum },
      { name: "Remaining", value: remaining },
    ]);
  };

  const COLORS = ["#FF8042", "#00C49F", "#0088FE"];

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white flex flex-col justify-between">
      <header className="text-center py-8">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Interactive Savings Calculator
        </motion.h1>
      </header>

      <main className="flex-grow px-6 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="income" className="block text-sm font-medium mb-2 text-gray-300">
                Income
              </label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-white bg-opacity-10 border-[#4f47e6] focus:border-[#4f47e6] focus:ring-[#4f47e6] text-white placeholder-gray-400"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="expenses" className="block text-sm font-medium mb-2 text-gray-300">
                Expenses
              </label>
              <Input
                id="expenses"
                type="number"
                placeholder="Enter your expenses"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="w-full bg-white bg-opacity-10 border-[#4f47e6] focus:border-[#4f47e6] focus:ring-[#4f47e6] text-white placeholder-gray-400"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label htmlFor="savings" className="block text-sm font-medium mb-2 text-gray-300">
                Savings Goal
              </label>
              <Input
                id="savings"
                type="number"
                placeholder="Enter your savings goal"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(e.target.value)}
                className="w-full bg-white bg-opacity-10 border-[#4f47e6] focus:border-[#4f47e6] focus:ring-[#4f47e6] text-white placeholder-gray-400"
              />
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button
              onClick={calculateBudget}
              className="bg-[#4f47e6] hover:bg-[#3f39b6] text-white transition-colors duration-300 px-8 py-2"
            >
              Calculate Budget
            </Button>
          </motion.div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card className="bg-white bg-opacity-10">
                  <CardHeader>
                    <CardTitle className="text-center text-white text-xl">
                      Budget Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-white text-5xl mb-2">
                      Remaining: <span className="text-[#00C49F]">${result.remaining}</span>
                    </p>
                    <p className="text-center text-4xl">
                      Savings: <span className="text-[#FF8042]">{result.savingsPercentage}%</span> of income
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white bg-opacity-10">
                  <CardHeader>
                    <CardTitle className="text-center text-white">
                      Budget Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white bg-opacity-10 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-center text-white">
                      Budget Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={barChartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" stroke="#B0B0B0" />
                        <YAxis stroke="#B0B0B0" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#2A2A2A",
                            border: "none",
                            borderRadius: "4px",
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="value"
                          fill="#4f47e6"
                          animationDuration={1000}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-[#111] py-4 text-center">
        <div className="flex justify-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Facebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Twitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Instagram />
          </a>
        </div>
        <p className="text-gray-500 mt-2">© 2024 BudgetCalculator. All rights reserved.</p>
      </footer>
    </div>
  );
}
