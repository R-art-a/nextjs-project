// src/app/menuData.ts

// データの構造（型）を定義しておきます（次のタスクでも使いやすいようにdescription等を追加）
export interface MenuItem {
  id: number
  name: string
  price: number
  category: "定食" | "麺類" | "丼"
  img: string
  isSoldOut: boolean
  description?: string // 商品の説明（将来用）
}

export const menuItems: MenuItem[] = [
  // 1. 定食ジャンル
  { 
    id: 1, 
    name: "生姜焼き定食", 
    price: 1200, 
    category: "定食", 
    img: "/shougayaki.png", 
    isSoldOut: false,
    description: "特製生姜ダレでジューシーに炒めた定番人気の定食です。"
  },
  { 
    id: 2, 
    name: "唐揚げ定食", 
    price: 1000, 
    category: "定食", 
    img: "/karaageteishoku.png", 
    isSoldOut: false,
    description: "外はサクサク、中はジューシーな大ぶり唐揚げ。"
  },
  { 
    id: 3, 
    name: "野菜炒め定食", 
    price: 880, 
    category: "定食", 
    img: "/yasaiitame.png", 
    isSoldOut: true,
    description: "シャキシャキの新鮮野菜を強火で一気に炒めました。"
  },
  
  // 2. 麺類ジャンル
  { id: 4, name: "ラーメン", price: 450, category: "麺類", img: "/ramen.png", isSoldOut: false, description: "昔ながらのあっさり醤油ラーメンです。" },
  { id: 5, name: "うどん", price: 550, category: "麺類", img: "/udon.png", isSoldOut: false, description: "コシのある麺と出汁の利いた関西風つゆ。" },
  { id: 6, name: "そば", price: 480, category: "麺類", img: "/soba.png", isSoldOut: false, description: "風味豊かなこだわり蕎麦です。" },
  
  // 3. 丼ジャンル
  { id: 7, name: "からあげ丼", price: 500, category: "丼", img: "/karaage.png", isSoldOut: false, description: "ご飯の上に自慢の唐揚げを贅沢にのせました。" },
  { id: 8, name: "たれかつ丼", price: 600, category: "丼", img: "/tarekatu.png", isSoldOut: false, description: "甘辛いタレにくぐらせたサクサクのカツ丼。" },
  { id: 9, name: "カレー", price: 750, category: "丼", img: "/kare.png", isSoldOut: false, description: "じっくり煮込んだOSAKI亭特製の濃厚カレー。" },
]

export const categories = ["定食", "麺類", "丼"] as const