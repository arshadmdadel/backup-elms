"use client"

import { useState, useEffect, useRef } from 'react'
import { ChatMessage } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, MessageCircle, Users } from "lucide-react"
import io from "socket.io-client"
import type { Socket } from "socket.io-client"

interface ClassChatPanelProps {
  messages: ChatMessage[]
  currentUser?: string
}

/**
 * ClassChatPanel component provides real-time class discussion functionality
 * Displays chat messages with user avatars and allows sending new messages
 */
export function ClassChatPanel({ messages: initialMessages, currentUser = "You", roomId, currentUserId }: ClassChatPanelProps & { roomId?: number, currentUserId?: number }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const socketRef = useRef<ReturnType<typeof io> | null>(null)
  // keep a ref to the scrollable messages container and sync prop changes -> state
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // sync when parent updates initialMessages
    setMessages(initialMessages ?? [])
  }, [initialMessages])

  useEffect(() => {
    // auto-scroll to bottom when messages change
    const el = messagesContainerRef.current ?? document.querySelector('.class-chat-messages') as HTMLElement | null
    if (!el) return
    // small timeout to allow DOM updates
    setTimeout(() => {
      el.scrollTop = el.scrollHeight
    }, 50)
  }, [messages])

  // Note: attach the ref to your scrollable container:
  // <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 class-chat-messages">
  useEffect(() => {
    // fetch initial messages from server if roomId provided
    async function load() {
      if (!roomId) return
      const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL || "http://localhost:4000"}/api/chat/rooms/${roomId}/messages`)
      if (res.ok) {
        const msgs = await res.json()
        setMessages(msgs)
      }
    }
    load()
  }, [roomId])

  useEffect(() => {
    if (!roomId) return
    const socket = io(process.env.NEXT_PUBLIC_CHAT_URL || "http://localhost:4000")
    socketRef.current = socket
    socket.emit("joinRoom", { roomId, userId: currentUserId })

    socket.on("message", (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      socket.emit("leaveRoom", { roomId })
      socket.disconnect()
      socketRef.current = null
    }
  }, [roomId])

  const handleSendMessage = async () => {
    if (!input.trim()) return
    const payload = { roomId, senderId: currentUserId, message: input }
    // send via socket for real-time
    socketRef.current?.emit("sendMessage", payload)
    // optimistic update handled by socket echo — you can also optimistically push:
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className="h-full glassmorphic flex flex-col">
      <CardHeader className="p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-green-400" />
            <div>
              <CardTitle className="text-sm font-medium text-foreground">Class Discussion</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Chat with classmates and instructors
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{new Set(messages.map(m => m.sender)).size} online</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                    {message.sender.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-foreground">{message.sender}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="glassmorphic p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-foreground leading-relaxed">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="glassmorphic border-white/20 focus:border-green-500/50 text-xs"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="glassmorphic hover:glow-green"
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
