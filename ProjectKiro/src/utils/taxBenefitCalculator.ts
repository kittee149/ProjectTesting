/**
 * Tax Benefit Calculator Utility
 * คำนวณสิทธิประโยชน์ทางภาษีสำหรับกองทุน SSF และ RMF
 *
 * SSF: วงเงินลดหย่อนสูงสุด = min(รายได้ × 30%, 200,000 บาท)
 * RMF: วงเงินลดหย่อนสูงสุด = min(รายได้ × 30%, 500,000 บาท)
 */

import type { TaxBenefitInput, TaxBenefitResult } from '../types/index';

/** SSF deduction cap in baht */
const SSF_MAX_DEDUCTION_CAP = 200_000;

/** RMF deduction cap in baht */
const RMF_MAX_DEDUCTION_CAP = 500_000;

/** Income deduction percentage (30%) */
const INCOME_DEDUCTION_RATE = 0.30;

/**
 * Calculates the maximum tax deduction and tax saving for SSF and RMF funds.
 *
 * @param input - { annualIncome: รายได้ต่อปี (บาท), taxRate: อัตราภาษี (%) }
 * @returns TaxBenefitResult with SSF/RMF max deductions and tax savings
 * @throws Error if annualIncome <= 0 or taxRate is outside [0, 100]
 */
export function calculateTaxBenefit(input: TaxBenefitInput): TaxBenefitResult {
  const { annualIncome, taxRate } = input;

  // Input validation
  if (annualIncome <= 0) {
    throw new Error('รายได้ต่อปีต้องมากกว่า 0 (annualIncome must be greater than 0)');
  }

  if (taxRate < 0 || taxRate > 100) {
    throw new Error('อัตราภาษีต้องอยู่ระหว่าง 0–100 (taxRate must be between 0 and 100)');
  }

  // Calculate income-based deduction limit (30% of annual income)
  const incomeBasedDeduction = annualIncome * INCOME_DEDUCTION_RATE;

  // SSF: capped at 200,000 baht
  const ssfMaxDeduction = Math.min(incomeBasedDeduction, SSF_MAX_DEDUCTION_CAP);

  // RMF: capped at 500,000 baht
  const rmfMaxDeduction = Math.min(incomeBasedDeduction, RMF_MAX_DEDUCTION_CAP);

  // Tax savings = max deduction × (tax rate / 100)
  const taxRateDecimal = taxRate / 100;
  const ssfTaxSaving = ssfMaxDeduction * taxRateDecimal;
  const rmfTaxSaving = rmfMaxDeduction * taxRateDecimal;

  return {
    ssfMaxDeduction,
    rmfMaxDeduction,
    ssfTaxSaving,
    rmfTaxSaving,
  };
}
