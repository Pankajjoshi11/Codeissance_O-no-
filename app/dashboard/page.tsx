'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Book, Gamepad2, Coins } from 'lucide-react'

export default function Dashboard() {
  const [progress, setProgress] = useState(65)
  const [currency, setCurrency] = useState(1250)

  const courses = [
    { id: 1, name: "Web Development", progress: 80 },
    { id: 2, name: "Data Science", progress: 45 },
    { id: 3, name: "Mobile App Development", progress: 60 },
  ]

  const modules = [
    { id: 1, name: "HTML & CSS", completed: true },
    { id: 2, name: "JavaScript Basics", completed: true },
    { id: 3, name: "React Fundamentals", completed: false },
    { id: 4, name: "Backend with Node.js", completed: false },
  ]

  const games = [
    { id: 1, name: "Code Breaker", score: 850 },
    { id: 2, name: "Algorithm Race", score: 620 },
    { id: 3, name: "Debug Master", score: 930 },
  ]

  return (
    <div className="min-h-screen bg-[#171717] text-[#e0e0e0] p-8 font-sans">
      <motion.h1 
        className="text-5xl font-extrabold mb-8 text-center text-[#5f57f6] tracking-tight"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Learning Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[#1e1e1e] border-[#5f57f6] shadow-lg shadow-[#5f57f6]/20">
            <CardHeader>
              <CardTitle className="flex items-center text-[#5f57f6] text-2xl font-bold">
                <Sparkles className="mr-2" /> Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold mb-4 text-[#f0f0f0]">{progress}%</div>
              <Progress value={progress} className="h-3 bg-[#2a2a2a]" />
              <Button 
                className="mt-4 bg-[#5f57f6] hover:bg-[#4f47e6] text-white font-semibold"
                onClick={() => setProgress(prev => Math.min(prev + 5, 100))}
              >
                Complete Task
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-[#1e1e1e] border-[#5f57f6] shadow-lg shadow-[#5f57f6]/20">
            <CardHeader>
              <CardTitle className="flex items-center text-[#5f57f6] text-2xl font-bold">
                <Book className="mr-2" /> Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {courses.map(course => (
                <div key={course.id} className="mb-4">
                  <div className="flex justify-between mb-2 text-[#f0f0f0]">
                    <span className="font-medium">{course.name}</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 bg-[#2a2a2a]" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-[#1e1e1e] border-[#5f57f6] shadow-lg shadow-[#5f57f6]/20">
            <CardHeader>
              <CardTitle className="flex items-center text-[#5f57f6] text-2xl font-bold">
                <Gamepad2 className="mr-2" /> Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              {games.map(game => (
                <div key={game.id} className="flex justify-between items-center mb-4">
                  <span className="text-[#f0f0f0] font-medium">{game.name}</span>
                  <Badge variant="secondary" className="bg-[#5f57f6] text-white font-semibold">
                    {game.score}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-[#1e1e1e] border-[#5f57f6] shadow-lg shadow-[#5f57f6]/20">
            <CardHeader>
              <CardTitle className="flex items-center text-[#5f57f6] text-2xl font-bold">
                Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              {modules.map(module => (
                <div key={module.id} className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={module.completed}
                    readOnly
                    className="mr-2 h-4 w-4 rounded border-[#5f57f6] text-[#5f57f6] focus:ring-[#5f57f6]"
                  />
                  <span className={`text-[#f0f0f0] ${module.completed ? 'line-through text-[#a0a0a0]' : 'font-medium'}`}>
                    {module.name}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-[#1e1e1e] border-[#5f57f6] shadow-lg shadow-[#5f57f6]/20">
            <CardHeader>
              <CardTitle className="flex items-center text-[#5f57f6] text-2xl font-bold">
                <Coins className="mr-2" /> Currency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold mb-4 text-[#f0f0f0]">{currency}</div>
              <Button 
                className="bg-[#5f57f6] hover:bg-[#4f47e6] text-white font-semibold"
                onClick={() => setCurrency(prev => prev + 100)}
              >
                Earn Coins
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}