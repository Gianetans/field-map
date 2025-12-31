import { RotationGroup } from '@/types'

/**
 * Determine rotation group from crop name/category
 */
export function getCropRotationGroup(cropName: string, category: string | null): RotationGroup {
  const name = cropName.toLowerCase()
  
  if (['peas', 'beans', 'green beans', 'clover'].some(n => name.includes(n))) {
    return 'legume'
  }
  if (['tomato', 'corn', 'squash', 'pumpkin', 'cabbage'].some(n => name.includes(n))) {
    return 'heavy_feeder'
  }
  if (['cabbage', 'broccoli', 'kale', 'cauliflower', 'brussels'].some(n => name.includes(n))) {
    return 'brassica'
  }
  if (['carrot', 'radish', 'beet', 'turnip', 'parsnip'].some(n => name.includes(n))) {
    return 'root_vegetable'
  }
  if (['cucumber', 'melon', 'zucchini', 'watermelon'].some(n => name.includes(n))) {
    return 'cucurbit'
  }
  if (['onion', 'garlic', 'leek', 'shallot'].some(n => name.includes(n))) {
    return 'allium'
  }
  if (['pepper', 'eggplant', 'potato'].some(n => name.includes(n)) || name.includes('tomato')) {
    return 'solanaceae'
  }
  
  return 'light_feeder'
}

/**
 * Check if crop rotation is valid
 */
export function isValidRotation(
  previousCropName: string | null,
  previousCategory: string | null,
  nextCropName: string,
  nextCategory: string | null
): { valid: boolean; reason?: string; severity?: 'error' | 'warning' } {
  if (!previousCropName) {
    return { valid: true }
  }
  
  const prevGroup = getCropRotationGroup(previousCropName, previousCategory)
  const nextGroup = getCropRotationGroup(nextCropName, nextCategory)
  
  // Same crop twice
  if (previousCropName.toLowerCase() === nextCropName.toLowerCase()) {
    return {
      valid: false,
      reason: 'Never plant the same crop twice in a row - increases disease and pest pressure',
      severity: 'error'
    }
  }
  
  // Solanaceae family
  if (prevGroup === 'solanaceae' && nextGroup === 'solanaceae') {
    return {
      valid: false,
      reason: 'Avoid nightshades (tomato/pepper/eggplant/potato) after each other - wait 2-3 years',
      severity: 'error'
    }
  }
  
  // Brassica family
  if (prevGroup === 'brassica' && nextGroup === 'brassica') {
    return {
      valid: false,
      reason: 'Avoid brassicas after brassicas - clubroot and other diseases accumulate',
      severity: 'error'
    }
  }
  
  // Heavy feeder after heavy feeder
  if (prevGroup === 'heavy_feeder' && nextGroup === 'heavy_feeder') {
    return {
      valid: false,
      reason: 'Heavy feeders deplete soil nutrients - rotate with legumes or light feeders',
      severity: 'warning'
    }
  }
  
  // Cucurbit after cucurbit
  if (prevGroup === 'cucurbit' && nextGroup === 'cucurbit') {
    return {
      valid: false,
      reason: 'Cucurbits are susceptible to similar diseases - rotate to different family',
      severity: 'warning'
    }
  }
  
  return { valid: true }
}

/**
 * Suggest ideal next crops based on rotation principles
 */
export function suggestNextCrops(
  previousCropName: string | null,
  previousCategory: string | null,
  availableCropNames: string[]
): Array<{ crop: string; score: number; reason: string }> {
  if (!previousCropName) {
    return availableCropNames.map(crop => ({ crop, score: 1, reason: 'Any crop suitable for first planting' }))
  }
  
  const prevGroup = getCropRotationGroup(previousCropName, previousCategory)
  
  // Ideal rotation sequences
  const idealNext: Record<RotationGroup, { groups: RotationGroup[]; reason: string }> = {
    'heavy_feeder': {
      groups: ['legume', 'light_feeder'],
      reason: 'Legumes restore nitrogen; light feeders allow soil recovery'
    },
    'legume': {
      groups: ['heavy_feeder', 'brassica'],
      reason: 'Use nitrogen fixed by legumes for heavy feeders'
    },
    'brassica': {
      groups: ['legume', 'root_vegetable'],
      reason: 'Break brassica disease cycle with different families'
    },
    'light_feeder': {
      groups: ['legume', 'heavy_feeder'],
      reason: 'Build soil with legumes or utilize recovered nutrients'
    },
    'solanaceae': {
      groups: ['legume', 'root_vegetable'],
      reason: 'Break solanaceae disease cycle - wait 2-3 years before repeating'
    },
    'cucurbit': {
      groups: ['legume', 'root_vegetable'],
      reason: 'Restore soil and break cucurbit pest cycles'
    },
    'allium': {
      groups: ['heavy_feeder', 'legume'],
      reason: 'Alliums are light feeders - follow with nitrogen users'
    },
    'root_vegetable': {
      groups: ['legume', 'brassica'],
      reason: 'Build soil with legumes or plant brassicas'
    }
  }
  
  const preferredNext = idealNext[prevGroup]
  
  return availableCropNames.map(crop => {
    const group = getCropRotationGroup(crop, null)
    const isPreferred = preferredNext.groups.includes(group)
    
    return {
      crop,
      score: isPreferred ? 2 : 1,
      reason: isPreferred ? preferredNext.reason : 'Acceptable rotation'
    }
  }).sort((a, b) => b.score - a.score)
}

/**
 * Calculate rotation compliance score (0-100)
 */
export function calculateRotationScore(
  fieldHistory: Array<{ crop_name: string; crop_category: string | null; year: number }>
): number {
  if (fieldHistory.length < 2) return 100
  
  let violations = 0
  const total = fieldHistory.length - 1
  
  // Sort by year
  const sorted = [...fieldHistory].sort((a, b) => a.year - b.year)
  
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1]
    const curr = sorted[i]
    
    const { valid } = isValidRotation(
      prev.crop_name,
      prev.crop_category,
      curr.crop_name,
      curr.crop_category
    )
    
    if (!valid) violations++
  }
  
  return Math.round(((total - violations) / total) * 100)
}
