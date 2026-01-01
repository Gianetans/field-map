import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // TODO: Handle Supabase auth callback
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (code) {
    // Exchange code for session
    // const supabase = createServerClient()
    // await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}
