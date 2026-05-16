import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
        
        {/* メインのカード（メニュー選択） */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>メニュー選択</CardTitle>
            <CardDescription>ご注文されるアイスコーヒーをお選びください。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* メニュー選択用の一覧（タップしやすい高さ48pxのボタン型UI） */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-500">メニュー</label>
              
              <button className="flex w-full items-center justify-between rounded-lg border-2 border-zinc-900 bg-white p-4 text-left shadow-sm transition-all h-14">
                <span className="font-semibold text-base">☕ アイスコーヒー（レギュラー）</span>
                <span className="text-zinc-600 font-medium">¥450</span>
              </button>

              <button className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 text-left shadow-sm hover:border-zinc-300 transition-all h-14">
                <span className="font-medium text-base text-zinc-700">☕ アイスコーヒー（ラージ）</span>
                <span className="text-zinc-500">¥550</span>
              </button>
            </div>

            {/* CTA 1: 追加するボタン（高さ44px） */}
            <Button className="w-full h-11 text-base font-semibold">
              注文リストに追加する
            </Button>
          </CardContent>
        </Card>

        {/* CTA 2: 注文リストを見る（高さ44px） */}
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