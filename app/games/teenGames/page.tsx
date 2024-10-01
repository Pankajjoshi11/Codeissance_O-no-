"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingUp, ShoppingCart, Award } from 'lucide-react'

export default function MoneyMasterTeen() {
  const [balance, setBalance] = useState(5000)
  const [weeklyIncome, setWeeklyIncome] = useState(2500)
  const [savings, setSavings] = useState(0)
  const [week, setWeek] = useState(1)
  const [message, setMessage] = useState("")
  const savingsGoal = 50000

  const spendingOptions = [
    { name: "Movie Night", cost: 750 },
    { name: "New Clothes", cost: 1500 },
    { name: "Video Game", cost: 3000 },
    { name: "Fast Food", cost: 500 },
  ]

  const randomEvents = [
    { description: "Found Rs. 1000 on the street!", amount: 1000 },
    { description: "Unexpected school expense", amount: -1250 },
    { description: "Birthday money from grandma!", amount: 2500 },
    { description: "Lost your wallet", amount: -2000 },
  ]

  useEffect(() => {
    if (savings >= savingsGoal) {
      setMessage("Congratulations! You've reached your savings goal!")
    }
  }, [savings])

  const handleWeeklyUpdate = () => {
    setBalance(prev => prev + weeklyIncome)
    setWeek(prev => prev + 1)
    
    if (Math.random() < 0.3) {
      const event = randomEvents[Math.floor(Math.random() * randomEvents.length)]
      setBalance(prev => prev + event.amount)
      setMessage(event.description)
    } else {
      setMessage("")
    }
  }

  const handleSpend = (cost: number) => {
    if (balance >= cost) {
      setBalance(prev => prev - cost)
    } else {
      setMessage("Not enough money!")
    }
  }

  const handleSave = () => {
    if (balance > 0) {
      setSavings(prev => prev + 500)
      setBalance(prev => prev - 500)
    } else {
      setMessage("No money to save!")
    }
  }

  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto bg-[#1e1e1e] text-white border-[#4f47e6]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-[#4f47e6]">Money Master: Teen Edition</CardTitle>
            <CardDescription className="text-center text-gray-300">Master your finances and secure your future!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div 
              className="flex justify-between items-center text-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
            >
              <span className="font-semibold">Week {week}</span>
              <span className="font-semibold flex items-center">Rs. {balance.toFixed(2)}</span>
            </motion.div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Savings Progress</span>
                <span>Rs. {savings} / Rs. {savingsGoal}</span>
              </div>
              <Progress value={(savings / savingsGoal) * 100} className="w-full h-3" indicatorColor="bg-[#4f47e6]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {spendingOptions.map((option, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => handleSpend(option.cost)} 
                    variant="outline" 
                    className="w-full bg-[#2a2a2a] text-white border-[#4f47e6] hover:bg-[#4f47e6] hover:text-white transition-colors duration-300"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {option.name} (Rs. {option.cost})
                  </Button>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between gap-3">
              <motion.div className="w-1/2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleSave} className="w-full bg-[#4f47e6] hover:bg-[#3f37d6] text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Save Rs. 500
                </Button>
              </motion.div>
              <motion.div className="w-1/2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleWeeklyUpdate} className="w-full bg-[#4f47e6] hover:bg-[#3f37d6] text-white">
                  Next Week
                </Button>
              </motion.div>
            </div>
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#2a2a2a] p-3 rounded-md flex items-center"
                >
                  <AlertCircle className="w-5 h-5 mr-2 text-[#4f47e6]" />
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="text-sm text-gray-400 flex justify-between items-center">
            <span>Weekly Income: Rs. {weeklyIncome}</span>
            <span className="flex items-center">
              <Award className="w-4 h-4 mr-1 text-[#4f47e6]" />
              Savings Goal: Rs. {savingsGoal}
            </span>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
