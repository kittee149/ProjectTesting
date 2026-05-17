/**
 * Recommendation Engine Utility
 * แนะนำผลิตภัณฑ์การลงทุนตาม Risk Profile ของผู้ใช้
 *
 * Product Recommendation Mapping (from design.md):
 * ┌──────────────────────┬──────────────────────────────────────────┬──────────────────────────────────────┐
 * │ Risk Profile         │ Primary                                  │ Secondary                            │
 * ├──────────────────────┼──────────────────────────────────────────┼──────────────────────────────────────┤
 * │ conservative         │ deposit, bond (riskLevel<=3)             │ mutual_fund (riskLevel<=2)           │
 * │ moderately_conserv.  │ bond, mutual_fund (riskLevel<=3)         │ deposit, ssf/rmf (riskLevel<=3)      │
 * │ moderate             │ mutual_fund (riskLevel 3-5), ssf, rmf   │ bond, mutual_fund (riskLevel 5-6)    │
 * │ moderately_aggress.  │ mutual_fund (riskLevel 5-7), ssf, rmf   │ mutual_fund (riskLevel 3-5)          │
 * │ aggressive           │ mutual_fund (riskLevel 6-8), ssf, rmf   │ mutual_fund (riskLevel 4-6)          │
 * │                      │ (riskLevel>=5)                           │                                      │
 * └──────────────────────┴──────────────────────────────────────────┴──────────────────────────────────────┘
 *
 * CRITICAL: Conservative profile MUST return deposits as the FIRST category.
 * Requirements: 3.1, 4.1, 5.4, 6.1
 */

import type { BaseProduct, RiskProfile } from '../types/index';

/**
 * Returns a deduplicated, ordered list of recommended products for the given risk profile.
 * Primary products come first, followed by secondary products not already included.
 *
 * @param profile - The user's risk profile
 * @param catalog - The full product catalog to filter from
 * @returns Ordered array of recommended products (primary first, then secondary)
 */
export function getRecommendedProducts(
  profile: RiskProfile,
  catalog: BaseProduct[]
): BaseProduct[] {
  if (catalog.length === 0) {
    return [];
  }

  const { level } = profile;

  switch (level) {
    case 'conservative':
      return buildRecommendations(catalog, [
        // Primary: deposits first (CRITICAL requirement), then bonds riskLevel<=3
        (p) => p.type === 'deposit',
        (p) => p.type === 'bond' && p.riskLevel <= 3,
        // Secondary: mutual_fund riskLevel<=2
        (p) => p.type === 'mutual_fund' && p.riskLevel <= 2,
      ]);

    case 'moderately_conservative':
      return buildRecommendations(catalog, [
        // Primary: bonds, mutual_fund riskLevel<=3
        (p) => p.type === 'bond',
        (p) => p.type === 'mutual_fund' && p.riskLevel <= 3,
        // Secondary: deposits, ssf/rmf riskLevel<=3
        (p) => p.type === 'deposit',
        (p) => (p.type === 'ssf' || p.type === 'rmf') && p.riskLevel <= 3,
      ]);

    case 'moderate':
      return buildRecommendations(catalog, [
        // Primary: mutual_fund riskLevel 3-5, ssf, rmf
        (p) => p.type === 'mutual_fund' && p.riskLevel >= 3 && p.riskLevel <= 5,
        (p) => p.type === 'ssf',
        (p) => p.type === 'rmf',
        // Secondary: bonds, mutual_fund riskLevel 5-6
        (p) => p.type === 'bond',
        (p) => p.type === 'mutual_fund' && p.riskLevel >= 5 && p.riskLevel <= 6,
      ]);

    case 'moderately_aggressive':
      return buildRecommendations(catalog, [
        // Primary: mutual_fund riskLevel 5-7, ssf, rmf
        (p) => p.type === 'mutual_fund' && p.riskLevel >= 5 && p.riskLevel <= 7,
        (p) => p.type === 'ssf',
        (p) => p.type === 'rmf',
        // Secondary: mutual_fund riskLevel 3-5
        (p) => p.type === 'mutual_fund' && p.riskLevel >= 3 && p.riskLevel <= 5,
      ]);

    case 'aggressive':
      return buildRecommendations(catalog, [
        // Primary: mutual_fund riskLevel 6-8, ssf riskLevel>=5, rmf riskLevel>=5
        (p) => p.type === 'mutual_fund' && p.riskLevel >= 6 && p.riskLevel <= 8,
        (p) => p.type === 'ssf' && p.riskLevel >= 5,
        (p) => p.type === 'rmf' && p.riskLevel >= 5,
        // Secondary: mutual_fund riskLevel 4-6
        (p) => p.type === 'mutual_fund' && p.riskLevel >= 4 && p.riskLevel <= 6,
      ]);

    default:
      return [];
  }
}

/**
 * Builds an ordered, deduplicated product list by applying filter predicates in order.
 * Each predicate represents a "bucket" of products. Products matched by earlier predicates
 * come first. A product is only included once (first match wins).
 *
 * @param catalog - Full product catalog
 * @param predicates - Ordered array of filter functions (primary buckets first)
 * @returns Ordered, deduplicated array of matching products
 */
function buildRecommendations(
  catalog: BaseProduct[],
  predicates: Array<(product: BaseProduct) => boolean>
): BaseProduct[] {
  const seen = new Set<string>();
  const result: BaseProduct[] = [];

  for (const predicate of predicates) {
    for (const product of catalog) {
      if (!seen.has(product.id) && predicate(product)) {
        seen.add(product.id);
        result.push(product);
      }
    }
  }

  return result;
}
