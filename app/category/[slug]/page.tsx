"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Eye, Filter, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"

// Updated category data
const categoryData = {
  "youth-tshirts": {
    name: "تيشرتات شبابية",
    description: "مجموعة متنوعة من التيشرتات الشبابية العصرية بتصاميم مميزة",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb3J0JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=60",
  },
  "modern-designs": {
    name: "تصاميم عصرية",
    description: "تشكيلة من التشرتات ذات التصاميم العصرية المميزة والفريدة",
    image: "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHQlMjBzaGlydCUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60",
  },
  "sports": {
    name: "تيشرتات رياضية",
    description: "تشرتات رياضية مريحة مناسبة لممارسة الرياضة وللاستخدام اليومي",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb3J0JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=60",
  },
  "special": {
    name: "تشرتات مميزة",
    description: "تشرتات ذات تصاميم مميزة وفريدة لإطلالة عصرية ملفتة",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29vbCUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60",
  },
  "offers": {
    name: "عروض خاصة",
    description: "اكتشف أفضل العروض والخصومات على التشرتات الشبابية المميزة",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpc2NvdW50JTIwc2FsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60",
  },
}

// Updated products data
const productsData = [
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
    image: "https://images.unsplash.com/photo-1572495641004-28421ae29ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnQlMjBob29kaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
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
  {
    id: "9",
    name: "تي شيرت موديل حديث",
    price: 219,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvb2wlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    category: "modern-designs",
  },
  {
    id: "10",
    name: "تي شيرت رياضي أحمر",
    price: 169,
    oldPrice: 199,
    image: "https://images.unsplash.com/photo-1588731247530-4076fc99173e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlZCUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "sports",
  },
  {
    id: "11",
    name: "تي شيرت شبابي أصفر",
    price: 189,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvb2wlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    category: "youth-tshirts",
  },
  {
    id: "12",
    name: "هودي مميز بقبعة",
    price: 399,
    image: "https://images.unsplash.com/photo-1536992266094-82847e1fd431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    isNew: true,
    category: "special",
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart()
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOption, setSortOption] = useState("featured")

  const category = categoryData[params.slug as keyof typeof categoryData] || {
    name: "فئة غير موجودة",
    description: "لم يتم العثور على هذه الفئة",
    image: "/placeholder.svg?height=400&width=1200",
  }

  // Filter products by category
  const products = productsData.filter((product) => product.category === params.slug)

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      default:
        return 0
    }
  })

  const handleAddToCart = (product: any) => {
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">{category.name}</h1>
              <p className="mt-2 max-w-2xl mx-auto">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Filters - Mobile */}
            <div className="w-full md:hidden">
              <Button
                variant="outline"
                className="w-full flex justify-between items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <span className="flex items-center">
                  <Filter className="h-4 w-4 ml-2" />
                  تصفية المنتجات
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </Button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 border rounded-lg p-4"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">لغة البرمجة</h3>
                        <div className="space-y-2">
                          {["JavaScript", "Python", "HTML", "CSS", "Git"].map((lang) => (
                            <div key={lang} className="flex items-center">
                              <Checkbox id={`lang-${lang}`} />
                              <label htmlFor={`lang-${lang}`} className="mr-2 text-sm">
                                {lang}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">السعر</h3>
                        <div className="space-y-2">
                          {["أقل من 300 ج.م", "300 - 400 ج.م", "400 - 500 ج.م", "أكثر من 500 ج.م"].map((price) => (
                            <div key={price} className="flex items-center">
                              <Checkbox id={`price-${price}`} />
                              <label htmlFor={`price-${price}`} className="mr-2 text-sm">
                                {price}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filters - Desktop */}
            <div className="hidden md:block w-1/4 border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">تصفية المنتجات</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">لغة البرمجة</h3>
                  <div className="space-y-2">
                    {["JavaScript", "Python", "HTML", "CSS", "Git"].map((lang) => (
                      <div key={lang} className="flex items-center">
                        <Checkbox id={`lang-desktop-${lang}`} />
                        <label htmlFor={`lang-desktop-${lang}`} className="mr-2 text-sm">
                          {lang}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">السعر</h3>
                  <div className="space-y-2">
                    {["أقل من 300 ج.م", "300 - 400 ج.م", "400 - 500 ج.م", "أكثر من 500 ج.م"].map((price) => (
                      <div key={price} className="flex items-center">
                        <Checkbox id={`price-desktop-${price}`} />
                        <label htmlFor={`price-desktop-${price}`} className="mr-2 text-sm">
                          {price}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">عرض {products.length} منتج</p>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      ترتيب حسب
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortOption("featured")}>الأكثر شهرة</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-asc")}>
                      السعر: من الأقل للأعلى
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-desc")}>
                      السعر: من الأعلى للأقل
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("newest")}>الأحدث</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
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
                            <span className="font-bold text-lg text-primary">{product.price} ج.م</span>
                            {product.oldPrice && (
                              <span className="mr-2 text-sm text-muted-foreground line-through">
                                {product.oldPrice} ج.م
                              </span>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 rounded-full"
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
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-lg text-muted-foreground">لا توجد منتجات في هذه الفئة حاليًا</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
