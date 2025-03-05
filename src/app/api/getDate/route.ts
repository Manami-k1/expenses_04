import { NextResponse } from "next/server";

export async function GET() {
  const currentDate = new Date().toISOString(); // 現在の日付をISOフォーマットで取得
  return NextResponse.json({ currentDate });
}
