"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Users, DollarSign, Package, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [period, setPeriod] = useState("today")

  // Mock data updated for hawkShop t-shirt store
  const stats = {
    today: {
      sales: 3250,
      salesChange: 15,
      orders: 12,
      ordersChange: 8,
      customers: 7,
      customersChange: 4,
      products: 48,
      productsChange: 2,
    },
    week: {
      sales: 18500,
      salesChange: 22,
      orders: 86,
      ordersChange: 16,
      customers: 45,
      customersChange: 12,
      products: 52,
      productsChange: 4,
    },
    month: {
      sales: 72400,
      salesChange: 28,
      orders: 324,
      ordersChange: 20,
      customers: 156,
      customersChange: 18,
      products: 58,
      productsChange: 10,
    },
  }

  const currentStats = stats[period as keyof typeof stats]

  // Recent orders mock data updated for hawkShop
  const recentOrders = [
    {
      id: "ORD-0125",
      customer: "مصطفى أحمد",
      date: "2025-04-23",
      status: "مكتمل",
      total: 548,
    },
    {
      id: "ORD-0124",
      customer: "ليلى محمد",
      date: "2025-04-22",
      status: "قيد التجهيز",
      total: 329,
    },
    {
      id: "ORD-0123",
      customer: "أحمد علي",
      date: "2025-04-22",
      status: "مكتمل",
      total: 398,
    },
    {
      id: "ORD-0122",
      customer: "نورا السيد",
      date: "2025-04-21",
      status: "قيد الشحن",
      total: 729,
    },
    {
      id: "ORD-0121",
      customer: "محمد خالد",
      date: "2025-04-20",
      status: "مكتمل",
      total: 379,
    },
  ]

  // Top products mock data updated with youth t-shirt products
  const topProducts = [
    {
      id: "1",
      name: "تي شيرت شبابي أبيض كلاسيك",
      sales: 32,
      revenue: 6368,
    },
    {
      id: "2",
      name: "هودي شبابي أسود عصري",
      sales: 28,
      revenue: 9772,
    },
    {
      id: "6",
      name: "تي شيرت تصميم مميز",
      sales: 25,
      revenue: 6225,
    },
    {
      id: "4",
      name: "تي شيرت رياضي أزرق",
      sales: 24,
      revenue: 4296,
    },
    {
      id: "8",
      name: "هودي أنيق بتصميم عصري",
      sales: 22,
      revenue: 8338,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">لوحة التحكم</h1>
          <p className="text-muted-foreground">مرحبًا بك في لوحة تحكم متجر hawkShop</p>
        </div>
        <Tabs defaultValue="today" value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="today">اليوم</TabsTrigger>
            <TabsTrigger value="week">الأسبوع</TabsTrigger>
            <TabsTrigger value="month">الشهر</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">المبيعات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.sales} ج.م</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {currentStats.salesChange > 0 ? (
                  <>
                    <ArrowUpRight className="ml-1 h-3 w-3 text-primary" />
                    <span className="text-primary">+{currentStats.salesChange}%</span>
                  </>
                ) : currentStats.salesChange < 0 ? (
                  <>
                    <ArrowDownRight className="ml-1 h-3 w-3 text-destructive" />
                    <span className="text-destructive">{currentStats.salesChange}%</span>
                  </>
                ) : (
                  <span>0%</span>
                )}
                <span className="mr-1">مقارنة بالفترة السابقة</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">الطلبات</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.orders}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {currentStats.ordersChange > 0 ? (
                  <>
                    <ArrowUpRight className="ml-1 h-3 w-3 text-primary" />
                    <span className="text-primary">+{currentStats.ordersChange}%</span>
                  </>
                ) : currentStats.ordersChange < 0 ? (
                  <>
                    <ArrowDownRight className="ml-1 h-3 w-3 text-destructive" />
                    <span className="text-destructive">{currentStats.ordersChange}%</span>
                  </>
                ) : (
                  <span>0%</span>
                )}
                <span className="mr-1">مقارنة بالفترة السابقة</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">العملاء</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.customers}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {currentStats.customersChange > 0 ? (
                  <>
                    <ArrowUpRight className="ml-1 h-3 w-3 text-primary" />
                    <span className="text-primary">+{currentStats.customersChange}%</span>
                  </>
                ) : currentStats.customersChange < 0 ? (
                  <>
                    <ArrowDownRight className="ml-1 h-3 w-3 text-destructive" />
                    <span className="text-destructive">{currentStats.customersChange}%</span>
                  </>
                ) : (
                  <span>0%</span>
                )}
                <span className="mr-1">مقارنة بالفترة السابقة</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.products}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {currentStats.productsChange > 0 ? (
                  <>
                    <ArrowUpRight className="ml-1 h-3 w-3 text-primary" />
                    <span className="text-primary">+{currentStats.productsChange}</span>
                  </>
                ) : currentStats.productsChange < 0 ? (
                  <>
                    <ArrowDownRight className="ml-1 h-3 w-3 text-destructive" />
                    <span className="text-destructive">{currentStats.productsChange}</span>
                  </>
                ) : (
                  <span>0</span>
                )}
                <span className="mr-1">منتج جديد</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>آخر الطلبات</CardTitle>
                <Button variant="outline" size="sm">
                  عرض الكل
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.id} • {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          order.status === "مكتمل"
                            ? "bg-primary/10 text-primary"
                            : order.status === "قيد الشحن"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="font-medium">{order.total} ج.م</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>أفضل المنتجات مبيعًا</CardTitle>
                <Button variant="outline" size="sm">
                  عرض الكل
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} مبيعة</p>
                    </div>
                    <div>
                      <span className="font-medium">{product.revenue} ج.م</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
