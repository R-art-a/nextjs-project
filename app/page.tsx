import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-zinc-50 text-zinc-900 overflow-hidden">
      
      {/* 1. 固定ヘッダー（文字がはみ出さないようにスッキリ配置） */}
      <header className="border-b bg-white px-4 py-3 shadow-sm shrink-0">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight">モバイル・オーダー</h1>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
            テイクアウト
          </span>
        </div>
      </header>

      {/* 2. メインコンテンツ（iPhoneの指でスイスイ動くスクロールエリア） */}
      <main className="flex-1 overflow-y-auto px-4 py-4 -webkit-overflow-scrolling-touch">
        <div className="mx-auto w-full max-w-md space-y-4 pb-20"> {/* 下の余白を多めにしてスクロールしやすく */}
          
          <Card className="w-full border-none shadow-sm">
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-xl">メニュー選択</CardTitle>
              <CardDescription className="text-xs">ご注文される商品をお選びください。</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              
              {/* 横2列のグリッド配置（文字詰まりが起きない絶妙な隙間） */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* メニュー1〜6（すべて共通の安心構造） */}
                {[
                  { id: 1, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=60" },
                  { id: 2, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&auto=format&fit=crop&q=60" },
                  { id: 3, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=60" },
                  { id: 4, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=60" },
                  { id: 5, img: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=300&auto=format&fit=crop&q=60" },
                  { id: 6, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&auto=format&fit=crop&q=60" },
                ].map((item, index) => (
                  <button 
                    key={item.id} 
                    className={`flex flex-col overflow-hidden rounded-xl bg-white text-left shadow-sm transition-all active:scale-95 border-2 ${
                      index === 0 ? "border-zinc-900" : "border-zinc-200"
                    }`}
                  >
                    <img src={item.img} alt="アイスコーヒー" className="h-24 w-full object-cover" />
                    <div className="p-2.5 flex flex-col justify-between flex-1">
                      {/* トラブル防止用の設定：文字が長すぎても絶対に枠からはみ出さず、綺麗に3点リーダーになります */}
                      <span className="font-semibold text-xs text-zinc-800 truncate block w-full">
                        アイスコーヒー
                      </span>
                      <span className="text-zinc-600 font-bold text-xs mt-0.5 block">
                        ¥{index === 0 ? "450" : "550"}
                      </span>
                    </div>
                  </button>
                ))}

              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 3. スマホの最下部に完全に固定される最強のCTAエリア（押しやすさMAXの高さ48px） */}
      <div className="border-t bg-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] shrink-0 flex flex-col gap-2">
        <Button className="w-full h-12 text-sm font-bold rounded-xl bg-zinc-900 text-white shadow-sm active:bg-zinc-800">
          注文リストに追加する
        </Button>
        <Button variant="outline" className="w-full h-12 text-sm font-semibold rounded-xl bg-white border-zinc-200 text-zinc-700 active:bg-zinc-50">
          現在の注文リストを見る
        </Button>
      </div>

    </div>
  )
}