"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, Search, User, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"

export function Navbar() {
  const { getCartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = [
    { name: "تيشرتات شبابية", href: "/category/youth-tshirts" },
    { name: "تصاميم عصرية", href: "/category/modern-designs" },
    { name: "تيشرتات رياضية", href: "/category/sports" },
    { name: "تشرتات مميزة", href: "/category/special" },
    { name: "عروض", href: "/offers" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b bg-background/95 shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center">
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-10">
              <nav className="grid gap-6 text-lg font-medium">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={category.href}
                      className="hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <Link href="/" className="ml-4 flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-xl font-bold text-primary">hawkShop</span>
          </motion.div>
        </Link>
        <nav className="mx-6 hidden items-center space-x-6 md:flex">
          {categories.map((category, index) => (
            <motion.div
              key={category.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href={category.href} className="text-sm font-medium transition-colors hover:text-primary">
                {category.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="w-full max-w-sm flex relative"
              >
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="ابحث عن منتج..."
                  className="w-full pr-8 rounded-full bg-muted"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-1 top-1"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">بحث</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">حسابي</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-1 -left-1 h-5 w-5 rounded-full p-0 flex items-center justify-center pulse-glow">
                    {getCartCount()}
                  </Badge>
                )}
                <span className="sr-only">عربة التسوق</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
