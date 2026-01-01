'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-3xl">🗺️</span>
            <h1 className="text-2xl font-bold text-green-600">FieldMap</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                isActive("/dashboard") ? "text-green-600" : "text-gray-600"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/map"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                isActive("/map") ? "text-green-600" : "text-gray-600"
              )}
            >
              Map
            </Link>
            <Link
              href="/fields"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                isActive("/fields") ? "text-green-600" : "text-gray-600"
              )}
            >
              Fields
            </Link>
            <Link
              href="/rotation"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                isActive("/rotation") ? "text-green-600" : "text-gray-600"
              )}
            >
              Rotation Planner
            </Link>
            <Link
              href="/analytics"
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                isActive("/analytics") ? "text-green-600" : "text-gray-600"
              )}
            >
              Analytics
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
