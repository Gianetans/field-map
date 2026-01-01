import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function FieldsPage() {
  // Mock data - would come from Supabase
  const fields = [
    {
      id: '1',
      name: 'North Field',
      size_acres: 25.5,
      size_hectares: 10.3,
      current_crop: 'Corn',
      soil_type: 'Loamy',
      is_active: true,
      color: '#3b82f6'
    },
    {
      id: '2',
      name: 'South Field',
      size_acres: 18.2,
      size_hectares: 7.4,
      current_crop: 'Soybeans',
      soil_type: 'Clay Loam',
      is_active: true,
      color: '#10b981'
    },
    {
      id: '3',
      name: 'East Field',
      size_acres: 32.8,
      size_hectares: 13.3,
      current_crop: null,
      soil_type: 'Sandy Loam',
      is_active: true,
      color: '#6b7280'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fields</h1>
            <p className="text-gray-600">Manage all your farm fields</p>
          </div>
          <Link href="/map">
            <Button>Add New Field</Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input 
                placeholder="Search fields..." 
                className="max-w-sm"
              />
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Sort</Button>
            </div>
          </CardContent>
        </Card>

        {/* Fields Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <Card key={field.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: field.color }}
                    />
                    <CardTitle>{field.name}</CardTitle>
                  </div>
                  <Badge variant={field.is_active ? "success" : "secondary"}>
                    {field.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Size</span>
                    <span className="text-sm font-medium">
                      {field.size_acres} acres
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hectares</span>
                    <span className="text-sm font-medium">
                      {field.size_hectares} ha
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Soil Type</span>
                    <span className="text-sm font-medium">{field.soil_type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Crop</span>
                    {field.current_crop ? (
                      <Badge>{field.current_crop}</Badge>
                    ) : (
                      <span className="text-sm text-gray-400">Fallow</span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex gap-2">
                  <Link href={`/fields/${field.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no fields) */}
        {fields.length === 0 && (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold mb-2">No fields yet</h3>
                <p className="text-gray-600 mb-6">
                  Start by drawing your first field on the map
                </p>
                <Link href="/map">
                  <Button>Create First Field</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
