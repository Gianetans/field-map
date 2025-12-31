import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data - would come from Supabase
  const stats = {
    totalFields: 8,
    totalAcres: 156.5,
    plantedAcres: 142.3,
    fallowAcres: 14.2,
    cropDiversity: 12,
    rotationCompliance: 85
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your farm fields and operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalFields}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Acreage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalAcres}</div>
              <p className="text-sm text-gray-500 mt-1">acres</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Planted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.plantedAcres}</div>
              <p className="text-sm text-gray-500 mt-1">acres</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rotation Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.rotationCompliance}%</div>
              <p className="text-sm text-gray-500 mt-1">compliance</p>
            </CardContent>
          </Card>
        </div>

        {/* Map Overview Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Field Map Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-gray-600 mb-4">Interactive map with all your fields</p>
                  <Link href="/map">
                    <Button>Open Full Map</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Crop Diversity</span>
                  <Badge variant="success">{stats.cropDiversity} crops</Badge>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Fallow Land</span>
                  <span className="text-sm font-medium">{stats.fallowAcres} acres</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Active Fields</span>
                  <span className="text-sm font-medium">{stats.totalFields}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Link href="/map">
                    <Button variant="outline" size="sm" className="w-full">
                      Draw New Field
                    </Button>
                  </Link>
                  <Link href="/rotation">
                    <Button variant="outline" size="sm" className="w-full">
                      Plan Rotation
                    </Button>
                  </Link>
                  <Link href="/fields">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Fields
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Alerts & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <span className="text-orange-600">⚠️</span>
                <div>
                  <p className="font-medium text-orange-900">Rotation Alert</p>
                  <p className="text-sm text-orange-700">North Field has tomatoes for 2 consecutive years</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-600">ℹ️</span>
                <div>
                  <p className="font-medium text-blue-900">Soil Test Due</p>
                  <p className="text-sm text-blue-700">South Field soil test is over 3 years old</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600">✓</span>
                <div>
                  <p className="font-medium text-green-900">Good Rotation</p>
                  <p className="text-sm text-green-700">East Field rotation plan is optimal</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl">🌱</div>
                <div>
                  <p className="font-medium">Planted Corn in North Field</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl">🗺️</div>
                <div>
                  <p className="font-medium">Created West Field (12.5 acres)</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <p className="font-medium">Updated soil test for South Field</p>
                  <p className="text-sm text-gray-500">2 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
