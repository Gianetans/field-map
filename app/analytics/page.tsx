import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AnalyticsPage() {
  // Mock data
  const stats = {
    totalFields: 8,
    totalAcres: 156.5,
    plantedAcres: 142.3,
    fallowAcres: 14.2,
    avgRotationScore: 85
  }

  const cropDistribution = [
    { crop: 'Corn', acres: 45.5, percentage: 32 },
    { crop: 'Soybeans', acres: 38.2, percentage: 27 },
    { crop: 'Wheat', acres: 28.6, percentage: 20 },
    { crop: 'Tomatoes', acres: 18.0, percentage: 13 },
    { crop: 'Other', acres: 12.0, percentage: 8 }
  ]

  const fieldCompliance = [
    { field: 'North Field', score: 100, status: 'excellent' },
    { field: 'South Field', score: 90, status: 'good' },
    { field: 'East Field', score: 75, status: 'fair' },
    { field: 'West Field', score: 60, status: 'needs improvement' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Insights and trends across your farm</p>
        </div>

        {/* Overview Stats */}
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
              <p className="text-sm text-gray-500 mt-1">{((stats.plantedAcres / stats.totalAcres) * 100).toFixed(1)}% utilization</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Rotation Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.avgRotationScore}%</div>
              <p className="text-sm text-gray-500 mt-1">compliance</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Crop Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Crop Distribution (Current Season)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropDistribution.map((item) => (
                  <div key={item.crop}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.crop}</span>
                      <span className="text-sm text-gray-600">
                        {item.acres} acres ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Crop Diversity Index</span>
                  <span className="font-semibold">12 different crops</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rotation Compliance by Field */}
          <Card>
            <CardHeader>
              <CardTitle>Rotation Compliance by Field</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldCompliance.map((item) => (
                  <div key={item.field}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.field}</span>
                      <Badge
                        variant={
                          item.score >= 90 ? 'success' :
                          item.score >= 75 ? 'default' :
                          'warning'
                        }
                      >
                        {item.score}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.score >= 90 ? 'bg-green-600' :
                          item.score >= 75 ? 'bg-blue-600' :
                          'bg-orange-600'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Fields with scores below 75% should review rotation patterns
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Soil Health Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Soil Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Average pH</h4>
                <div className="text-3xl font-bold text-gray-900 mb-1">6.8</div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">↑ 0.2</span>
                  <span className="text-sm text-gray-500">from last year</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Organic Matter</h4>
                <div className="text-3xl font-bold text-gray-900 mb-1">3.8%</div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">↑ 0.5%</span>
                  <span className="text-sm text-gray-500">from last year</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Fields Tested</h4>
                <div className="text-3xl font-bold text-gray-900 mb-1">6/8</div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600">2 overdue</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">💡 Insight:</span> Your farm&apos;s organic matter has improved by 15% over the past two years, 
                likely due to consistent legume rotations and cover cropping.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Field Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Field</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Rotation Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Soil Health</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">North Field</td>
                    <td className="py-3 px-4">25.5 acres</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">100%</Badge>
                    </td>
                    <td className="py-3 px-4">Excellent</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">Active</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">South Field</td>
                    <td className="py-3 px-4">18.2 acres</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">90%</Badge>
                    </td>
                    <td className="py-3 px-4">Good</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">Active</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">East Field</td>
                    <td className="py-3 px-4">32.8 acres</td>
                    <td className="py-3 px-4">
                      <Badge variant="warning">75%</Badge>
                    </td>
                    <td className="py-3 px-4">Fair</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">Active</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
