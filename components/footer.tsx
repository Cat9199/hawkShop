"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Github } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-lg font-bold text-primary">hawkShop</h3>
            <p className="text-muted-foreground">
              متجر تشرتات شبابية مميزة بتصاميم عصرية تناسب جميع الأذواق والمناسبات.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">فيسبوك</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">انستغرام</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">تويتر</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">جيثب</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 text-lg font-semibold">تسوق</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/youth-tshirts" className="text-muted-foreground hover:text-primary transition-colors">
                  تيشرتات شبابية
                </Link>
              </li>
              <li>
                <Link
                  href="/category/modern-designs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  تصاميم عصرية
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-muted-foreground hover:text-primary transition-colors">
                  تيشرتات رياضية
                </Link>
              </li>
              <li>
                <Link href="/category/special" className="text-muted-foreground hover:text-primary transition-colors">
                  تشرتات مميزة
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-muted-foreground hover:text-primary transition-colors">
                  عروض خاصة
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-lg font-semibold">معلومات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  سياسة الشحن
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  سياسة الإرجاع
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-lg font-semibold">اتصل بنا</h3>
            <address className="not-italic text-muted-foreground">
              <p>القاهرة، جمهورية مصر العربية</p>
              <p className="mt-2">البريد الإلكتروني: info@hawkshop.com</p>
              <p className="mt-2">الهاتف: +20 123 456 7890</p>
            </address>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">وسائل الدفع المقبولة</h4>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs">Visa</div>
                <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs">MC</div>
                <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs">Fawry</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 border-t pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} hawkShop. جميع الحقوق محفوظة. صنع بـ <span className="text-primary">❤</span> في مصر
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
