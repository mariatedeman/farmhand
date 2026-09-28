import { KEG_SPOILAGE_RATE_LABEL_THRESHOLDS } from '../constants.js'

export type KegSpoilageRateLabel =
  | 'Very low'
  | 'Low'
  | 'Medium'
  | 'High'
  | 'Very high'

/**
 * Converts a numeric keg spoilage rate (0-1+) into a categorical label so
 * players don't see the exact underlying probability.
 */
export const getKegSpoilageRateLabel = (
  spoilageRate: number
): KegSpoilageRateLabel => {
  if (spoilageRate < KEG_SPOILAGE_RATE_LABEL_THRESHOLDS['Very low']) {
    return 'Very low'
  }

  if (spoilageRate < KEG_SPOILAGE_RATE_LABEL_THRESHOLDS.Low) {
    return 'Low'
  }

  if (spoilageRate < KEG_SPOILAGE_RATE_LABEL_THRESHOLDS.Medium) {
    return 'Medium'
  }

  if (spoilageRate < KEG_SPOILAGE_RATE_LABEL_THRESHOLDS.High) {
    return 'High'
  }

  return 'Very high'
}
