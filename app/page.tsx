import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      
      {/* 1. ヘッダー (header) */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">マイ・プロジェクト</h1>
          <nav className="flex gap-4 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900">ホーム</a>
            <a href="#" className="hover:text-zinc-900">機能</a>
            <a href="#" className="hover:text-zinc-900">お問い合わせ</a>
          </nav>
        </div>
      </header>

      {/* 2. メインコンテンツ (main) */}
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>サンプル表示のテスト</CardTitle>
            <CardDescription>shadcn/uiのコンポーネントが正常に動いています！</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">お名前</label>
              <Input placeholder="ここに文字を入力できます" />
            </div>
            <Button className="w-full">送信する</Button>
          </CardContent>
        </Card>
      </main>

      {/* 3. フッター (footer) */}
      <footer className="border-t bg-white px-6 py-4 text-center text-sm text-zinc-500">
        <div className="mx-auto max-w-5xl">
          © 2026 マイ・プロジェクト. All rights reserved.
        </div>
      </footer>

    </div>
  )
}