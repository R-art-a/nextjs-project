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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false) // 二重送信対策用

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

  // 🚀 注文をサーバーへ送信して確定する関数
  const submitOrder = async () => {
    if (cart.length === 0 || isSubmitting) return

    setIsSubmitting(true) // ボタンを無効化（二重送信対策）
    setError(null)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          totalPrice: totalPrice,
          peopleCount: peopleCount,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "注文に失敗しました。")
      }

      // 🎉 成功時のフィードバック
      alert(`注文が確定しました！ (注文ID: ${data.orderId})\nご利用ありがとうございました！`)
      setCart([]) // カートを空にする
    } catch (err: any) {
      console.error(err)
      setError(err.message || "注文処理中にエラーが発生しました。")
    } finally {
      setIsSubmitting(false) // ボタンの無効化を解除
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
                                  >
                                    {[...Array(10)].map((_, i) => (
                                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                  </select>

                                  <Button 
                                    size="sm" 
                                    className="flex-1 h-8 text-xs font-bold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white"
                                    onClick={() => addToCart(item)}
                                  >
                                    追加
                                  </Button>
                                </>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="secondary"
                                  className="w-full h-8 text-xs font-bold rounded-lg"
                                  disabled
                                >
                                  品切れ
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                </div>
              </div>
            ))
          )}

          {/* 注文リストUI */}
          <Card id="cart-section" className="border border-zinc-200 shadow-sm rounded-xl bg-white scroll-mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">現在の注文リスト</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {cart.length === 0 ? (
                <p className="text-zinc-400 text-center py-4">注文リストは空です</p>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2.5">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-5 h-5 flex items-center justify-center bg-zinc-100 text-zinc-600 rounded hover:bg-zinc-200 transition-colors text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="text-zinc-700">
                          {item.name} <span className="text-xs font-bold text-zinc-500">×{item.quantity}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-zinc-900">¥{(item.price * item.quantity).toLocaleString()}</span>
                        <button 
                          onClick={() => clearItemFromCart(item.id)}
                          className="px-1.5 py-0.5 text-[11px] bg-red-50 text-red-500 rounded hover:bg-red-100 transition-colors font-medium"
                        >
                          消す
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-t pt-3 space-y-3">
                <div className="flex justify-between items-center text-base font-bold">
                  <span>合計金額</span>
                  <span className="text-lg text-zinc-900">¥{totalPrice.toLocaleString()}</span>
                </div>
                <div className="bg-zinc-50 rounded-lg p-3 space-y-2 border border-zinc-100">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 font-medium shrink-0">割り勘人数</span>
                    <Input 
                      type="number" 
                      min="1" 
                      value={people} 
                      onChange={(e) => setPeople(e.target.value)}
                      className="w-20 h-8 text-right text-sm bg-white border-zinc-200"
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold border-t border-dashed border-zinc-200 pt-2">
                    <span className="text-zinc-500">1人あたり（端数切上げ）</span>
                    <span className="text-sm font-bold text-zinc-900">¥{perPersonPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 下部固定フッターエリア */}
      <div className="border-t bg-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] shrink-0 flex justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">合計</div>
            <div className="text-lg font-black text-zinc-900">¥{totalPrice.toLocaleString()}</div>
          </div>
          <Button 
            onClick={() => scrollToSection("cart-section")}
            variant="outline"
            className="h-11 text-xs px-3 border-zinc-300 font-semibold rounded-xl flex items-center gap-1 hover:bg-zinc-50"
          >
            🛒 カートを見る ({totalCartCount})
          </Button>
        </div>
        
        <Button 
          disabled={cart.length === 0 || isSubmitting} 
          onClick={submitOrder}
          className="w-40 sm:w-48 h-11 text-sm font-bold bg-zinc-900 text-white rounded-xl shadow-sm disabled:opacity-50"
        >
          {isSubmitting ? "送信中..." : "注文を確定する"}
        </Button>
      </div>

      <footer className="border-t bg-zinc-50 px-6 py-3 text-center text-xs text-zinc-400 shrink-0">
        <div className="mx-auto max-w-5xl">© 2026 OSAKI亭. All rights reserved.</div>
      </footer>
    </div>
  )
}