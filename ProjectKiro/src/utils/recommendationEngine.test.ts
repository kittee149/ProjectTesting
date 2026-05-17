/**
 * Unit Tests: Recommendation Engine
 * ทดสอบ getRecommendedProducts ครอบคลุม:
 * - Conservative returns deposits first
 * - Each profile returns appropriate product types
 * - Empty catalog returns empty array
 * Requirements: 3.1, 4.1, 5.4, 6.1
 */

import { describe, it, expect } from 'vitest';
import { getRecommendedProducts } from './recommendationEngine';
import type { BaseProduct, RiskProfile } from '../types/index';

// ─── Test Helpers ─────────────────────────────────────────────────────────────

function makeProfile(level: RiskProfile['level']): RiskProfile {
  return { level, score: 0, label: level, description: '' };
}

/** Build a minimal BaseProduct for testing */
function makeProduct(
  id: string,
  type: BaseProduct['type'],
  riskLevel: number
): BaseProduct {
  return {
    id,
    type,
    name: `Product ${id}`,
    nameEn: `Product ${id} EN`,
    riskLevel,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-01'),
    isFeatured: false,
  };
}

// ─── Shared catalog used across multiple tests ────────────────────────────────

const catalog: BaseProduct[] = [
  // Deposits (riskLevel 1)
  makeProduct('dep-1', 'deposit', 1),
  makeProduct('dep-2', 'deposit', 1),

  // Bonds
  makeProduct('bond-low', 'bond', 2),   // riskLevel<=3
  makeProduct('bond-mid', 'bond', 3),   // riskLevel<=3
  makeProduct('bond-high', 'bond', 4),  // riskLevel>3

  // Mutual funds across risk levels
  makeProduct('mf-1', 'mutual_fund', 1),  // riskLevel<=2
  makeProduct('mf-2', 'mutual_fund', 2),  // riskLevel<=2
  makeProduct('mf-3', 'mutual_fund', 3),  // riskLevel 3-5
  makeProduct('mf-4', 'mutual_fund', 4),  // riskLevel 3-5
  makeProduct('mf-5', 'mutual_fund', 5),  // riskLevel 3-5 and 5-7
  makeProduct('mf-6', 'mutual_fund', 6),  // riskLevel 5-7 and 6-8
  makeProduct('mf-7', 'mutual_fund', 7),  // riskLevel 5-7
  makeProduct('mf-8', 'mutual_fund', 8),  // riskLevel 6-8

  // SSF
  makeProduct('ssf-low', 'ssf', 2),
  makeProduct('ssf-mid', 'ssf', 4),
  makeProduct('ssf-high', 'ssf', 6),

  // RMF
  makeProduct('rmf-low', 'rmf', 2),
  makeProduct('rmf-mid', 'rmf', 4),
  makeProduct('rmf-high', 'rmf', 6),
];

// ─── Empty Catalog ────────────────────────────────────────────────────────────

describe('getRecommendedProducts — empty catalog', () => {
  it('returns empty array for conservative profile with empty catalog', () => {
    expect(getRecommendedProducts(makeProfile('conservative'), [])).toEqual([]);
  });

  it('returns empty array for aggressive profile with empty catalog', () => {
    expect(getRecommendedProducts(makeProfile('aggressive'), [])).toEqual([]);
  });
});

// ─── Conservative Profile ─────────────────────────────────────────────────────

