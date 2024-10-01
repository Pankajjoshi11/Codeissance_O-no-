"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PiggyBank, Coins, ShoppingBag, Car, Book, IceCream, Gift, CheckCircle, XCircle } from 'lucide-react'

const locations = [
  { 
    name: 'Home', 
    color: 'bg-red-400',
    task: 'Do chores to earn 5 coins',
    reward: 5,
    cost: 0
  },
  { 
    name: 'School', 
    color: 'bg-blue-400',
    task: 'Buy a notebook for 3 coins',
    reward: 0,
    cost: 3
  },
  { 
    name: 'Park', 
    color: 'bg-green-400',
    task: 'Buy an ice cream for 2 coins',
    reward: 0,
    cost: 2
  },
  { 
    name: 'Store', 
    color: 'bg-yellow-400',
    task: 'Save up to buy a toy for 10 coins',
    reward: 0,
    cost: 10
  },
]

export default function Component() {
  const [coins, setCoins] = useState(50)
  const [savingsGoal, setSavingsGoal] = useState(100)
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
  const [carPosition, setCarPosition] = useState(0)
  const [jarColor, setJarColor] = useState('bg-green-500')
  const [isJarPulsing, setIsJarPulsing] = useState(false)
  const [showTaskDecision, setShowTaskDecision] = useState(true)

  const updateJarColor = (newCoins: number) => {
    if (newCoins < 20) {
      setJarColor('bg-red-500')
    } else if (newCoins < 50) {
      setJarColor('bg-yellow-500')
    } else {
      setJarColor('bg-green-500')
    }
  }

  const updateCoins = (amount: number) => {
    setCoins((prevCoins) => {
      const newCoins = prevCoins + amount
      updateJarColor(newCoins)
      setIsJarPulsing(true)
      setTimeout(() => setIsJarPulsing(false), 500)
      return newCoins
    })
  }

  const completeTask = () => {
    const currentLocation = locations[currentLocationIndex]
    if (coins >= currentLocation.cost) {
      updateCoins(currentLocation.reward - currentLocation.cost)
      setShowTaskDecision(false)
    } else {
      alert("You don't have enough coins for this task!")
    }
  }

  const skipTask = () => {
    setShowTaskDecision(false)
  }

  const moveToNextLocation = () => {
    setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % locations.length)
    setShowTaskDecision(true)
  }

  useEffect(() => {
    const animateCar = () => {
      setCarPosition((prevPosition) => {
        if (prevPosition < currentLocationIndex * 25) {
          return prevPosition + 1
        }
        return prevPosition
      })
    }

    const intervalId = setInterval(animateCar, 50)
    return () => clearInterval(intervalId)
  }, [currentLocationIndex])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-purple-600">Penny's Money Adventure</h1>
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-2 sm:mb-0">
              <div className={`w-12 h-16 rounded-full ${jarColor} transition-colors duration-300 flex items-end justify-center overflow-hidden ${isJarPulsing ? 'animate-pulse' : ''}`}>
                <div className="w-10 h-10 bg-white rounded-full mb-1" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-pink-500 ml-2">{coins} Coins</span>
            </div>
            <div className="flex items-center">
              <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mr-2" />
              <span className="text-xl sm:text-2xl font-bold text-purple-500">Goal: {savingsGoal}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Savings Progress</h2>
            <Progress value={(coins / savingsGoal) * 100} className="w-full h-4 sm:h-6" />
          </div>

          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Explore Town</h2>
            <div className="relative h-32 sm:h-40">
              <div className="absolute inset-0 flex items-center">
                <div className="h-4 bg-gray-300 w-full rounded-full overflow-hidden">
                  {locations.map((location, index) => (
                    <div
                      key={location.name}
                      className={`h-full w-1/4 ${location.color}`}
                      style={{ transform: `translateX(${index * 100}%)` }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="absolute top-0 transition-all duration-500 ease-in-out"
                style={{ left: `calc(${carPosition}% - 16px)` }}
              >
                <Car className="w-8 h-8 text-indigo-600" />
              </div>
              {locations.map((location, index) => (
                <div
                  key={location.name}
                  className="absolute top-8 sm:top-12 text-center w-1/4 text-xs sm:text-sm font-semibold"
                  style={{ left: `${index * 25}%`, transform: 'translateX(-50%)' }}
                >
                  {location.name}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-700">Current Task</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {locations[currentLocationIndex].task}
            </p>
            {showTaskDecision ? (
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-semibold text-gray-700">Would you like to do this task?</p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={completeTask} className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Yes
                  </Button>
                  <Button onClick={skipTask} className="bg-red-500 hover:bg-red-600">
                    <XCircle className="w-5 h-5 mr-2" />
                    No
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={moveToNextLocation} className="w-full bg-indigo-500 hover:bg-indigo-600">
                Move to Next Location
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <Book className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-semibold">Learn</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <Coins className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-semibold">Save</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <IceCream className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm font-semibold">Treat</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <Gift className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <p className="text-sm font-semibold">Gift</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
