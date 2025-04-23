"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Truck, RefreshCw, ShieldCheck, HeadphonesIcon } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const features = [
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "توصيل سريع",
    description: "توصيل مجاني للطلبات فوق 500 جنيه",
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-primary" />,
    title: "استبدال سهل",
    description: "استبدال مجاني خلال 14 يوم من الشراء",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "ضمان الجودة",
    description: "جميع منتجاتنا مصنوعة من أفضل الخامات",
  },
  {
    icon: <HeadphonesIcon className="h-10 w-10 text-primary" />,
    title: "دعم على مدار الساعة",
    description: "فريق دعم متاح للمساعدة في أي وقت",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const features = featuresRef.current

      if (section && features) {
        // Stagger animation for features
        gsap.from(features.children, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-secondary/30">
      <div className="container">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-primary">لماذا تختار hawkShop؟</h2>
          <p className="mt-4 text-muted-foreground">نقدم لك أفضل تجربة تسوق مع تشكيلة متميزة من التشرتات الشبابية</p>
        </motion.div>

        <div ref={featuresRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm"
            >
              <motion.div className="mb-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                {feature.icon}
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
