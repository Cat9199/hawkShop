"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, ChevronLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    {
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "المنتجات",
      href: "/dashboard/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "الطلبات",
      href: "/dashboard/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "العملاء",
      href: "/dashboard/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "الإعدادات",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile Sidebar */}
      <div className="border-b md:hidden">
        <div className="flex h-16 items-center px-4">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-10">
              <div className="mb-8">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-primary">hawkShop</span>
                </Link>
              </div>
              <nav className="grid gap-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted hover:text-primary"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-4 left-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-4 flex items-center">
            <span className="text-xl font-bold text-primary">hawkShop</span>
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="font-medium">لوحة التحكم</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        className="hidden border-l md:block"
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-8 px-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">hawkShop</span>
            </Link>
          </div>
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted hover:text-primary"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-primary">
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="hidden h-16 items-center border-b px-6 md:flex">
          <Link href="/" className="ml-4 flex items-center">
            <ChevronLeft className="ml-1 h-4 w-4" />
            العودة إلى المتجر
          </Link>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
