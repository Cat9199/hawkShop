"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { FeaturedProducts } from "@/components/featured-products"
import { FeaturesSection } from "@/components/features-section"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { SimpleChatbot } from "@/components/simple-chatbot"
import { motion } from "framer-motion"

export default function Home() {
  // Initialize GSAP ScrollTrigger on client side
  useEffect(() => {
    // This is just to ensure GSAP is initialized on the client side
    // The actual GSAP code is in the individual components
  }, [])

  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="flex-1 relative">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <FeaturesSection />
        <Newsletter />
        <SimpleChatbot />
      </main>
      <Footer />
    </motion.div>
  )
}
