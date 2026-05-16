import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      
      {/* 1. ヘッダー */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">モバイル・オーダー</h1>
          <nav className="flex gap-4 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900">ホーム</a>
          </nav>
        </div>
      </header>

      {/* 2. メインコンテンツ */}
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-12 space-y-6">
        
        {/* メインのカード（注文フォーム） */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>メニューの追加</CardTitle>
            <CardDescription>注文したい商品をリストに追加してください。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">商品名</label>
              <Input placeholder="例：アイスコーヒー" className="h-11" /> {/* 入力欄もタップしやすい高さ */}
            </div>
            
            {/* CTA 1: 追加するボタン（高さ44px相当のしっかりサイズ） */}
            <Button className="w-full h-11 text-base font-semibold">
              リストに追加する
            </Button>
          </CardContent>
        </Card>

        {/* CTA 2: 注文リストを見る（セカンダリボタン、こちらも高さ44px） */}
        <div className="text-center">
          <Button variant="outline" className="w-full h-11 text-base font-medium bg-white">
            現在の注文リストを見る
          </Button>
        </div>

      </main>

      {/* 3. フッター */}
      <footer className="border-t bg-white px-6 py-4 text-center text-sm text-zinc-500">
        <div className="mx-auto max-w-5xl">
          © 2026 モバイル・オーダー. All rights reserved.
        </div>
      </footer>

    </div>
  )
}