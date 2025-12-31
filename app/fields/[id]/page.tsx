import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FieldDetailPage({ params }: { params: { id: string } }) {
  // Mock data - would come from Supabase
  const field = {
    id: params.id,
    name: 'North Field',
    size_acres: 25.5,
    size_hectares: 10.3,
    soil_type: 'Loamy',
    soil_ph: 6.8,
    organic_matter_percent: 3.5,
    irrigation_type: 'Drip',
    drainage_quality: 'Good',
    last_soil_test_date: '2023-03-15',
    notes: 'Prime location for heavy feeders',
    color: '#3b82f6',
    is_active: true
  }

  const plantingHistory = [
    { year: 2024, crop: 'Corn', yield: '180 bu/acre' },
    { year: 2023, crop: 'Soybeans', yield: '55 bu/acre' },
    { year: 2022, crop: 'Wheat', yield: '65 bu/acre' },
    { year: 2021, crop: 'Corn', yield: '175 bu/acre' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/fields" className="text-green-600 hover:underline mb-4 inline-block">
            ← Back to Fields
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-8 h-8 rounded-full" 
                style={{ backgroundColor: field.color }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{field.name}</h1>
                <p className="text-gray-600">{field.size_acres} acres ({field.size_hectares} ha)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Edit Field</Button>
              <Button>Assign Crop</Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Field Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Field Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Basic Info</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Size (acres)</span>
                      <span className="font-medium">{field.size_acres}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Size (hectares)</span>
                      <span className="font-medium">{field.size_hectares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant={field.is_active ? "success" : "secondary"}>
                        {field.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Soil Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Soil Type</span>
                      <span className="font-medium">{field.soil_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">pH Level</span>
                      <span className="font-medium">{field.soil_ph}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Organic Matter</span>
                      <span className="font-medium">{field.organic_matter_percent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Soil Test</span>
                      <span className="font-medium">{field.last_soil_test_date}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Infrastructure</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Irrigation</span>
                      <span className="font-medium">{field.irrigation_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Drainage</span>
                      <span className="font-medium">{field.drainage_quality}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Notes</h4>
                  <p className="text-sm text-gray-600">{field.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Map Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-sm text-gray-600">Field boundary map</p>
                </div>
              </div>
              <Link href="/map">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View on Full Map
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Planting History */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Planting History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Year</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Crop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Yield</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plantingHistory.map((entry) => (
                    <tr key={entry.year} className="border-b">
                      <td className="py-3 px-4">{entry.year}</td>
                      <td className="py-3 px-4">
                        <Badge>{entry.crop}</Badge>
                      </td>
                      <td className="py-3 px-4">{entry.yield}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Amendments History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Amendment History</CardTitle>
              <Button variant="outline" size="sm">Add Amendment</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Track soil amendments, fertilizer applications, and other treatments</p>
            <div className="mt-4 text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">No amendments recorded yet</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
