// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { GoogleGenerativeAI } from "@google/generative-ai"

// type Message = {
//   id: number
//   text: string
//   sender: 'user' | 'bot'
// }

// const genAI = new GoogleGenerativeAI("AIzaSyCtbpPOUEuGVDWkfNPInYz7eEvkkPLqrcQ")
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// export default function ChatbotPage() {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [input, setInput] = useState('')
//   const scrollAreaRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
//     }
//   }, [messages])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (input.trim()) {
//       const userMessage: Message = { id: Date.now(), text: input, sender: 'user' }
//       setMessages(prev => [...prev, userMessage])
//       setInput('')

//       if (isRelatedToFinancialLiteracy(input)) {
//         try {
//           const prompt = input
//           const result = await model.generate({
//             prompt,
//             maxTokens: 150,
//           })

//           // Parse and format the response
//           const botResponse = result.data?.choices?.[0]?.text ?? 'Sorry, I couldn\'t generate a response at this time.'
//           const formattedText = formatResponse(botResponse)

//           const botMessage: Message = {
//             id: Date.now(),
//             text: formattedText,
//             sender: 'bot'
//           }
//           setMessages(prev => [...prev, botMessage])
//         } catch (error) {
//           console.error('Error generating response:', error)
//           const botMessage: Message = {
//             id: Date.now(),
//             text: 'Sorry, something went wrong while generating a response.',
//             sender: 'bot'
//           }
//           setMessages(prev => [...prev, botMessage])
//         }
//       } else {
//         setTimeout(() => {
//           const botMessage: Message = { id: Date.now(), text: `I received: "${input}"`, sender: 'bot' }
//           setMessages(prev => [...prev, botMessage])
//         }, 1000)
//       }
//     }
//   }

//   // Helper function to format the AI's response
//   const formatResponse = (text: string) => {
//     // Add paragraphs where appropriate (splitting by double newlines or sentence endings)
//     let formattedText = text.replace(/\n/g, '\n\n')

//     // Add **bold** text for key phrases (example, financial terms)
//     const boldKeywords = ['investment', 'finance', 'savings', 'loan', 'risk', 'return', 'diversification']
//     boldKeywords.forEach(keyword => {
//       const regex = new RegExp(`\\b(${keyword})\\b`, 'gi')
//       formattedText = formattedText.replace(regex, '**$1**')
//     })

//     return formattedText
//   }

//   const isRelatedToFinancialLiteracy = (input: string) => {
//     const financialKeywords = ['finance', 'money', 'investment', 'loan', 'budget', 'financial literacy', 'bank', 'savings']
//     return financialKeywords.some(keyword => input.toLowerCase().includes(keyword))
//   }

//   const getMessageColor = (sender: 'user' | 'bot') => {
//     const colors = ['text-green-400', 'text-yellow-400', 'text-pink-400', 'text-purple-400', 'text-orange-400']
//     return sender === 'user' ? 'text-white' : colors[Math.floor(Math.random() * colors.length)]
//   }

//   return (
//     <div className="flex flex-col h-screen bg-[#171717] text-white p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center text-[#4f47e6]">Chatbot</h1>
//       <ScrollArea className="flex-grow mb-4 border border-[#4f47e6] rounded-lg p-4" ref={scrollAreaRef}>
//         <AnimatePresence>
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
//             >
//               <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-[#4f47e6]' : 'bg-gray-700'} ${getMessageColor(message.sender)}`}>
//                 {message.text}
//               </span>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </ScrollArea>
//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <Input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-grow bg-gray-800 text-white border-[#4f47e6]"
//         />
//         <Button type="submit" className="bg-[#4f47e6] hover:bg-[#3f37d6] text-white">
//           Send
//         </Button>
//       </form>
//     </div>
//   )
// }
