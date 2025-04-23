"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, getCartTotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const subtotal = getCartTotal()
  const shipping = subtotal > 500 ? 0 : 50
  const discount = 0 // This would be calculated based on coupon
  const total = subtotal + shipping - discount

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)

    toast({
      title: "تمت إزالة المنتج",
      description: `تم إزالة ${name} من سلة التسوق بنجاح`,
    })
  }

  const handleApplyCoupon = () => {
    if (!couponCode) return

    setIsApplyingCoupon(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false)

      toast({
        title: "عذراً",
        description: "كود الخصم غير صالح أو منتهي الصلاحية",
        variant: "destructive",
      })
    }, 1500)
  }

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
          <h1 className="mb-6 text-2xl font-bold text-primary">سلة التسوق</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <motion.div
                  className="rounded-lg border shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">المنتجات ({cartItems.length})</h2>
                    <div className="space-y-6">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex gap-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="flex justify-between">
                                <Link href={`/product/${item.id}`} className="font-medium hover:text-primary">
                                  {item.name}
                                </Link>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRemoveItem(item.id, item.name)}
                                  className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">إزالة</span>
                                </motion.button>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                <span>المقاس: {item.size}</span>
                                <span className="mx-2">|</span>
                                <span>اللون: {item.color}</span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-input hover:bg-muted"
                                  >
                                    <Minus className="h-3 w-3" />
                                    <span className="sr-only">تقليل</span>
                                  </motion.button>
                                  <motion.span
                                    key={item.quantity}
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mx-2 w-6 text-center"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-input hover:bg-muted"
                                  >
                                    <Plus className="h-3 w-3" />
                                    <span className="sr-only">زيادة</span>
                                  </motion.button>
                                </div>
                                <div className="font-medium text-primary">{item.price * item.quantity} ج.م</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-6 rounded-lg border p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="mb-4 text-lg font-semibold">كود الخصم</h2>
                  <div className="flex gap-2">
                    <Input
                      placeholder="أدخل كود الخصم"
                      className="flex-1 rounded-full"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode}
                      className="bg-primary hover:bg-primary/90 rounded-full"
                    >
                      {isApplyingCoupon ? "جاري التطبيق..." : "تطبيق"}
                    </Button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="rounded-lg border p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="mb-4 text-lg font-semibold">ملخص الطلب</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الشحن</span>
                    <span>{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>الخصم</span>
                      <span>- {discount} ج.م</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>المجموع</span>
                    <span className="text-primary">{total} ج.م</span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-full" size="lg">
                    إتمام الطلب
                  </Button>
                  <Link
                    href="/"
                    className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary"
                  >
                    <ArrowRight className="ml-1 h-4 w-4" />
                    متابعة التسوق
                  </Link>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center rounded-lg border py-12 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
              </motion.div>
              <h2 className="mb-2 text-xl font-semibold">سلة التسوق فارغة</h2>
              <p className="mb-6 text-muted-foreground">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90 rounded-full">متابعة التسوق</Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
