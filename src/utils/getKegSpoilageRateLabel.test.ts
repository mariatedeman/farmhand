import { getKegSpoilageRateLabel } from './getKegSpoilageRateLabel.js'

describe('getKegSpoilageRateLabel', () => {
  test.each([
    [0, 'Very low'],
    [0.049, 'Very low'],
    [0.05, 'Low'],
    [0.149, 'Low'],
    [0.15, 'Medium'],
    [0.349, 'Medium'],
    [0.35, 'High'],
    [0.599, 'High'],
    [0.6, 'Very high'],
    [1, 'Very high'],
  ])('labels a spoilage rate of %f as %s', (spoilageRate, expectedLabel) => {
    expect(getKegSpoilageRateLabel(spoilageRate)).toEqual(expectedLabel)
  })
})
