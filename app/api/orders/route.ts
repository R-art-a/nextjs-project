// src/app/api/orders/route.ts
import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, totalPrice, peopleCount } = body

    // 🔍 1. 最低限の品質ポイント：入力バリデーション
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "注文商品がありません。" }, { status: 400 })
    }
    if (!totalPrice || totalPrice <= 0) {
      return NextResponse.json({ error: "合計金額が不正です。" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    // 🗄️ 2. DB保存処理
    // 本来は注文ヘッダーと明細の2つのテーブルに分けるのが理想ですが、
    // まずはシンプルに1つの注文履歴（orders）テーブルに「JSONデータ」として丸ごと保存する形にします。
    // ※ もし事前にordersテーブルがない場合は、Neonのダッシュボード等で作成するか、以下で自動生成させます。
    
    // テーブルがなければ作成（検証・デモ用）
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        items JSONB NOT NULL,
        total_price INT NOT NULL,
        people_count INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    // データを挿入
    const result = await sql`
      INSERT INTO orders (items, total_price, people_count)
      VALUES (${JSON.stringify(items)}, ${totalPrice}, ${peopleCount})
      RETURNING id;
    `

    return NextResponse.json({ success: true, orderId: result[0].id }, { status: 201 })
  } catch (error) {
    console.error("注文保存エラー:", error)
    return NextResponse.json({ error: "サーバー側で注文の保存に失敗しました。" }, { status: 500 })
  }
}