describe('getRecommendedProducts — conservative', () => {
  const profile = makeProfile('conservative');

  it('deposits come FIRST in the returned array', () => {
    const result = getRecommendedProducts(profile, catalog);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].type).toBe('deposit');
  });

  it('all deposits appear before any non-deposit product', () => {
    const result = getRecommendedProducts(profile, catalog);
    const firstNonDepositIndex = result.findIndex((p) => p.type !== 'deposit');
    const lastDepositIndex = result.map((p) => p.type).lastIndexOf('deposit');

    if (firstNonDepositIndex !== -1 && lastDepositIndex !== -1) {
      expect(lastDepositIndex).toBeLessThan(firstNonDepositIndex);
    }
  });

  it('includes bonds with riskLevel <= 3', () => {
    const result = getRecommendedProducts(profile, catalog);
    const bondIds = result.filter((p) => p.type === 'bond').map((p) => p.id);
    expect(bondIds).toContain('bond-low');
    expect(bondIds).toContain('bond-mid');
  });

  it('does NOT include bonds with riskLevel > 3', () => {
    const result = getRecommendedProducts(profile, catalog);
    const bondIds = result.filter((p) => p.type === 'bond').map((p) => p.id);
    expect(bondIds).not.toContain('bond-high');
  });

  it('includes mutual_fund with riskLevel <= 2 as secondary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const mfIds = result.filter((p) => p.type === 'mutual_fund').map((p) => p.id);
    expect(mfIds).toContain('mf-1');
    expect(mfIds).toContain('mf-2');
  });

  it('does NOT include mutual_fund with riskLevel > 2', () => {
    const result = getRecommendedProducts(profile, catalog);
    const mfIds = result.filter((p) => p.type === 'mutual_fund').map((p) => p.id);
    expect(mfIds).not.toContain('mf-3');
    expect(mfIds).not.toContain('mf-5');
  });

  it('does NOT include ssf or rmf', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).not.toContain('ssf');
    expect(types).not.toContain('rmf');
  });

  it('no duplicate products in result', () => {
    const result = getRecommendedProducts(profile, catalog);
    const ids = result.map((p) => p.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

// ─── Moderately Conservative Profile ─────────────────────────────────────────

describe('getRecommendedProducts — moderately_conservative', () => {
  const profile = makeProfile('moderately_conservative');

  it('first product is NOT a deposit (bonds come first)', () => {
    const result = getRecommendedProducts(profile, catalog);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].type).toBe('bond');
  });

  it('includes bonds as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).toContain('bond');
  });

  it('includes mutual_fund with riskLevel <= 3 as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const mfIds = result.filter((p) => p.type === 'mutual_fund').map((p) => p.id);
    expect(mfIds).toContain('mf-1');
    expect(mfIds).toContain('mf-2');
    expect(mfIds).toContain('mf-3');
  });

  it('does NOT include mutual_fund with riskLevel > 3', () => {
    const result = getRecommendedProducts(profile, catalog);
    const mfIds = result.filter((p) => p.type === 'mutual_fund').map((p) => p.id);
    expect(mfIds).not.toContain('mf-4');
    expect(mfIds).not.toContain('mf-5');
  });

  it('includes deposits as secondary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).toContain('deposit');
  });

  it('includes ssf/rmf with riskLevel <= 3 as secondary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const taxFundIds = result
      .filter((p) => p.type === 'ssf' || p.type === 'rmf')
      .map((p) => p.id);
    expect(taxFundIds).toContain('ssf-low');
    expect(taxFundIds).toContain('rmf-low');
  });

  it('does NOT include ssf/rmf with riskLevel > 3', () => {
    const result = getRecommendedProducts(profile, catalog);
    const taxFundIds = result
      .filter((p) => p.type === 'ssf' || p.type === 'rmf')
      .map((p) => p.id);
    expect(taxFundIds).not.toContain('ssf-mid');
    expect(taxFundIds).not.toContain('ssf-high');
  });

  it('no duplicate products in result', () => {
    const result = getRecommendedProducts(profile, catalog);
    const ids = result.map((p) => p.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

// ─── Moderate Profile ─────────────────────────────────────────────────────────

describe('getRecommendedProducts — moderate', () => {
  const profile = makeProfile('moderate');

  it('first product is a mutual_fund (riskLevel 3-5)', () => {
    const result = getRecommendedProducts(profile, catalog);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].type).toBe('mutual_fund');
  });

  it('includes mutual_fund with riskLevel 3-5 as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const mfIds = result.filter((p) => p.type === 'mutual_fund').map((p) => p.id);
    expect(mfIds).toContain('mf-3');
    expect(mfIds).toContain('mf-4');
    expect(mfIds).toContain('mf-5');
  });

  it('includes ssf and rmf as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).toContain('ssf');
    expect(types).toContain('rmf');
  });

  it('includes bonds as secondary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).toContain('bond');
  });

  it('does NOT include deposits', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).not.toContain('deposit');
  });

  it('no duplicate products in result', () => {
    const result = getRecommendedProducts(profile, catalog);
    const ids = result.map((p) => p.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

// ─── Moderately Aggressive Profile ───────────────────────────────────────────

describe('getRecommendedProducts — moderately_aggressive', () => {
  const profile = makeProfile('moderately_aggressive');

  it('first product is a mutual_fund (riskLevel 5-7)', () => {
    const result = getRecommendedProducts(profile, catalog);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].type).toBe('mutual_fund');
    expect(result[0].riskLevel).toBeGreaterThanOrEqual(5);
    expect(result[0].riskLevel).toBeLessThanOrEqual(7);
  });

  it('includes mutual_fund with riskLevel 5-7 as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const mfIds = result.filter((p) => p.type === 'mutual_fund').map((p) => p.id);
    expect(mfIds).toContain('mf-5');
    expect(mfIds).toContain('mf-6');
    expect(mfIds).toContain('mf-7');
  });

  it('includes ssf and rmf as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).toContain('ssf');
    expect(types).toContain('rmf');
  });

  it('does NOT include deposits', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).not.toContain('deposit');
  });

  it('does NOT include bonds', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).not.toContain('bond');
  });

  it('no duplicate products in result', () => {
    const result = getRecommendedProducts(profile, catalog);
    const ids = result.map((p) => p.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

// ─── Aggressive Profile ───────────────────────────────────────────────────────

describe('getRecommendedProducts — aggressive', () => {
  const profile = makeProfile('aggressive');

  it('first product is a mutual_fund with riskLevel 6-8', () => {
    const result = getRecommendedProducts(profile, catalog);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].type).toBe('mutual_fund');
    expect(result[0].riskLevel).toBeGreaterThanOrEqual(6);
    expect(result[0].riskLevel).toBeLessThanOrEqual(8);
  });

  it('includes mutual_fund with riskLevel 6-8 as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const mfIds = result.filter((p) => p.type === 'mutual_fund').map((p) => p.id);
    expect(mfIds).toContain('mf-6');
    expect(mfIds).toContain('mf-7');
    expect(mfIds).toContain('mf-8');
  });

  it('includes ssf/rmf with riskLevel >= 5 as primary', () => {
    const result = getRecommendedProducts(profile, catalog);
    const taxFundIds = result
      .filter((p) => p.type === 'ssf' || p.type === 'rmf')
      .map((p) => p.id);
    expect(taxFundIds).toContain('ssf-high');
    expect(taxFundIds).toContain('rmf-high');
  });

  it('does NOT include ssf/rmf with riskLevel < 5', () => {
    const result = getRecommendedProducts(profile, catalog);
    const taxFundIds = result
      .filter((p) => p.type === 'ssf' || p.type === 'rmf')
      .map((p) => p.id);
    expect(taxFundIds).not.toContain('ssf-low');
    expect(taxFundIds).not.toContain('rmf-low');
  });

  it('does NOT include deposits', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).not.toContain('deposit');
  });

  it('does NOT include bonds', () => {
    const result = getRecommendedProducts(profile, catalog);
    const types = result.map((p) => p.type);
    expect(types).not.toContain('bond');
  });

  it('no duplicate products in result', () => {
    const result = getRecommendedProducts(profile, catalog);
    const ids = result.map((p) => p.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

// ─── Cross-Profile: Deposits First Only for Conservative ─────────────────────

describe('getRecommendedProducts — deposit ordering invariant', () => {
  const nonConservativeProfiles: RiskProfile['level'][] = [
    'moderately_conservative',
    'moderate',
    'moderately_aggressive',
    'aggressive',
  ];

  for (const level of nonConservativeProfiles) {
    it(`${level}: first product is NOT a deposit`, () => {
      const result = getRecommendedProducts(makeProfile(level), catalog);
      if (result.length > 0) {
        expect(result[0].type).not.toBe('deposit');
      }
    });
  }

  it('conservative: first product IS a deposit when catalog has deposits', () => {
    const result = getRecommendedProducts(makeProfile('conservative'), catalog);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].type).toBe('deposit');
  });
});

// ─── Catalog with Only Deposits ───────────────────────────────────────────────

describe('getRecommendedProducts — catalog with only deposits', () => {
  const depositsOnly = [
    makeProduct('dep-a', 'deposit', 1),
    makeProduct('dep-b', 'deposit', 1),
  ];

  it('conservative: returns all deposits', () => {
    const result = getRecommendedProducts(makeProfile('conservative'), depositsOnly);
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.type === 'deposit')).toBe(true);
  });

  it('moderate: returns empty (no matching products)', () => {
    const result = getRecommendedProducts(makeProfile('moderate'), depositsOnly);
    expect(result).toHaveLength(0);
  });

  it('aggressive: returns empty (no matching products)', () => {
    const result = getRecommendedProducts(makeProfile('aggressive'), depositsOnly);
    expect(result).toHaveLength(0);
  });
});

// ─── Result is a Subset of Catalog ───────────────────────────────────────────

describe('getRecommendedProducts — result is always a subset of catalog', () => {
  const profiles: RiskProfile['level'][] = [
    'conservative',
    'moderately_conservative',
    'moderate',
    'moderately_aggressive',
    'aggressive',
  ];

  for (const level of profiles) {
    it(`${level}: all returned products exist in the catalog`, () => {
      const catalogIds = new Set(catalog.map((p) => p.id));
      const result = getRecommendedProducts(makeProfile(level), catalog);
      for (const product of result) {
        expect(catalogIds.has(product.id)).toBe(true);
      }
    });
  }
});
