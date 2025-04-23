"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const textElement = textRef.current
      const imageElement = imageRef.current

      if (section && textElement && imageElement) {
        // Text animation on scroll
        gsap.fromTo(
          textElement.querySelectorAll(".gsap-text"),
          { y: 0 },
          {
            y: -30,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        )

        // Image float animation
        gsap.to(imageElement, {
          y: -20,
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container relative z-10 flex min-h-[80vh] items-center py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div ref={textRef} className="space-y-6 text-center md:text-right">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <h1 className="gsap-text text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                <span className="block">تشرتات شبابية</span>
                <span className="text-primary">بتصاميم عصرية مميزة</span>
              </h1>
            </motion.div>

            <motion.p
              className="gsap-text text-lg text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              عبّر عن شخصيتك الفريدة من خلال تشكيلة hawkShop المتنوعة من التشرتات الشبابية بأحدث الموديلات والتصاميم العصرية
            </motion.p>

            <motion.div
              className="gsap-text flex flex-wrap justify-center gap-4 md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 transition-opacity">
                تسوق الآن
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                استكشف التصاميم
              </Button>
            </motion.div>

            <motion.div
              className="gsap-text pt-4 flex justify-center md:justify-start gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+100</div>
                <div className="text-sm text-muted-foreground">تصميم فريد</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+2000</div>
                <div className="text-sm text-muted-foreground">عميل سعيد</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+30</div>
                <div className="text-sm text-muted-foreground">موديل عصري</div>
              </div>
            </motion.div>
          </div>

          <div ref={imageRef} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative aspect-square mx-auto max-w-md"
            >
              <Image
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb24lMjB0c2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
                alt="تي شيرت شبابي عصري"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground">اسحب لأسفل</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
