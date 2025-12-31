// types/index.ts
export interface Farm {
  id: string
  user_id: string
  name: string
  address: string | null
  latitude: number | null
  longitude: number | null
  total_acres: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Field {
  id: string
  user_id: string
  farm_id: string | null
  name: string
  size_acres: number
  size_hectares: number
  geometry: GeoJSON.Polygon
  center_lat: number | null
  center_lng: number | null
  soil_type: string | null
  soil_ph: number | null
  organic_matter_percent: number | null
  irrigation_type: string | null
  drainage_quality: string | null
  last_soil_test_date: string | null
  notes: string | null
  color: string
  is_active: boolean
  created_at: string
  updated_at: string
  current_crop?: FieldCrop
}

export interface FieldCrop {
  id: string
  user_id: string
  field_id: string
  crop_id: string | null
  crop_name: string
  crop_category: string | null
  year: number
  season: string | null
  planted_date: string | null
  harvest_date: string | null
  yield_amount: number | null
  yield_unit: string | null
  notes: string | null
  created_at: string
}

export interface RotationPlan {
  id: string
  user_id: string
  field_id: string
  crop_id: string | null
  crop_name: string
  crop_category: string | null
  year: number
  season: string | null
  is_planned: boolean
  rotation_group: string | null
  notes: string | null
  created_at: string
}

export interface FieldAmendment {
  id: string
  user_id: string
  field_id: string
  amendment_type: string
  amount: number | null
  unit: string | null
  application_date: string
  cost: number | null
  notes: string | null
  created_at: string
}

export interface FieldStats {
  totalFields: number
  totalAcres: number
  plantedAcres: number
  fallowAcres: number
  cropDiversity: number
  rotationCompliance: number
}

export const SOIL_TYPES = [
  'Sandy',
  'Loamy',
  'Clay',
  'Silty',
  'Sandy Loam',
  'Clay Loam',
  'Peaty',
  'Chalky'
] as const

export const IRRIGATION_TYPES = [
  'Drip',
  'Sprinkler',
  'Flood',
  'Furrow',
  'Center Pivot',
  'Rain-fed',
  'None'
] as const

export const DRAINAGE_QUALITIES = [
  'Excellent',
  'Good',
  'Fair',
  'Poor',
  'Very Poor'
] as const

export const ROTATION_GROUPS = [
  'legume',
  'heavy_feeder',
  'light_feeder',
  'brassica',
  'solanaceae',
  'cucurbit',
  'allium',
  'root_vegetable'
] as const

export const SEASONS = [
  'spring',
  'summer',
  'fall',
  'winter'
] as const

export type SoilType = typeof SOIL_TYPES[number]
export type IrrigationType = typeof IRRIGATION_TYPES[number]
export type DrainageQuality = typeof DRAINAGE_QUALITIES[number]
export type RotationGroup = typeof ROTATION_GROUPS[number]
export type Season = typeof SEASONS[number]
