/**
 * Unit Tests: Tax Benefit Calculator
 * ทดสอบ calculateTaxBenefit ครอบคลุม cap boundaries, edge cases, และ invalid inputs
 */

import { describe, it, expect } from 'vitest';
import { calculateTaxBenefit } from './taxBenefitCalculator';

// ─── SSF Cap Boundary Tests ───────────────────────────────────────────────────

describe('calculateTaxBenefit — SSF deduction cap', () => {
  it('SSF: income below cap threshold (30% of income < 200,000)', () => {
    // 30% of 500,000 = 150,000 → below SSF cap of 200,000
    const result = calculateTaxBenefit({ annualIncome: 500_000, taxRate: 20 });
    expect(result.ssfMaxDeduction).toBe(150_000);
    expect(result.ssfTaxSaving).toBe(30_000); // 150,000 × 20%
  });

  it('SSF: income exactly at cap threshold (30% of income = 200,000)', () => {
    // 30% of 666,666.67 ≈ 200,000 → use exact: 200,000 / 0.30 = 666,666.666...
    // Use 666_667 to get 30% = 200,000.1 → capped at 200,000
    const result = calculateTaxBenefit({ annualIncome: 666_667, taxRate: 25 });
    expect(result.ssfMaxDeduction).toBe(200_000);
    expect(result.ssfTaxSaving).toBe(50_000); // 200,000 × 25%
  });

  it('SSF: income above cap threshold (30% of income > 200,000)', () => {
    // 30% of 1,000,000 = 300,000 → capped at 200,000
    const result = calculateTaxBenefit({ annualIncome: 1_000_000, taxRate: 30 });
    expect(result.ssfMaxDeduction).toBe(200_000);
    expect(result.ssfTaxSaving).toBe(60_000); // 200,000 × 30%
  });

  it('SSF: very high income still capped at 200,000', () => {
    const result = calculateTaxBenefit({ annualIncome: 10_000_000, taxRate: 35 });
    expect(result.ssfMaxDeduction).toBe(200_000);
    expect(result.ssfTaxSaving).toBe(70_000); // 200,000 × 35%
  });
});

// ─── RMF Cap Boundary Tests ───────────────────────────────────────────────────

describe('calculateTaxBenefit — RMF deduction cap', () => {
  it('RMF: income below cap threshold (30% of income < 500,000)', () => {
    // 30% of 500,000 = 150,000 → below RMF cap of 500,000
    const result = calculateTaxBenefit({ annualIncome: 500_000, taxRate: 20 });
    expect(result.rmfMaxDeduction).toBe(150_000);
    expect(result.rmfTaxSaving).toBe(30_000); // 150,000 × 20%
  });

  it('RMF: income exactly at cap threshold (30% of income = 500,000)', () => {
    // 30% of 1,666,667 ≈ 500,000.1 → capped at 500,000
    const result = calculateTaxBenefit({ annualIncome: 1_666_667, taxRate: 25 });
    expect(result.rmfMaxDeduction).toBe(500_000);
    expect(result.rmfTaxSaving).toBe(125_000); // 500,000 × 25%
  });

  it('RMF: income above cap threshold (30% of income > 500,000)', () => {
    // 30% of 2,000,000 = 600,000 → capped at 500,000
    const result = calculateTaxBenefit({ annualIncome: 2_000_000, taxRate: 30 });
    expect(result.rmfMaxDeduction).toBe(500_000);
    expect(result.rmfTaxSaving).toBe(150_000); // 500,000 × 30%
  });

  it('RMF: very high income still capped at 500,000', () => {
    const result = calculateTaxBenefit({ annualIncome: 10_000_000, taxRate: 35 });
    expect(result.rmfMaxDeduction).toBe(500_000);
    expect(result.rmfTaxSaving).toBe(175_000); // 500,000 × 35%
  });
});

// ─── SSF vs RMF Relationship ──────────────────────────────────────────────────

describe('calculateTaxBenefit — SSF vs RMF relationship', () => {
  it('RMF deduction is always >= SSF deduction for the same income', () => {
    const incomes = [100_000, 500_000, 1_000_000, 2_000_000];
    for (const income of incomes) {
      const result = calculateTaxBenefit({ annualIncome: income, taxRate: 20 });
      expect(result.rmfMaxDeduction).toBeGreaterThanOrEqual(result.ssfMaxDeduction);
    }
  });

  it('SSF and RMF deductions are equal when income is low (both below respective caps)', () => {
    // 30% of 300,000 = 90,000 → below both SSF (200k) and RMF (500k) caps
    const result = calculateTaxBenefit({ annualIncome: 300_000, taxRate: 15 });
    expect(result.ssfMaxDeduction).toBe(result.rmfMaxDeduction);
    expect(result.ssfMaxDeduction).toBe(90_000);
  });

  it('SSF is capped but RMF is not when income is between thresholds', () => {
    // 30% of 800,000 = 240,000 → SSF capped at 200,000, RMF not capped (240,000 < 500,000)
    const result = calculateTaxBenefit({ annualIncome: 800_000, taxRate: 20 });
    expect(result.ssfMaxDeduction).toBe(200_000);
    expect(result.rmfMaxDeduction).toBe(240_000);
  });
});

