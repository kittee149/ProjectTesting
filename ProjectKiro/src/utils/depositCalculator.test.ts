/**
 * Unit Tests: Deposit Interest Calculator
 * ทดสอบ calculateDepositInterest ครอบคลุม valid inputs, edge cases, และ invalid inputs
 */

import { describe, it, expect } from 'vitest';
import { calculateDepositInterest } from './depositCalculator';

// ─── Valid Inputs ─────────────────────────────────────────────────────────────

describe('calculateDepositInterest — valid inputs', () => {
  it('standard case: 100,000 principal, 12 months, 2% rate', () => {
    // interest = 100,000 × (2/100) × (12/12) = 2,000
    const result = calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: 2 });
    expect(result.interest).toBeCloseTo(2_000, 10);
    expect(result.totalAmount).toBeCloseTo(102_000, 10);
  });

  it('6-month tenor: 100,000 principal, 6 months, 2% rate', () => {
    // interest = 100,000 × (2/100) × (6/12) = 1,000
    const result = calculateDepositInterest({ principal: 100_000, tenorMonths: 6, interestRate: 2 });
    expect(result.interest).toBeCloseTo(1_000, 10);
    expect(result.totalAmount).toBeCloseTo(101_000, 10);
  });

  it('24-month tenor: 500,000 principal, 24 months, 3% rate', () => {
    // interest = 500,000 × (3/100) × (24/12) = 30,000
    const result = calculateDepositInterest({ principal: 500_000, tenorMonths: 24, interestRate: 3 });
    expect(result.interest).toBeCloseTo(30_000, 10);
    expect(result.totalAmount).toBeCloseTo(530_000, 10);
  });

  it('totalAmount always equals principal + interest', () => {
    const result = calculateDepositInterest({ principal: 250_000, tenorMonths: 18, interestRate: 2.5 });
    expect(result.totalAmount).toBeCloseTo(result.interest + 250_000, 10);
  });
});

// ─── Edge Case: Rate = 0 ──────────────────────────────────────────────────────

describe('calculateDepositInterest — edge case: rate = 0', () => {
  it('interest is 0 when rate is 0', () => {
    const result = calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: 0 });
    expect(result.interest).toBe(0);
  });

  it('totalAmount equals principal when rate is 0', () => {
    const result = calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: 0 });
    expect(result.totalAmount).toBe(100_000);
  });
});

// ─── Edge Case: 1-Month Tenor ─────────────────────────────────────────────────

describe('calculateDepositInterest — edge case: 1-month tenor', () => {
  it('1-month tenor: 120,000 principal, 1 month, 2.4% rate', () => {
    // interest = 120,000 × (2.4/100) × (1/12) = 240
    const result = calculateDepositInterest({ principal: 120_000, tenorMonths: 1, interestRate: 2.4 });
    expect(result.interest).toBeCloseTo(240, 10);
    expect(result.totalAmount).toBeCloseTo(120_240, 10);
  });

  it('1-month tenor with rate 0: interest is 0', () => {
    const result = calculateDepositInterest({ principal: 50_000, tenorMonths: 1, interestRate: 0 });
    expect(result.interest).toBe(0);
    expect(result.totalAmount).toBe(50_000);
  });
});

// ─── Input Validation ─────────────────────────────────────────────────────────

describe('calculateDepositInterest — input validation', () => {
  it('throws when principal = 0', () => {
    expect(() =>
      calculateDepositInterest({ principal: 0, tenorMonths: 12, interestRate: 2 })
    ).toThrow();
  });

  it('throws when principal = -1', () => {
    expect(() =>
      calculateDepositInterest({ principal: -1, tenorMonths: 12, interestRate: 2 })
    ).toThrow();
  });

  it('throws when principal is a large negative number', () => {
    expect(() =>
      calculateDepositInterest({ principal: -100_000, tenorMonths: 12, interestRate: 2 })
    ).toThrow();
  });

  it('throws when tenorMonths = 0', () => {
    expect(() =>
      calculateDepositInterest({ principal: 100_000, tenorMonths: 0, interestRate: 2 })
    ).toThrow();
  });

  it('throws when tenorMonths is negative', () => {
    expect(() =>
      calculateDepositInterest({ principal: 100_000, tenorMonths: -6, interestRate: 2 })
    ).toThrow();
  });

  it('throws when interestRate = -1', () => {
    expect(() =>
      calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: -1 })
    ).toThrow();
  });

  it('does NOT throw when interestRate = 0 (boundary)', () => {
    expect(() =>
      calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: 0 })
    ).not.toThrow();
  });

  it('does NOT throw when principal is a small positive number', () => {
    expect(() =>
      calculateDepositInterest({ principal: 0.01, tenorMonths: 1, interestRate: 1 })
    ).not.toThrow();
  });

  it('error message mentions principal when principal <= 0', () => {
    expect(() =>
      calculateDepositInterest({ principal: 0, tenorMonths: 12, interestRate: 2 })
    ).toThrow(/principal|จำนวนเงินฝาก/);
  });

  it('error message mentions tenorMonths when tenorMonths <= 0', () => {
    expect(() =>
      calculateDepositInterest({ principal: 100_000, tenorMonths: 0, interestRate: 2 })
    ).toThrow(/tenorMonths|ระยะเวลา/);
  });

  it('error message mentions interestRate when interestRate < 0', () => {
    expect(() =>
      calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: -1 })
    ).toThrow(/interestRate|อัตราดอกเบี้ย/);
  });
});

// ─── Return Structure ─────────────────────────────────────────────────────────

describe('calculateDepositInterest — return structure', () => {
  it('returns both required fields', () => {
    const result = calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: 2 });
    expect(result).toHaveProperty('interest');
    expect(result).toHaveProperty('totalAmount');
  });

  it('interest and totalAmount are non-negative numbers', () => {
    const result = calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: 2 });
    expect(result.interest).toBeGreaterThanOrEqual(0);
    expect(result.totalAmount).toBeGreaterThanOrEqual(0);
  });

  it('totalAmount is always >= principal', () => {
    const result = calculateDepositInterest({ principal: 100_000, tenorMonths: 12, interestRate: 5 });
    expect(result.totalAmount).toBeGreaterThanOrEqual(100_000);
  });
});
