"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Here you would typically send this to your API
    console.log("Subscribing email:", email)

    toast({
      title: "تم الاشتراك بنجاح!",
      description: "سنرسل لك آخر العروض والأخبار.",
    })

    setEmail("")
  }

  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-primary">اشترك في نشرتنا الإخبارية</h2>
          <p className="mt-4 text-muted-foreground">احصل على آخر العروض والأخبار مباشرة إلى بريدك الإلكتروني</p>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-8 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              type="email"
              placeholder="بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full"
              required
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 transition-opacity rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اشترك
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
