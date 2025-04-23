import type React from "react"
import type { Metadata } from "next"
import { Tajawal, Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/cart-context"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
})

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "hawkShop | بيع التشرتات الشبابيه",
  description: "متجر hawkShop - تشرتات شبابية مميزة ومتنوعة",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${cairo.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
