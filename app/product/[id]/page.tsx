"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Heart, Share2, Check } from "lucide-react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"

// Youth t-shirt product database
const productsDatabase = [
  {
    id: "1",
    name: "تي شيرت شبابي أبيض كلاسيك",
    price: 199,
    oldPrice: 259,
    description: "تي شيرت شبابي أبيض بتصميم كلاسيكي أنيق مصنوع من قطن عالي الجودة، مريح وعملي للاستخدام اليومي",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0JTIwd2hpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1622445275463-eaccb6cbdfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["أبيض", "أسود", "رمادي"],
    isSale: true,
    features: [
      "قطن 100% عالي الجودة",
      "مناسب لجميع المناسبات",
      "تصميم عصري",
      "سهل العناية والغسيل",
      "قماش مريح"
    ],
    category: "youth-tshirts",
  },
  {
    id: "2",
    name: "هودي شبابي أسود عصري",
    price: 349,
    description: "هودي شبابي أسود بتصميم عصري أنيق، مصنوع من قماش ناعم ومريح مع قبعة وجيب أمامي، مناسب للاستخدام اليومي",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9vZGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9vZGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["أسود", "رمادي", "أزرق داكن"],
    isNew: true,
    features: [
      "قماش مخلوط قطن بوليستر عالي الجودة",
      "جيب كنغر أمامي",
      "قبعة مبطنة",
      "أكمام طويلة",
      "تصميم مريح وعصري"
    ],
    category: "modern-designs",
  },
  {
    id: "3",
    name: "تي شيرت تصميم فني شبابي",
    price: 229,
    description: "تي شيرت بتصميم فني عصري للشباب، مصنوع من قطن ناعم وخامة ممتازة، مريح للارتداء اليومي ومناسب لمختلف المناسبات",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvb2wlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1583744946564-b52d496ee6da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["أسود", "أبيض", "أصفر"],
    features: [
      "قطن 100%",
      "طباعة عالية الجودة",
      "تصميم فني مميز",
      "قماش ناعم ومريح",
      "مناسب لمختلف المناسبات"
    ],
    category: "modern-designs",
  },
  {
    id: "4",
    name: "تي شيرت رياضي أزرق",
    price: 179,
    oldPrice: 229,
    description: "تي شيرت رياضي أزرق مصنوع من قماش قطني خفيف ومريح، مثالي لممارسة الرياضة والنشاطات اليومية، بتصميم عصري وألوان زاهية",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb3J0JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnQlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0JTIwd2hpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["أزرق", "أحمر", "أسود"],
    isSale: true,
    features: [
      "قماش تقني سريع الجفاف",
      "مناسب لممارسة الرياضة",
      "تصميم خفيف ومريح",
      "مقاوم للعرق والرطوبة",
      "ألوان ثابتة لا تبهت مع كثرة الغسيل"
    ],
    category: "sports",
  },
  // ... other products definition
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const productImageRef = useRef<HTMLDivElement>(null)

  // Find product in our database based on params.id
  const product = productsDatabase.find(p => p.id === params.id) || {
    id: params.id,
    name: "منتج غير موجود",
    price: 0,
    description: "هذا المنتج غير متوفر حاليًا",
    images: ["/placeholder.svg?height=600&width=500"],
    sizes: ["S", "M", "L"],
    colors: ["أسود", "أبيض"],
    features: ["غير متوفر"],
    category: "unknown"
  }

  useEffect(() => {
    if (productImageRef.current) {
      gsap.fromTo(
        productImageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
      )
    }
  }, [activeImage])

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "يرجى اختيار المقاس",
        description: "يجب اختيار المقاس قبل إضافة المنتج إلى السلة",
        variant: "destructive",
      })
      return
    }

    if (!selectedColor) {
      toast({
        title: "يرجى اختيار اللون",
        description: "يجب اختيار اللون قبل إضافة المنتج إلى السلة",
        variant: "destructive",
      })
      return
    }

    // Add item to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0]
    })

    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.name} إلى سلة التسوق`,
    })
  }

  // Find the category link and name
  const getCategoryInfo = () => {
    switch (product.category) {
      case "youth-tshirts":
        return { link: "/category/youth-tshirts", name: "تيشرتات شبابية" };
      case "modern-designs":
        return { link: "/category/modern-designs", name: "تصاميم عصرية" };
      case "sports":
        return { link: "/category/sports", name: "تيشرتات رياضية" };
      case "special":
        return { link: "/category/special", name: "تشرتات مميزة" };
      default:
        return { link: "/", name: "جميع المنتجات" };
    }
  }

  const categoryInfo = getCategoryInfo();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <motion.div
          className="container py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <nav className="flex text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                الرئيسية
              </Link>
              <span className="mx-2">/</span>
              <Link href={categoryInfo.link} className="hover:text-primary">
                {categoryInfo.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <motion.div
                ref={productImageRef}
                className="relative aspect-square overflow-hidden rounded-lg shadow-sm"
                layoutId={`product-image-${product.id}`}
              >
                <Image
                  src={product.images[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isSale && <Badge className="absolute top-4 right-4 bg-destructive pulse-glow">خصم</Badge>}
                {product.isNew && <Badge className="absolute top-4 right-4 bg-primary pulse-glow">جديد</Badge>}
              </motion.div>

              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative aspect-square overflow-hidden rounded-md cursor-pointer ${
                      activeImage === index ? "ring-2 ring-primary" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - صورة ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="mt-4 flex items-center">
                  <span className="text-2xl font-bold text-primary">{product.price} ج.م</span>
                  {product.oldPrice && (
                    <span className="mr-2 text-lg text-muted-foreground line-through">{product.oldPrice} ج.م</span>
                  )}
                  {product.isSale && product.oldPrice && (
                    <Badge className="mr-2 bg-destructive">
                      خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">المقاس</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className={`h-10 w-10 rounded-md p-0 ${
                          selectedSize === size ? "bg-primary text-primary-foreground" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">اللون</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        className={selectedColor === color ? "bg-primary text-primary-foreground" : ""}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && <Check className="ml-1 h-4 w-4" />}
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">الكمية</h3>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={decrementQuantity}>
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">تقليل</span>
                    </Button>
                    <motion.span
                      key={quantity}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mx-4 w-8 text-center"
                    >
                      {quantity}
                    </motion.span>
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={incrementQuantity}>
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">زيادة</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  أضف إلى السلة
                </Button>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">أضف إلى المفضلة</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">مشاركة</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">الوصف</TabsTrigger>
                <TabsTrigger value="features">المميزات</TabsTrigger>
                <TabsTrigger value="shipping">الشحن والإرجاع</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  <p>
                    يتميز هذا المنتج بقصته العصرية وتصميمه الأنيق المناسب للشباب. مصنوع من أفضل الأقمشة عالية الجودة لتوفير الراحة طوال اليوم.
                  </p>
                  <p>
                    مناسب للارتداء في المناسبات الرسمية وغير الرسمية، ويمكن تنسيقه مع مختلف الأزياء لإطلالة عصرية ومميزة.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="list-inside list-disc space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <div className="prose max-w-none">
                  <h3>معلومات الشحن</h3>
                  <p>يتم شحن جميع الطلبات خلال 1-3 أيام عمل. الشحن مجاني للطلبات التي تزيد قيمتها عن 500 جنيه.</p>
                  <h3>سياسة الإرجاع</h3>
                  <p>يمكنك إرجاع المنتج خلال 14 يومًا من تاريخ الاستلام إذا كان غير مستخدم وفي عبوته الأصلية.</p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