// ─── Tax Rate Edge Cases ──────────────────────────────────────────────────────

describe('calculateTaxBenefit — tax rate edge cases', () => {
  it('taxRate = 0: tax savings are 0 but deductions are still calculated', () => {
    const result = calculateTaxBenefit({ annualIncome: 1_000_000, taxRate: 0 });
    expect(result.ssfMaxDeduction).toBe(200_000);
    expect(result.rmfMaxDeduction).toBe(300_000);
    expect(result.ssfTaxSaving).toBe(0);
    expect(result.rmfTaxSaving).toBe(0);
  });

  it('taxRate = 100: tax savings equal the max deduction', () => {
    const result = calculateTaxBenefit({ annualIncome: 1_000_000, taxRate: 100 });
    expect(result.ssfTaxSaving).toBe(result.ssfMaxDeduction);
    expect(result.rmfTaxSaving).toBe(result.rmfMaxDeduction);
  });

  it('taxRate = 35 (highest Thai personal income tax bracket)', () => {
    const result = calculateTaxBenefit({ annualIncome: 2_000_000, taxRate: 35 });
    expect(result.ssfMaxDeduction).toBe(200_000);
    expect(result.rmfMaxDeduction).toBe(500_000);
    expect(result.ssfTaxSaving).toBeCloseTo(70_000, 5);
    expect(result.rmfTaxSaving).toBeCloseTo(175_000, 5);
  });
});

// ─── Income Edge Cases ────────────────────────────────────────────────────────

describe('calculateTaxBenefit — income edge cases', () => {
  it('very small income (1 baht): deductions are 30% of income', () => {
    const result = calculateTaxBenefit({ annualIncome: 1, taxRate: 20 });
    expect(result.ssfMaxDeduction).toBeCloseTo(0.3, 10);
    expect(result.rmfMaxDeduction).toBeCloseTo(0.3, 10);
  });

  it('income of exactly 666,666.67 baht: SSF deduction approaches 200,000', () => {
    // 30% of 666,666.67 = 200,000.001 → capped at 200,000
    const result = calculateTaxBenefit({ annualIncome: 666_666.67, taxRate: 20 });
    expect(result.ssfMaxDeduction).toBe(200_000);
  });

  it('income of exactly 1,666,666.67 baht: RMF deduction approaches 500,000', () => {
    // 30% of 1,666,666.67 = 500,000.001 → capped at 500,000
    const result = calculateTaxBenefit({ annualIncome: 1_666_666.67, taxRate: 20 });
    expect(result.rmfMaxDeduction).toBe(500_000);
  });
});

// ─── Input Validation ─────────────────────────────────────────────────────────

describe('calculateTaxBenefit — input validation', () => {
  it('throws when annualIncome = 0', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 0, taxRate: 20 })).toThrow();
  });

  it('throws when annualIncome is negative', () => {
    expect(() => calculateTaxBenefit({ annualIncome: -100_000, taxRate: 20 })).toThrow();
  });

  it('throws when taxRate is negative', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 500_000, taxRate: -1 })).toThrow();
  });

  it('throws when taxRate exceeds 100', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 500_000, taxRate: 101 })).toThrow();
  });

  it('throws when taxRate is 100.1', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 500_000, taxRate: 100.1 })).toThrow();
  });

  it('does NOT throw when annualIncome is a small positive number', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 0.01, taxRate: 20 })).not.toThrow();
  });

  it('does NOT throw when taxRate = 0 (boundary)', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 500_000, taxRate: 0 })).not.toThrow();
  });

  it('does NOT throw when taxRate = 100 (boundary)', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 500_000, taxRate: 100 })).not.toThrow();
  });

  it('error message mentions income when annualIncome <= 0', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 0, taxRate: 20 })).toThrow(
      /annualIncome|รายได้/
    );
  });

  it('error message mentions taxRate when taxRate is out of range', () => {
    expect(() => calculateTaxBenefit({ annualIncome: 500_000, taxRate: -5 })).toThrow(
      /taxRate|อัตราภาษี/
    );
  });
});

// ─── Return Structure ─────────────────────────────────────────────────────────

describe('calculateTaxBenefit — return structure', () => {
  it('returns all four required fields', () => {
    const result = calculateTaxBenefit({ annualIncome: 600_000, taxRate: 20 });
    expect(result).toHaveProperty('ssfMaxDeduction');
    expect(result).toHaveProperty('rmfMaxDeduction');
    expect(result).toHaveProperty('ssfTaxSaving');
    expect(result).toHaveProperty('rmfTaxSaving');
  });

  it('all returned values are non-negative numbers', () => {
    const result = calculateTaxBenefit({ annualIncome: 600_000, taxRate: 20 });
    expect(result.ssfMaxDeduction).toBeGreaterThanOrEqual(0);
    expect(result.rmfMaxDeduction).toBeGreaterThanOrEqual(0);
    expect(result.ssfTaxSaving).toBeGreaterThanOrEqual(0);
    expect(result.rmfTaxSaving).toBeGreaterThanOrEqual(0);
  });
});
