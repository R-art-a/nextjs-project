// src/app/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface MenuItem {
  id: number
  name: string
  price: number
  category: string
  img: string
  is_sold_out: boolean
  description?: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const categories = ["定食", "麺類", "丼"]

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [people, setPeople] = useState<string>("2")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // 各メニューごとの「選択中の個数」を管理する状態
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("/api/menu")
        if (!response.ok) throw new Error("データの取得に失敗しました")
        const data = await response.json()
        setMenuItems(data)

        const initialQuantities: { [key: number]: number } = {}
        data.forEach((item: MenuItem) => {
          initialQuantities[item.id] = 1
        })
        setSelectedQuantities(initialQuantities)
      } catch (err) {
        console.error(err)
        setError("データベースからメニューを読み込めませんでした。")
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  const handleQuantityChange = (itemId: number, qty: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [itemId]: qty,
    }))
  }

  // 🛒 カートに追加
  const addToCart = (item: MenuItem) => {
    if (item.is_sold_out) {
      setError(`申し訳ありません。${item.name}は只今品切れ中です。`)
      setTimeout(() => setError(null), 3000)
      return
    }
    setError(null)

    const quantityToAdd = selectedQuantities[item.id] || 1

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd } 
            : cartItem
        )
      }
      return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: quantityToAdd }]
    })

    // 追加した後は選択個数を1個に戻す
    handleQuantityChange(item.id, 1)
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId)
      if (!existingItem) return prevCart

      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== itemId)
      } else {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      }
    })
  }

  const clearItemFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId))
  }

  // 🎯 指定のエリアにスムーススクロールさせる共通関数
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const peopleCount = parseInt(people, 10)
  const perPersonPrice = peopleCount > 0 ? Math.ceil(totalPrice / peopleCount) : 0
  const totalCartCount = cart.reduce((a, b) => a + b.quantity, 0)

  return (
    <div className="flex h-screen flex-col bg-zinc-50 text-zinc-900 overflow-hidden scroll-smooth">
      <header className="border-b bg-white px-4 py-4 shadow-sm shrink-0 z-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold tracking-tight text-center sm:text-left">OSAKI亭</h1>
          <nav className="flex justify-center gap-4 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">ホーム</a>
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => scrollToSection(cat)} 
                className="hover:text-zinc-900 transition-colors"
              >
                {cat}
              </button>
            ))}
            {/* 🛠️ カートテキストをクリックしたときも、現在の注文リストへ飛ぶようにボタン化 */}
            <button 
              onClick={() => scrollToSection("cart-section")} 
              className="hover:text-zinc-900 transition-colors font-bold text-zinc-900"
            >
              🛒 カート({totalCartCount})
            </button>
          </nav>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-center text-sm font-medium text-red-600">
          ⚠️ {error}
        </div>
      )}

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto w-full max-w-md space-y-8 pb-32">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">メニュー選択</h2>
            <p className="text-sm text-zinc-500">PostgreSQLデータベースからデータを取得しています。</p>
          </div>

          {loading ? (
            <p className="text-center text-zinc-400 py-10 text-sm">メニューを読み込み中...</p>
          ) : (
            categories.map((category) => (
              <div key={category} id={category} className="space-y-3 scroll-mt-4">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-1 rounded-full bg-zinc-900"></span>
                  <h3 className="text-base font-bold text-zinc-800">{category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const currentQty = selectedQuantities[item.id] || 1
                      return (
                        <Card key={item.id} className={`flex flex-col overflow-hidden bg-white shadow-sm border border-zinc-200 rounded-xl relative ${item.is_sold_out ? "opacity-60" : ""}`}>
                          {item.is_sold_out && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
                              品切れ
                            </div>
                          )}
                          <img src={item.img} alt={item.name} className="h-28 w-full object-cover" />
                          <div className="p-3 flex flex-col justify-between flex-1 space-y-3">
                            <div>
                              <span className="font-semibold text-sm line-clamp-2 text-zinc-800">{item.name}</span>
                              <span className="text-zinc-900 font-bold text-sm block mt-0.5">¥{item.price}</span>
                            </div>
                            
                            <div className="flex items-center gap-1.5 w-full">
                              {!item.is_sold_out ? (
                                <>
                                  <select
                                    value={currentQty}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                    className="h-8 bg-zinc-50 border border-zinc-200 rounded-lg px-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:border-zinc-400 shrink-0"