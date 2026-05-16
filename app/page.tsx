"use client" // 1. 状態管理（useState）を使うために必須の一文

import { useState } from "react" // 状態を管理するための機能をインポート
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input" // 割り勘の人数入力用にインポート

const menuItems = [
  // 1. 定食ジャンル (野菜炒め定食をテスト用に品切れにしています)
  { id: 1, name: "生姜焼き定食", price: 1200, category: "定食", img: "/shougayaki.png", isSoldOut: false },
  { id: 2, name: "唐揚げ定食", price: 950, category: "定食", img: "/karaageteishoku.png", isSoldOut: false },
  { id: 3, name: "野菜炒め定食", price: 880, category: "定食", img: "/yasaiitame.png", isSoldOut: true },
  
  // 2. 麺類ジャンル
  { id: 4, name: "ラーメン", price: 450, category: "麺類", img: "/ramen.png", isSoldOut: false },
  { id: 5, name: "うどん", price: 550, category: "麺類", img: "/udon.png", isSoldOut: false },
  { id: 6, name: "そば", price: 480, category: "麺類", img: "/soba.png", isSoldOut: false },
  
  // 3. 丼ジャンル
  { id: 7, name: "からあげ丼", price: 500, category: "丼", img: "/karaage.png", isSoldOut: false },
  { id: 8, name: "たれかつ丼", price: 600, category: "丼", img: "/tarekatu.png", isSoldOut: false },
  { id: 9, name: "カレー", price: 750, category: "丼", img: "/kare.png", isSoldOut: false },
]

const categories = ["定食", "麺類", "丼"]

// カートに入った商品の型定義
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function Home() {
  // --- 状態管理（State）の設定 ---
  const [cart, setCart] = useState<CartItem[]>([]) // 注文リスト用の配列
  const [people, setPeople] = useState<string>("2") // 割り勘人数（初期値2人、入力しやすいよう文字列管理）
  const [error, setError] = useState<string | null>(null) // エラーメッセージ用

  // --- ビジネスロジック1: 注文リストへの追加と品切れ判定 ---
  const addToCart = (item: typeof menuItems[0]) => {
    // 品切れチェック
    if (item.isSoldOut) {
      setError(`申し訳ありません。${item.name}は只今品切れ中です。`)
      // 3秒後に自動でエラーメッセージを消す
      setTimeout(() => setError(null), 3000)
      return
    }

    setError(null) // エラーをリセット

    setCart((prevCart) => {
      // すでにカートにあるか探す
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        // すでにあれば数量を+1する
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      }
      // なければ新規追加
      return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  // --- ビジネスロジック2: 合計金額の計算 (reduce を使用) ---
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // --- ビジネスロジック3: 割り勘計算 (0 や空文字をガード) ---
  const peopleCount = parseInt(people, 10)
  const perPersonPrice = peopleCount > 0 ? Math.ceil(totalPrice / peopleCount) : 0

  return (
    <div className="flex h-screen flex-col bg-zinc-50 text-zinc-900 overflow-hidden scroll-smooth">
      
      {/* 1. 固定ヘッダー */}
      <header className="border-b bg-white px-4 py-4 shadow-sm shrink-0 z-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold tracking-tight text-center sm:text-left">OSAKI亭</h1>
          
          <nav className="flex justify-center gap-4 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">ホーム</a>
            <a href="#定食" className="hover:text-zinc-900 transition-colors">定食</a>
            <a href="#麺類" className="hover:text-zinc-900 transition-colors">麺類</a>
            <a href="#丼" className="hover:text-zinc-900 transition-colors">丼</a>
          </nav>
        </div>
      </header>

      {/* エラーメッセージのトースト風通知表示（品切れ時に上部にピョコッと出ます） */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-center text-sm font-medium text-red-600 animate-in fade-in duration-200">
          ⚠️ {error}
        </div>
      )}

      {/* 2. メインコンテンツ */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto w-full max-w-md space-y-8 pb-32">
          
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">メニュー選択</h2>
            <p className="text-sm text-zinc-500">ご注文される商品をお選びください。</p>
          </div>

          {/* メニュー一覧表示部分 */}
          {categories.map((category) => (
            <div key={category} id={category} className="space-y-3 scroll-mt-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-zinc-900"></span>
                <h3 className="text-base font-bold text-zinc-800">{category}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <Card key={item.id} className={`flex flex-col overflow-hidden bg-white shadow-sm border border-zinc-200 rounded-xl relative ${item.isSoldOut ? "opacity-60" : ""}`}>
                      
                      {/* 品切れ時のオーバーレイ表示 */}
                      {item.isSoldOut && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">
                          品切れ
                        </div>
                      )}

                      <img src={item.img} alt={item.name} className="h-28 w-full object-cover" />
                      
                      <div className="p-3 flex flex-col justify-between flex-1 space-y-2">
                        <div>
                          <span className="font-semibold text-sm line-clamp-2 text-zinc-800">{item.name}</span>
                          <span className="text-zinc-900 font-bold text-sm block mt-0.5">¥{item.price}</span>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant={item.isSoldOut ? "secondary" : "default"}
                          className="w-full h-8 text-xs font-medium rounded-lg"
                          onClick={() => addToCart(item)} // クリックイベントの設定
                        >
                          {item.isSoldOut ? "品切れ" : "追加する"}
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}

          {/* リアルタイムで更新される注文リストUIの追加 */}
          <Card className="border border-zinc-200 shadow-sm rounded-xl bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">現在の注文リスト</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {cart.length === 0 ? (
                <p className="text-zinc-400 text-center py-4">注文リストは空です</p>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <span className="text-zinc-700">{item.name} <span className="text-xs text-zinc-400">×{item.quantity}</span></span>
                      <span className="font-medium text-zinc-900">¥{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 合計金額と割り勘計算エリア */}
              <div className="border-t pt-3 space-y-3">
                <div className="flex justify-between items-center text-base font-bold">
                  <span>合計金額</span>
                  <span className="text-lg text-zinc-900">¥{totalPrice.toLocaleString()}</span>
                </div>

                {/* 割り勘機能の入力欄と表示 */}
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

      {/* 3. スマホ下部に固定される注文確定風の案内エリア */}
      <div className="border-t bg-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] shrink-0 flex justify-between items-center">
        <div>
          <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">合計</div>
          <div className="text-lg font-black text-zinc-900">¥{totalPrice.toLocaleString()}</div>
        </div>
        <Button disabled={cart.length === 0} className="w-48 h-11 text-sm font-bold bg-zinc-900 text-white rounded-xl shadow-sm">
          注文を確定する ({cart.reduce((a, b) => a + b.quantity, 0)})
        </Button>
      </div>

      {/* 4. 固定フッター */}
      <footer className="border-t bg-zinc-50 px-6 py-3 text-center text-xs text-zinc-400 shrink-0">
        <div className="mx-auto max-w-5xl">
          © 2026 OSAKI亭. All rights reserved.
        </div>
      </footer>

    </div>
  )
}