// src/app/api/menu/route.ts
import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // .env の DATABASE_URL を使ってNeonデータベースに接続
    const sql = neon(process.env.DATABASE_URL!)
    
    // データベースからメニュー一覧を取得（ID順に並べ替え）
    const data = await sql`SELECT * FROM menu_items ORDER BY id ASC`
    
    // 取得したデータをフロントエンド（画面）へJSON形式で送信
    return NextResponse.json(data)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}