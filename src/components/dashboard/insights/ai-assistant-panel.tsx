"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, Sparkles, X, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks/hooks"
import { sendChatMessage, clearChatHistory } from "@/lib/redux/slices/ai/aiSlice"

export function AIAssistantPanel() {
  const dispatch = useAppDispatch()
  const { chatHistory, isChatLoading } = useAppSelector((state) => state.ai)
  const [message, setMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [chatHistory])

  const handleSendMessage = async () => {
    if (message.trim() === "") return

    try {
      await dispatch(sendChatMessage(message)).unwrap()
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarFallback>
                <Bot size={16} />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>Ask questions about your farm data</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => dispatch(clearChatHistory())}>
            <X className="h-4 w-4" />
            <span className="sr-only">Clear chat</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[400px] px-4" ref={scrollAreaRef}>
          {chatHistory.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-8">
              <Sparkles className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">How can I help you today?</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Ask me about production data, flock health, feed consumption, or environmental conditions.
              </p>
              <div className="mt-6 grid gap-2">
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => dispatch(sendChatMessage("How is egg production trending this week?"))}
                >
                  How is egg production trending this week?
                </Button>
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => dispatch(sendChatMessage("Are there any health concerns with the flocks?"))}
                >
                  Are there any health concerns with the flocks?
                </Button>
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => dispatch(sendChatMessage("What's the current feed consumption rate?"))}
                >
                  What's the current feed consumption rate?
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              {chatHistory.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isChatLoading}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isChatLoading || message.trim() === ""}>
            {isChatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

