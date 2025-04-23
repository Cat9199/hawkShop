"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, X, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  text: string
  isBot: boolean
}

const botResponses = [
  "مرحباً! كيف يمكنني مساعدتك اليوم؟",
  "يمكنني مساعدتك في العثور على الملابس المناسبة لك.",
  "لدينا تخفيضات رائعة على التشرتات الشبابية هذا الأسبوع!",
  "يمكنك زيارة قسم المنتجات المميزة للاطلاع على أحدث التصاميم.",
  "هل تبحث عن مقاسات معينة؟ لدينا جميع المقاسات متوفرة.",
  "يمكنك التواصل معنا على الرقم 0123456789 لأي استفسارات إضافية.",
  "نحن نقدم خدمة توصيل سريعة لجميع المناطق.",
  "تفضل بزيارة متجرنا للاطلاع على المزيد من المنتجات.",
]

export function SimpleChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! كيف يمكنني مساعدتك في تسوق الملابس اليوم؟",
      isBot: true,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isBot: true,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      {/* Floating button to open chat */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-primary shadow-lg"
          aria-label="Open chat"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-6 bottom-24 z-50 w-80 h-[500px] bg-background rounded-lg shadow-xl border border-border overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <h3 className="font-medium">مساعد التسوق</h3>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} className="text-primary-foreground h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? "bg-secondary self-start rounded-bl-none"
                      : "bg-primary text-primary-foreground self-end rounded-br-none"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t p-3 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage()
                }}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                dir="rtl"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}