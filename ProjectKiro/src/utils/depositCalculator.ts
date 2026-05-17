/**
 * Deposit Interest Calculator Utility
 * คำนวณดอกเบี้ยเงินฝากแบบ Simple Interest
 *
 * สูตร: interest = principal × (interestRate / 100) × (tenorMonths / 12)
 *       totalAmount = principal + interest
 */

import type { DepositCalculatorInput, DepositCalculatorResult } from '../types/index';

/**
 * Calculates simple interest and total amount for a deposit.
 *
 * @param input - { principal: จำนวนเงินฝาก (บาท), tenorMonths: ระยะเวลา (เดือน), interestRate: อัตราดอกเบี้ย (%) }
 * @returns DepositCalculatorResult with interest and totalAmount
 * @throws Error if principal <= 0, tenorMonths <= 0, or interestRate < 0
 */
export function calculateDepositInterest(input: DepositCalculatorInput): DepositCalculatorResult {
  const { principal, tenorMonths, interestRate } = input;

  // Input validation
  if (principal <= 0) {
    throw new Error('จำนวนเงินฝากต้องมากกว่า 0 (principal must be greater than 0)');
  }

  if (tenorMonths <= 0) {
    throw new Error('ระยะเวลาฝากต้องมากกว่า 0 (tenorMonths must be greater than 0)');
  }

  if (interestRate < 0) {
    throw new Error('อัตราดอกเบี้ยต้องไม่ต่ำกว่า 0 (interestRate must be >= 0)');
  }

  // Simple interest formula
  const interest = principal * (interestRate / 100) * (tenorMonths / 12);
  const totalAmount = principal + interest;

  return {
    interest,
    totalAmount,
  };
}
