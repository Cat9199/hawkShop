"use client"

import { useState } from "react"
import { Search, Eye, MoreHorizontal, CheckCircle, Truck, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Updated orders data with youth t-shirt products
const ordersData = [
  {
    id: "ORD-0125",
    customer: "مصطفى أحمد",
    email: "mostafa@example.com",
    date: "2025-04-23",
    status: "مكتمل",
    total: 548,
    items: [
      { id: "1", name: "تي شيرت شبابي أبيض كلاسيك", price: 199, quantity: 1 },
      { id: "6", name: "تي شيرت تصميم مميز", price: 249, quantity: 1 },
      { id: "11", name: "تي شيرت شبابي أصفر", price: 100, quantity: 1 }, // Partial payment/discount
    ],
    address: "35 شارع الجامعة، المعادي، القاهرة، مصر",
    phone: "+20 111 234 5678",
  },
  {
    id: "ORD-0124",
    customer: "ليلى محمد",
    email: "laila@example.com",
    date: "2025-04-22",
    status: "قيد التجهيز",
    total: 329,
    items: [
      { id: "5", name: "هودي رياضي شبابي رمادي", price: 329, quantity: 1 },
    ],
    address: "78 شارع النيل، الزمالك، القاهرة، مصر",
    phone: "+20 102 345 6789",
  },
  {
    id: "ORD-0123",
    customer: "أحمد علي",
    email: "ahmed@example.com",
    date: "2025-04-22",
    status: "مكتمل",
    total: 398,
    items: [
      { id: "7", name: "تي شيرت كاجوال أسود", price: 189, quantity: 2 },
      { id: "10", name: "تي شيرت رياضي أحمر", price: 20, quantity: 1 }, // Partial payment/discount
    ],
    address: "150 شارع الهرم، الجيزة، مصر",
    phone: "+20 101 765 4321",
  },
  {
    id: "ORD-0122",
    customer: "نورا السيد",
    email: "noura@example.com",
    date: "2025-04-21",
    status: "قيد الشحن",
    total: 729,
    items: [
      { id: "2", name: "هودي شبابي أسود عصري", price: 349, quantity: 1 },
      { id: "3", name: "تي شيرت تصميم فني شبابي", price: 229, quantity: 1 },
      { id: "4", name: "تي شيرت رياضي أزرق", price: 151, quantity: 1 }, // Partial payment/discount
    ],
    address: "42 شارع المنصور، المنصورة، مصر",
    phone: "+20 115 987 6543",
  },
  {
    id: "ORD-0121",
    customer: "محمد خالد",
    email: "mohamed@example.com",
    date: "2025-04-20",
    status: "ملغي",
    total: 379,
    items: [{ id: "8", name: "هودي أنيق بتصميم عصري", price: 379, quantity: 1 }],
    address: "25 شارع عباس العقاد، مدينة نصر، القاهرة، مصر",
    phone: "+20 112 345 6788",
  },
  {
    id: "ORD-0120",
    customer: "فاطمة محمود",
    email: "fatma@example.com",
    date: "2025-04-18",
    status: "مكتمل",
    total: 438,
    items: [
      { id: "9", name: "تي شيرت موديل حديث", price: 219, quantity: 2 },
    ],
    address: "19 شارع التحرير، وسط البلد، القاهرة، مصر",
    phone: "+20 128 765 4321",
  },
  {
    id: "ORD-0119",
    customer: "كريم عبد الله",
    email: "kareem@example.com",
    date: "2025-04-17",
    status: "مكتمل",
    total: 797,
    items: [
      { id: "12", name: "هودي مميز بقبعة", price: 399, quantity: 1 },
      { id: "6", name: "تي شيرت تصميم مميز", price: 249, quantity: 1 },
      { id: "10", name: "تي شيرت رياضي أحمر", price: 149, quantity: 1 },
    ],
    address: "86 شارع شبرا، شبرا، القاهرة، مصر",
    phone: "+20 100 234 5678",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(ordersData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<(typeof ordersData)[0] | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter ? order.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const viewOrderDetails = (order: (typeof ordersData)[0]) => {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مكتمل":
        return (
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            <CheckCircle className="ml-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "قيد الشحن":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <Truck className="ml-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "قيد التجهيز":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
            <Clock className="ml-1 h-3 w-3" />
            {status}
          </Badge>
        )
      case "ملغي":
        return (
          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
            <XCircle className="ml-1 h-3 w-3" />
            {status}
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">الطلبات</h1>
          <p className="text-muted-foreground">إدارة طلبات العملاء</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن طلب..."
            className="pl-3 pr-9 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter || "all"}
          onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-full md:w-[180px] rounded-full">
            <SelectValue placeholder="جميع الحالات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="مكتمل">مكتمل</SelectItem>
            <SelectItem value="قيد الشحن">قيد الشحن</SelectItem>
            <SelectItem value="قيد التجهيز">قيد التجهيز</SelectItem>
            <SelectItem value="ملغي">ملغي</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الطلب</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>المجموع</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{order.customer}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.total} ج.م</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => viewOrderDetails(order)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">عرض التفاصيل</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">فتح القائمة</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>تغيير الحالة</DropdownMenuItem>
                        <DropdownMenuItem>إرسال إشعار</DropdownMenuItem>
                        <DropdownMenuItem>طباعة الفاتورة</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-lg text-muted-foreground">لا توجد طلبات تطابق البحث</p>
        </div>
      )}

      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب {selectedOrder?.id}</DialogTitle>
            <DialogDescription>تم الطلب بتاريخ {selectedOrder?.date}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">معلومات العميل</h3>
                  <p>{selectedOrder.customer}</p>
                  <p>{selectedOrder.email}</p>
                  <p>{selectedOrder.phone}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">عنوان الشحن</h3>
                  <p>{selectedOrder.address}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">المنتجات</h3>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>الكمية</TableHead>
                        <TableHead>المجموع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.price} ج.م</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.price * item.quantity} ج.م</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <div>
                  <h3 className="font-semibold">حالة الطلب</h3>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">المجموع</p>
                  <p className="text-2xl font-bold text-primary">{selectedOrder.total} ج.م</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
