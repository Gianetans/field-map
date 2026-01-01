import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🗺️</span>
            <h1 className="text-2xl font-bold text-green-600">FieldMap</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Visualize your farm, plan smarter rotations
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Interactive field mapping with intelligent 4-year crop rotation planning.
            Improve soil health, maximize yields, and make data-driven farming decisions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg">Start Mapping Free</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">View Demo</Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold mb-2">Interactive Field Mapping</h3>
            <p className="text-gray-600">
              Draw field boundaries directly on the map. Automatic area calculations in acres and hectares using advanced geospatial tools.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">Smart Crop Rotation</h3>
            <p className="text-gray-600">
              4-year rotation planner with intelligent suggestions. Avoid disease buildup and nutrient depletion with validated rotation rules.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">Soil Health Tracking</h3>
            <p className="text-gray-600">
              Track soil tests, pH levels, organic matter, and amendments. Monitor improvements over time with detailed analytics.
            </p>
          </div>
        </div>

        {/* Key Features List */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Everything You Need</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Draw and edit field boundaries with Leaflet</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Automatic area calculation with Turf.js</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Assign crops to fields by season</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>View complete planting history</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>4-year rotation timeline planner</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Rotation validation warnings</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Smart crop suggestions</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Rotation compliance scoring</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Soil test tracking and amendments</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Field analytics and insights</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Multi-farm support</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mobile responsive design</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 FieldMap. All rights reserved.</p>
            <p className="mt-2">Built with Next.js, Leaflet, and Turf.js</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
