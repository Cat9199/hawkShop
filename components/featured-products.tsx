"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  isNew?: boolean
  isSale?: boolean
  category: string
  language?: string
}

const products: Product[] = [
  {
    id: "1",
    name: "تي شيرت شبابي أبيض كلاسيك",
    price: 199,
    oldPrice: 259,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0JTIwd2hpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "youth-tshirts",
  },
  {
    id: "2",
    name: "هودي شبابي أسود عصري",
    price: 349,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9vZGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    isNew: true,
    category: "modern-designs",
  },
  {
    id: "3",
    name: "تي شيرت تصميم فني شبابي",
    price: 229,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvb2wlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    category: "modern-designs",
  },
  {
    id: "4",
    name: "تي شيرت رياضي أزرق",
    price: 179,
    oldPrice: 229,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb3J0JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "sports",
  },
  {
    id: "5",
    name: "هودي رياضي شبابي رمادي",
    price: 329,
    image: "https://images.unsplash.com/photo-1572495641004-28421ae29ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnQlMjBob29kaWV8ZW58MHx8MHx8fHww&auto=format&fit=crop&w=400&q=60",
    isNew: true,
    category: "sports",
  },
  {
    id: "6",
    name: "تي شيرت تصميم مميز",
    price: 249,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29vbCUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
    category: "special",
  },
  {
    id: "7",
    name: "تي شيرت كاجوال أسود",
    price: 189,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    category: "youth-tshirts",
  },
  {
    id: "8",
    name: "هودي أنيق بتصميم عصري",
    price: 379,
    oldPrice: 459,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvb2wlMjBob29kaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "special",
  },
]

export function FeaturedProducts() {
  const { addToCart } = useCart()
  const sectionRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const products = productsRef.current

      if (section && products) {
        // Stagger animation for products
        gsap.from(products.children, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    // Add item to cart with default size and color
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: "M", // Default size
      color: "أسود", // Default color - black
      image: product.image,
    })

    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.name} إلى سلة التسوق`,
    })
  }

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-primary">منتجات مميزة</h2>
          <p className="mt-4 text-muted-foreground">اكتشف أحدث تشكيلة من التشرتات الشبابية والتصاميم العصرية المميزة</p>
        </motion.div>

        <div ref={productsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              <Card className="card-hover overflow-hidden h-full flex flex-col border-0 shadow-sm">
                <div className="relative">
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />

                      <AnimatePresence>
                        {hoveredProduct === product.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center"
                          >
                            <div className="flex gap-2">
                              <Button size="icon" variant="secondary" className="rounded-full">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="secondary" className="rounded-full">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                  {product.isNew && <Badge className="absolute top-2 right-2 bg-primary">جديد</Badge>}
                  {product.isSale && <Badge className="absolute top-2 right-2 bg-destructive">خصم</Badge>}
                </div>
                <CardContent className="p-4 flex-grow">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <div className="mt-2 flex items-center">
                    <span className="font-bold text-lg">{product.price} ج.م</span>
                    {product.oldPrice && (
                      <span className="mr-2 text-sm text-muted-foreground line-through">{product.oldPrice} ج.م</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 transition-opacity"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="ml-2 h-4 w-4" />
                    أضف إلى السلة
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            عرض جميع المنتجات
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
