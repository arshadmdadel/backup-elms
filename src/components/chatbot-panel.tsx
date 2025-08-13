"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

interface ChatMessage {
  id: string
  message: string
  isBot: boolean
  timestamp: Date
}

/**
 * ChatbotPanel component provides an AI chatbot interface for student assistance
 * Features glassmorphic design with message history and input functionality
 */
export function ChatbotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m your AI learning assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: input,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'I understand your question. As an AI assistant, I can help you with course materials, assignments, and general learning questions. What specific topic would you like to explore?',
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-full glassmorphic flex flex-col">
      <CardHeader className="p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-cyan-400" />
          <div>
            <CardTitle className="text-sm font-medium text-foreground">AI Learning Assistant</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Get help with your studies
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isBot ? '' : 'flex-row-reverse space-x-reverse'
                }`}
              >
                <Avatar className="w-6 h-6">
                  <AvatarFallback className={`text-xs ${
                    message.isBot ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {message.isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[80%] p-3 rounded-lg glassmorphic text-xs ${
                    message.isBot
                      ? 'bg-white/5 border border-cyan-500/20'
                      : 'bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <p className="text-foreground">{message.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask me anything about your courses..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="glassmorphic border-white/20 focus:border-cyan-500/50 text-xs"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="glassmorphic hover:glow-cyan"
              disabled={!input.trim()}
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
