import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-zinc-50 text-zinc-900 overflow-hidden">
      
      {/* 1. 固定ヘッダー */}
      <header className="border-b bg-white px-6 py-4 shadow-sm shrink-0">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">モバイル・オーダー</h1>
          <nav className="flex gap-4 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900">ホーム</a>
          </nav>
        </div>
      </header>

      {/* 2. メインコンテンツ（スクロールエリア） */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto w-full max-w-md space-y-6">
          
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle>メニュー選択</CardTitle>
              <CardDescription>ご注文される商品をお選びください。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500">メニュー一覧</label>
                
                {/* 横2列のグリッド配置（スマホでタップしやすい隙間を確保） */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* メニュー1 */}
                  <button className="flex flex-col overflow-hidden rounded-xl border-2 border-zinc-900 bg-white text-left shadow-sm transition-all active:scale-95">
                    <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=60" alt="アイスコーヒー" className="h-28 w-full object-cover" />
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <span className="font-semibold text-sm line-clamp-2">アイスコーヒー</span>
                      <span className="text-zinc-600 font-medium text-sm mt-1">¥450</span>
                    </div>
                  </button>

                  {/* メニュー2 */}
                  <button className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition-all active:scale-95">
                    <img src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&auto=format&fit=crop&q=60" alt="アイスコーヒー" className="h-28 w-full object-cover" />
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <span className="font-medium text-sm text-zinc-700 line-clamp-2">アイスコーヒー</span>
                      <span className="text-zinc-500 text-sm mt-1">¥550</span>
                    </div>
                  </button>

                  {/* メニュー3 */}
                  <button className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition-all active:scale-95">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=60" alt="アイスコーヒー" className="h-28 w-full object-cover" />
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <span className="font-medium text-sm text-zinc-700 line-clamp-2">アイスコーヒー</span>
                      <span className="text-zinc-500 text-sm mt-1">¥550</span>
                    </div>
                  </button>

                  {/* メニュー4 */}
                  <button className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition-all active:scale-95">
                    <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=60" alt="アイスコーヒー" className="h-28 w-full object-cover" />
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <span className="font-medium text-sm text-zinc-700 line-clamp-2">アイスコーヒー</span>
                      <span className="text-zinc-500 text-sm mt-1">¥550</span>
                    </div>
                  </button>

                  {/* メニュー5 */}
                  <button className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition-all active:scale-95">
                    <img src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=300&auto=format&fit=crop&q=60" alt="アイスコーヒー" className="h-28 w-full object-cover" />
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <span className="font-medium text-sm text-zinc-700 line-clamp-2">アイスコーヒー</span>
                      <span className="text-zinc-500 text-sm mt-1">¥550</span>
                    </div>
                  </button>

                  {/* メニュー6 */}
                  <button className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition-all active:scale-95">
                    <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&auto=format&fit=crop&q=60" alt="アイスコーヒー" className="h-28 w-full object-cover" />
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <span className="font-medium text-sm text-zinc-700 line-clamp-2">アイスコーヒー</span>
                      <span className="text-zinc-500 text-sm mt-1">¥550</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* CTA 1: 追加ボタン（高さ44px） */}
              <Button className="w-full h-11 text-base font-semibold sticky bottom-0 shadow-md">
                注文リストに追加する
              </Button>
            </CardContent>
          </Card>

          {/* CTA 2: リリストを見る（高さ44px） */}
          <div className="text-center pb-6">
            <Button variant="outline" className="w-full h-11 text-base font-medium bg-white">
              現在の注文リストを見る
            </Button>
          </div>

        </div>
      </main>

      {/* 3. 固定フッター */}
      <footer className="border-t bg-white px-6 py-4 text-center text-sm text-zinc-500 shrink-0">
        <div className="mx-auto max-w-5xl">
          © 2026 モバイル・オーダー. All rights reserved.
        </div>
      </footer>

    </div>
  )
}