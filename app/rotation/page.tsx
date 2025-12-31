import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function RotationPage() {
  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3]

  // Mock field data
  const fields = [
    { id: '1', name: 'North Field', size: '25.5 acres' },
    { id: '2', name: 'South Field', size: '18.2 acres' },
    { id: '3', name: 'East Field', size: '32.8 acres' },
    { id: '4', name: 'West Field', size: '12.5 acres' }
  ]

  // Mock rotation data
  const rotations: Record<string, Record<number, { crop: string; group: string; valid: boolean }>> = {
    '1': {
      [currentYear]: { crop: 'Corn', group: 'heavy_feeder', valid: true },
      [currentYear + 1]: { crop: 'Soybeans', group: 'legume', valid: true },
      [currentYear + 2]: { crop: 'Wheat', group: 'light_feeder', valid: true },
    },
    '2': {
      [currentYear]: { crop: 'Tomatoes', group: 'solanaceae', valid: true },
      [currentYear + 1]: { crop: 'Peas', group: 'legume', valid: true },
    }
  }

  const rotationGroupColors: Record<string, string> = {
    legume: 'bg-blue-100 text-blue-800',
    heavy_feeder: 'bg-orange-100 text-orange-800',
    light_feeder: 'bg-green-100 text-green-800',
    brassica: 'bg-purple-100 text-purple-800',
    solanaceae: 'bg-red-100 text-red-800',
    cucurbit: 'bg-yellow-100 text-yellow-800',
    allium: 'bg-pink-100 text-pink-800',
    root_vegetable: 'bg-amber-100 text-amber-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">4-Year Rotation Planner</h1>
            <p className="text-gray-600">Plan optimal crop rotations to improve soil health and yields</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">View Suggestions</Button>
            <Button>Save Rotation Plan</Button>
          </div>
        </div>

        {/* Rotation Rules Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rotation Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>Never same crop twice in a row</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>No solanaceae after solanaceae</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>No brassicas after brassicas</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Heavy feeders → Legumes</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Legumes → Heavy feeders</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600">⚠</span>
                <span>Avoid heavy feeders consecutively</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Rotate crop families</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Break pest/disease cycles</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rotation Groups Legend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rotation Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge className={rotationGroupColors.legume}>Legumes (N-Fixers)</Badge>
              <Badge className={rotationGroupColors.heavy_feeder}>Heavy Feeders</Badge>
              <Badge className={rotationGroupColors.light_feeder}>Light Feeders</Badge>
              <Badge className={rotationGroupColors.brassica}>Brassicas</Badge>
              <Badge className={rotationGroupColors.solanaceae}>Nightshades</Badge>
              <Badge className={rotationGroupColors.cucurbit}>Cucurbits</Badge>
              <Badge className={rotationGroupColors.allium}>Alliums</Badge>
              <Badge className={rotationGroupColors.root_vegetable}>Root Vegetables</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Rotation Timeline Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Rotation Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div className="font-semibold text-gray-900">Field</div>
                  {years.map((year) => (
                    <div key={year} className="font-semibold text-gray-900 text-center">
                      {year}
                    </div>
                  ))}
                </div>

                {/* Field Rows */}
                {fields.map((field) => (
                  <div key={field.id} className="grid grid-cols-5 gap-4 mb-4 items-start">
                    <div className="py-3">
                      <div className="font-medium">{field.name}</div>
                      <div className="text-sm text-gray-500">{field.size}</div>
                    </div>
                    
                    {years.map((year) => {
                      const rotation = rotations[field.id]?.[year]
                      return (
                        <div
                          key={year}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px] hover:border-green-500 transition-colors cursor-pointer"
                        >
                          {rotation ? (
                            <div className="space-y-2">
                              <Badge className={rotationGroupColors[rotation.group as keyof typeof rotationGroupColors]}>
                                {rotation.crop}
                              </Badge>
                              {!rotation.valid && (
                                <div className="text-xs text-red-600 flex items-start gap-1">
                                  <span>⚠️</span>
                                  <span>Rotation warning</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 text-sm">
                              Drop crop here
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">💡 Tip:</span> Drag and drop crops onto the timeline. 
                The system will automatically validate rotations and show warnings for poor sequences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Panel */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Smart Crop Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">North Field - {currentYear + 3}</div>
                <p className="text-sm text-green-800 mb-2">
                  After wheat (light feeder), consider: <strong>Legumes</strong> or <strong>Heavy Feeders</strong>
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-blue-600 text-white">Peas</Badge>
                  <Badge className="bg-blue-600 text-white">Beans</Badge>
                  <Badge className="bg-orange-600 text-white">Corn</Badge>
                  <Badge className="bg-orange-600 text-white">Tomatoes</Badge>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">South Field - {currentYear + 2}</div>
                <p className="text-sm text-green-800 mb-2">
                  After peas (legume), ideal for: <strong>Heavy Feeders</strong> or <strong>Brassicas</strong>
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-orange-600 text-white">Corn</Badge>
                  <Badge className="bg-orange-600 text-white">Squash</Badge>
                  <Badge className="bg-purple-600 text-white">Cabbage</Badge>
                  <Badge className="bg-purple-600 text-white">Broccoli</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
