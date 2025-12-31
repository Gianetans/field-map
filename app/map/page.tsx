import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Field Map</h1>
            <p className="text-gray-600">Draw, edit, and manage your field boundaries</p>
          </div>
          <div className="flex gap-2">
            <Button>Draw Field</Button>
            <Button variant="outline">Toggle View</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="relative" style={{ height: 'calc(100vh - 300px)' }}>
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-gray-600 mb-2">Interactive Leaflet map will render here</p>
                  <p className="text-sm text-gray-500">
                    Click &quot;Draw Field&quot; to create new field boundaries
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Note: Map components require client-side rendering
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Map Controls</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <p>• Click and drag to draw fields</p>
              <p>• Double-click to finish drawing</p>
              <p>• Click field to view details</p>
              <p>• Edit mode to modify boundaries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Field Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <p>• Area calculated automatically</p>
              <p>• Displayed in acres & hectares</p>
              <p>• Center point coordinates</p>
              <p>• Current crop assignment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Features</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <p>• Satellite/Street view toggle</p>
              <p>• Color-coded by crop type</p>
              <p>• Field labels and markers</p>
              <p>• Pan and zoom controls</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
