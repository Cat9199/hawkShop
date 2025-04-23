"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "تشكيلة الربيع الجديدة",
    description: "اكتشف مجموعتنا الجديدة من التشرتات الشبابية بتصاميم عصرية",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHlvdXRoJTIwdHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    cta: "تسوق الآن",
    link: "/category/youth-tshirts",
  },
  {
    id: 2,
    title: "خصم 40%",
    description: "على جميع التشرتات الشبابية لفترة محدودة",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    cta: "اكتشف العروض",
    link: "/offers",
  },
  {
    id: 3,
    title: "تصاميم رياضية",
    description: "مجموعة مميزة من التشرتات الرياضية الشبابية بأحدث الصيحات",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHlvdXRoJTIwdHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    cta: "تسوق الآن",
    link: "/category/sports",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="absolute h-full w-full flex-shrink-0" style={{ right: `${index * 100}%` }}>
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-10 text-right text-white">
              <h2 className="mb-2 text-4xl font-bold">{slide.title}</h2>
              <p className="mb-6 max-w-md text-lg">{slide.description}</p>
              <div>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">السابق</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">التالي</span>
      </Button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">شريحة {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
