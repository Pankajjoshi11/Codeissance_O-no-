'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ArrowLeftIcon, TrendingUpIcon, TrendingDownIcon, PlusIcon, MinusIcon } from 'lucide-react'

interface StockData {
  symbol: string
  price: number
  change: number
  highestPrice: number
  history: { time: string; price: number }[]
}

interface Portfolio {
  [symbol: string]: {
    quantity: number
    averageBuyPrice: number
  }
}

export default function StockPage() {
  const router = useRouter()
  const { symbol } = useParams()
  const [stock, setStock] = useState<StockData | null>(null)
  const [portfolio, setPortfolio] = useState<Portfolio>({})
  const [cash, setCash] = useState(10000)
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchStockData = () => {
      const initialPrice = Math.random() * 1000 + 100
      const newStock: StockData = {
        symbol: symbol as string,
        price: initialPrice,
        change: 0,
        highestPrice: initialPrice,
        history: Array(20).fill(null).map((_, index) => ({
          time: new Date(Date.now() - (19 - index) * 5000).toLocaleTimeString(),
          price: initialPrice
        }))
      }
      setStock(newStock)
    }

    fetchStockData()

    const interval = setInterval(() => {
      setStock(prevStock => {
        if (!prevStock) return null
        
        const volatility = Math.random() * 0.1 + 0.05
        const direction = Math.random() > 0.5 ? 1 : -1
        const change = direction * volatility * prevStock.price
        
        const jumpFactor = Math.random() < 0.1 ? (Math.random() * 0.2 + 0.1) : 0
        const jumpDirection = Math.random() > 0.5 ? 1 : -1
        const totalChange = change + (jumpDirection * jumpFactor * prevStock.price)
        
        const newPrice = Math.max(1, prevStock.price + totalChange)
        
        const newHistory = [
          ...prevStock.history.slice(1),
          { time: new Date().toLocaleTimeString(), price: newPrice }
        ]

        return {
          ...prevStock,
          price: newPrice,
          change: totalChange,
          highestPrice: Math.max(prevStock.highestPrice, newPrice),
          history: newHistory
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [symbol])

  const buyStock = () => {
    if (stock && cash >= stock.price * quantity) {
      const totalCost = stock.price * quantity
      setCash(prevCash => prevCash - totalCost)
      setPortfolio(prevPortfolio => {
        const currentHolding = prevPortfolio[stock.symbol] || { quantity: 0, averageBuyPrice: 0 }
        const newQuantity = currentHolding.quantity + quantity
        const newAverageBuyPrice = (currentHolding.averageBuyPrice * currentHolding.quantity + totalCost) / newQuantity
        return {
          ...prevPortfolio,
          [stock.symbol]: { quantity: newQuantity, averageBuyPrice: newAverageBuyPrice }
        }
      })
      toast.success(<ToastContent action="Bought" symbol={stock.symbol} quantity={quantity} totalCost={totalCost} />)
      setIsBuyModalOpen(false)
      setQuantity(1)
    } else {
      toast.error("Not enough cash to buy this stock!")
    }
  }

  const sellStock = () => {
    if (stock && portfolio[stock.symbol] && portfolio[stock.symbol].quantity >= quantity) {
      const totalSale = stock.price * quantity
      const profit = (stock.price - portfolio[stock.symbol].averageBuyPrice) * quantity
      setCash(prevCash => prevCash + totalSale)
      setPortfolio(prevPortfolio => ({
        ...prevPortfolio,
        [stock.symbol]: {
          ...prevPortfolio[stock.symbol],
          quantity: prevPortfolio[stock.symbol].quantity - quantity
        }
      }))
      toast.success(`Sold ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol} for $${totalSale.toFixed(2)}. ${profit >= 0 ? 'Profit' : 'Loss'}: $${Math.abs(profit).toFixed(2)}`)
      setIsSellModalOpen(false)
      setQuantity(1)
    } else {
      toast.error(`You don't have enough ${stock?.symbol} stocks to sell!`)
    }
  }

  const ToastContent = ({ action, symbol, quantity, totalCost }: { action: string; symbol: string; quantity: number; totalCost: number }) => (
    <div>
      {action} {quantity} share{quantity > 1 ? 's' : ''} of {symbol} for ${totalCost.toFixed(2)}
      <br />
      Estimated cost: ${totalCost.toFixed(2)}
    </div>
  )

  if (!stock) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>
  }

  const isRising = stock.change >= 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Button onClick={() => router.push('/')} className="mb-8 text-white bg-gray-800 hover:bg-gray-700 rounded-none">
          <ArrowLeftIcon className="mr-2" /> Back to Home
        </Button>
        <h1 className="text-4xl font-bold mb-8 flex items-center text-white">
          {stock.symbol} Stock Details
          {isRising ? (
            <TrendingUpIcon className="ml-4 text-green-400" size={32} />
          ) : (
            <TrendingDownIcon className="ml-4 text-red-400" size={32} />
          )}
        </h1>
        <Card className="mb-8 bg-gray-800 border-gray-700 rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Current Price: ${stock.price.toFixed(2)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stock.history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="time" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff', borderRadius: 0 }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                  <Line 
                    type="linear" 
                    dataKey="price" 
                    stroke={isRising ? "#4ade80" : "#f87171"} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between mb-8">
          <Button onClick={() => setIsBuyModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg rounded-none">Buy</Button>
          <Button onClick={() => setIsSellModalOpen(true)} variant="outline" className="border-red-500 text-white bg-red-500 hover:bg-red-600 hover:text-white px-8 py-3 text-lg rounded-none">Sell</Button>
        </div>
        <Card className="bg-gray-800 border-gray-700 rounded-none">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Your Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {Object.keys(portfolio).length === 0 ? (
                <p className="text-white">No stocks in your portfolio yet.</p>
              ) : (
                <table className="w-full text-white">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2">Symbol</th>
                      <th className="text-left px-4 py-2">Quantity</th>
                      <th className="text-left px-4 py-2">Average Buy Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(portfolio).map(([symbol, holding]) => (
                      <tr key={symbol}>
                        <td className="border-t border-gray-700 px-4 py-2">{symbol}</td>
                        <td className="border-t border-gray-700 px-4 py-2">{holding.quantity}</td>
                        <td className="border-t border-gray-700 px-4 py-2">${holding.averageBuyPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {/* Buy Modal */}
      {/* Buy Modal */}
    <Dialog open={isBuyModalOpen} onOpenChange={setIsBuyModalOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Buy {stock.symbol} Stock</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between mt-4">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="p-2 bg-gray-600 text-white rounded-none"><MinusIcon /></button>
            <Input type="number" value={quantity} readOnly className="mx-4 text-center rounded-none" />
            <button onClick={() => setQuantity(prev => prev + 1)} className="p-2 bg-gray-600 text-white rounded-none"><PlusIcon /></button>
            </div>
            <div className="mt-4 text-lg text-black">
            Estimated Cost: ${(stock.price * quantity).toFixed(2)}
            </div>
            <DialogFooter>
            <Button variant="outline" onClick={() => setIsBuyModalOpen(false)}>Cancel</Button>
            <Button onClick={buyStock}>Confirm</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

        {/* Sell Modal */}
        <Dialog open={isSellModalOpen} onOpenChange={setIsSellModalOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Sell {stock.symbol} Stock</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between mt-4">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="p-2 bg-gray-600 text-black rounded-none"><MinusIcon /></button>
            <Input type="number" value={quantity} readOnly className="mx-4 text-center rounded-none" />
            <button onClick={() => setQuantity(prev => prev + 1)} className="p-2 bg-gray-600 text-black rounded-none"><PlusIcon /></button>
            </div>
            <div className="mt-4 text-lg text-black">
            Estimated Sale Amount: ${(stock.price * quantity).toFixed(2)}
            </div>
            <DialogFooter>
            <Button variant="outline" onClick={() => setIsSellModalOpen(false)}>Cancel</Button>
            <Button onClick={sellStock}>Confirm</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

    </div>
  )
}
