import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  return NextResponse.json({ error: 'Payment method not available' }, { status: 400 })
}
