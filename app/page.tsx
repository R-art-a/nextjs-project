import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const menuItems = [
  // 1. 主菜ジャンル
  { id: 1, name: "生姜焼き定食", price: 1200, category: "定食", img: "/shougayaki.png" },
  { id: 2, name: "唐揚げ定食", price: 950, category: "定食", img: "/karaageteishoku.png" },
  { id: 3, name: "野菜炒め定食", price: 880, category: "定食", img: "/yasaiitame.png" },
  
  // 2. 飲み物ジャンル
  { id: 4, name: "ラーメン", price: 450, category: "麺類", img: "/ramen.png" },
  { id: 5, name: "うどん", price: 550, category: "麺類", img: "/udon.png" },
  { id: 6, name: "そば", price: 480, category: "麺類", img: "/soba.png" },
  
  // 3. デザートジャンル
  { id: 7, name: "からあげ丼", price: 500, category: "丼", img: "/karaage.png" },
  { id: 8, name: "たれかつ丼", price: 600, category: "丼", img: "/tarekatu.png" },
  { id: 9, name: "カレー", price: 750, category: "丼", img: "/kare.png" },
]

const categories = ["定食", "麺類", "丼"]

export default function Home() {
  return (
    // スムーズなスクロールを有効にするため html 全体に scroll-behavior を効かせる代わりに、Tailwindの「scroll-smooth」を入れています
    <div className="flex h-screen flex-col bg-zinc-50 text-zinc-900 overflow-hidden scroll-smooth">
      
      {/* 1. 固定ヘッダー */}
      <header className="border-b bg-white px-4 py-4 shadow-sm shrink-0">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold tracking-tight text-center sm:text-left">OSAKI亭</h1>
          
          {/* 横並びのナビゲーションメニュー（スマホでもタップしやすいように少し隙間を空けています） */}
          <nav className="flex justify-center gap-4 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">ホーム</a>
            <a href="#フード" className="hover:text-zinc-900 transition-colors">フード</a>
            <a href="#ドリンク" className="hover:text-zinc-900 transition-colors">ドリンク</a>
            <a href="#デザート" className="hover:text-zinc-900 transition-colors">デザート</a>
          </nav>
        </div>
      </header>

      {/* 2. メインコンテンツ（スクロールエリア） */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto w-full max-w-md space-y-8 pb-12">
          
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">メニュー選択</h2>
            <p className="text-sm text-zinc-500">ご注文される商品をお選びください。</p>
          </div>

          {categories.map((category) => (
            // ここで各ジャンルに id を付与しています（例: id="主菜"）。
            // さらに、ヘッダーで隠れないようにスクロール位置を調整する「scroll-mt-4」を設定。
            <div key={category} id={category} className="space-y-3 scroll-mt-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-zinc-900"></span>
                <h3 className="text-base font-bold text-zinc-800">{category}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <Card key={item.id} className="flex flex-col overflow-hidden bg-white shadow-sm border border-zinc-200 rounded-xl">
                      <img src={item.img} alt={item.name} className="h-28 w-full object-cover" />
                      
                      <div className="p-3 flex flex-col justify-between flex-1 space-y-2">
                        <div>
                          <span className="font-semibold text-sm line-clamp-2 text-zinc-800">{item.name}</span>
                          <span className="text-zinc-900 font-bold text-sm block mt-0.5">¥{item.price}</span>
                        </div>
                        
                        <Button size="sm" className="w-full h-8 text-xs font-medium rounded-lg">
                          追加する
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* 3. スマホ下部に固定されるボタン */}
      <div className="border-t bg-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] shrink-0">
        <Button variant="outline" className="w-full h-11 text-base font-medium bg-white border-zinc-200">
          現在の注文リストを見る
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