// @ts-ignore - Turf.js types issue with exports
import * as turf from '@turf/turf'

/**
 * Calculate area of a polygon in acres using Turf.js
 */
export function calculateAcres(geometry: GeoJSON.Polygon): number {
  const area = turf.area(geometry) // returns square meters
  const acres = area * 0.000247105 // convert to acres
  return Math.round(acres * 100) / 100 // round to 2 decimals
}

/**
 * Calculate center point of a polygon
 */
export function calculateCenter(geometry: GeoJSON.Polygon): [number, number] {
  const center = turf.center(geometry)
  return center.geometry.coordinates as [number, number]
}

/**
 * Validate polygon geometry
 */
export function isValidPolygon(coordinates: number[][]): boolean {
  if (coordinates.length < 4) return false // need at least 3 points + closing point
  
  const first = coordinates[0]
  const last = coordinates[coordinates.length - 1]
  
  // Check if polygon is closed
  if (first[0] !== last[0] || first[1] !== last[1]) return false
  
  // Check for self-intersection
  try {
    const polygon = turf.polygon([coordinates])
    const kinks = turf.kinks(polygon)
    return kinks.features.length === 0
  } catch {
    return false
  }
}

/**
 * Convert Leaflet LatLng array to GeoJSON Polygon
 */
export function latLngsToGeoJSON(latLngs: Array<{lat: number, lng: number}>): GeoJSON.Polygon {
  const coordinates = [
    ...latLngs.map(ll => [ll.lng, ll.lat]),
    [latLngs[0].lng, latLngs[0].lat] // close the polygon
  ]
  
  return {
    type: 'Polygon',
    coordinates: [coordinates]
  }
}

/**
 * Convert GeoJSON Polygon to Leaflet LatLng array
 */
export function geoJSONToLatLngs(geometry: GeoJSON.Polygon): Array<{lat: number, lng: number}> {
  const coordinates = geometry.coordinates[0]
  return coordinates.slice(0, -1).map(coord => ({
    lat: coord[1],
    lng: coord[0]
  }))
}

/**
 * Get color for crop category
 */
export function getCropColor(category: string | null): string {
  const colorMap: Record<string, string> = {
    'Vegetable': '#10b981',
    'Fruit': '#ef4444',
    'Herb': '#8b5cf6',
    'Grain': '#f59e0b',
    'Legume': '#06b6d4'
  }
  return category ? (colorMap[category] || '#3b82f6') : '#3b82f6'
}
