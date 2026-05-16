import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>サンプル表示のテスト</CardTitle>
          <CardDescription>shadcn/uiのコンポーネントが正常に動いています！</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">お名前</label>
            <Input placeholder="ここに文字を入力できます" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>送信する</Button>
        </CardFooter>
      </Card>
    </div>
  )
}