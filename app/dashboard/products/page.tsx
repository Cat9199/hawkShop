"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Updated products data to match our hawkShop youth t-shirt store
const productsData = [
  {
    id: "1",
    name: "تي شيرت شبابي أبيض كلاسيك",
    price: 199,
    oldPrice: 259,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0JTIwd2hpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "youth-tshirts",
    stock: 42,
  },
  {
    id: "2",
    name: "هودي شبابي أسود عصري",
    price: 349,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9vZGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    isNew: true,
    category: "modern-designs",
    stock: 25,
  },
  {
    id: "3",
    name: "تي شيرت تصميم فني شبابي",
    price: 229,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvb2wlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    category: "modern-designs",
    stock: 18,
  },
  {
    id: "4",
    name: "تي شيرت رياضي أزرق",
    price: 179,
    oldPrice: 229,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb3J0JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "sports",
    stock: 34,
  },
  {
    id: "5",
    name: "هودي رياضي شبابي رمادي",
    price: 329,
    image: "https://images.unsplash.com/photo-1572495641004-28421ae29ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnQlMjBob29kaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    isNew: true,
    category: "sports",
    stock: 20,
  },
  {
    id: "6",
    name: "تي شيرت تصميم مميز",
    price: 249,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29vbCUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
    category: "special",
    stock: 28,
  },
  {
    id: "7",
    name: "تي شيرت كاجوال أسود",
    price: 189,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    category: "youth-tshirts",
    stock: 31,
  },
  {
    id: "8",
    name: "هودي أنيق بتصميم عصري",
    price: 379,
    oldPrice: 459,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvb2wlMjBob29kaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "special",
    stock: 15,
  },
  {
    id: "9",
    name: "تي شيرت موديل حديث",
    price: 219,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvb2wlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    category: "modern-designs",
    stock: 22,
  },
  {
    id: "10",
    name: "تي شيرت رياضي أحمر",
    price: 169,
    oldPrice: 199,
    image: "https://images.unsplash.com/photo-1588731247530-4076fc99173e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlZCUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=400&q=60",
    isSale: true,
    category: "sports",
    stock: 27,
  },
  {
    id: "11",
    name: "تي شيرت شبابي أصفر",
    price: 189,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvb2wlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    category: "youth-tshirts",
    stock: 19,
  },
  {
    id: "12",
    name: "هودي مميز بقبعة",
    price: 399,
    image: "https://images.unsplash.com/photo-1536992266094-82847e1fd431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    isNew: true,
    category: "special",
    stock: 16,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(productsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج بنجاح",
      })
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">المنتجات</h1>
          <p className="text-muted-foreground">إدارة منتجات المتجر</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-full">
          <Plus className="ml-2 h-4 w-4" />
          إضافة منتج
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن منتج..."
            className="pl-3 pr-9 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2 rounded-full">
          <Filter className="h-4 w-4" />
          تصفية
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.isNew && <Badge className="absolute top-2 right-2 bg-primary">جديد</Badge>}
                {product.isSale && <Badge className="absolute top-2 right-2 bg-destructive">خصم</Badge>}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 left-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex gap-2">
                      <Edit className="h-4 w-4" />
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2 text-destructive focus:text-destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-bold text-primary">{product.price} ج.م</span>
                    {product.oldPrice && (
                      <span className="mr-2 text-sm text-muted-foreground line-through">{product.oldPrice} ج.م</span>
                    )}
                  </div>
                  <Badge variant="outline" className="font-normal">
                    المخزون: {product.stock}
                  </Badge>
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="capitalize">{product.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-lg text-muted-foreground">لا توجد منتجات تطابق البحث</p>
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد حذف المنتج</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button variant="destructive" onClick={confirmDelete} className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              نعم، حذف المنتج
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
