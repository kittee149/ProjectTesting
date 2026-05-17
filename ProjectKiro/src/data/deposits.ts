import type { Deposit } from '../types/index';

/**
 * Mock data สำหรับผลิตภัณฑ์เงินฝาก SCB
 * ครอบคลุม 3 ประเภท: fixed (เงินฝากประจำ), savings_special (เงินฝากออมทรัพย์พิเศษ), digital (เงินฝากดิจิทัล)
 * Requirements: 5.1, 5.2, 5.3
 */
export const deposits: Deposit[] = [
  // ─── เงินฝากประจำ (Fixed Deposit) ───────────────────────────────────────────
  {
    id: 'dep-001',
    type: 'deposit',
    name: 'เงินฝากประจำ 3 เดือน',
    nameEn: 'Fixed Deposit 3 Months',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    depositType: 'fixed',
    interestRate: 1.50,
    tenorMonths: 3,
    conditions:
      'ฝากขั้นต่ำ 1,000 บาท ถอนก่อนกำหนดได้รับดอกเบี้ยในอัตราออมทรัพย์ ณ วันที่ฝาก',
    depositInsuranceLimit: 1_000_000,
  },
  {
    id: 'dep-002',
    type: 'deposit',
    name: 'เงินฝากประจำ 12 เดือน',
    nameEn: 'Fixed Deposit 12 Months',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    depositType: 'fixed',
    interestRate: 2.00,
    tenorMonths: 12,
    conditions:
      'ฝากขั้นต่ำ 1,000 บาท ถอนก่อนกำหนดได้รับดอกเบี้ยในอัตราออมทรัพย์ ณ วันที่ฝาก ดอกเบี้ยจ่ายเมื่อครบกำหนด',
    depositInsuranceLimit: 1_000_000,
  },
  {
    id: 'dep-003',
    type: 'deposit',
    name: 'เงินฝากประจำ 24 เดือน',
    nameEn: 'Fixed Deposit 24 Months',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    depositType: 'fixed',
    interestRate: 2.30,
    tenorMonths: 24,
    conditions:
      'ฝากขั้นต่ำ 1,000 บาท ถอนก่อนกำหนดได้รับดอกเบี้ยในอัตราออมทรัพย์ ณ วันที่ฝาก ดอกเบี้ยจ่ายทุก 6 เดือน',
    depositInsuranceLimit: 1_000_000,
  },

  // ─── เงินฝากออมทรัพย์พิเศษ (Savings Special) ────────────────────────────────
  {
    id: 'dep-004',
    type: 'deposit',
    name: 'เงินฝากออมทรัพย์พิเศษ SCB Easy Savings',
    nameEn: 'SCB Easy Savings Special Account',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    depositType: 'savings_special',
    interestRate: 1.20,
    tenorMonths: 0, // ไม่มีกำหนดระยะเวลา (ออมทรัพย์)
    conditions:
      'ฝากขั้นต่ำ 1,000 บาท ถอนได้ทุกเมื่อ ดอกเบี้ยคำนวณรายวัน จ่ายทุก 6 เดือน (มิถุนายน และธันวาคม)',
    depositInsuranceLimit: 1_000_000,
  },
  {
    id: 'dep-005',
    type: 'deposit',
    name: 'เงินฝากออมทรัพย์พิเศษ SCB Me Save',
    nameEn: 'SCB Me Save Special Savings',
    riskLevel: 1,
    minInvestment: 500,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    depositType: 'savings_special',
    interestRate: 1.50,
    tenorMonths: 0,
    conditions:
      'ฝากขั้นต่ำ 500 บาท ถอนได้ไม่เกิน 3 ครั้งต่อเดือน หากถอนเกินจะเสียค่าธรรมเนียม ดอกเบี้ยจ่ายทุก 6 เดือน',
    depositInsuranceLimit: 1_000_000,
  },
  {
    id: 'dep-006',
    type: 'deposit',
    name: 'เงินฝากออมทรัพย์พิเศษ SCB Bonus Savings',
    nameEn: 'SCB Bonus Savings Account',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    depositType: 'savings_special',
    interestRate: 1.75,
    tenorMonths: 0,
    conditions:
      'ฝากขั้นต่ำ 1,000 บาท รับดอกเบี้ยโบนัสเพิ่มเติมเมื่อไม่ถอนเงินตลอดปี ดอกเบี้ยจ่ายปีละครั้ง (ธันวาคม)',
    depositInsuranceLimit: 1_000_000,
  },

  // ─── เงินฝากดิจิทัล (Digital Deposit) ───────────────────────────────────────
  {
    id: 'dep-007',
    type: 'deposit',
    name: 'เงินฝากดิจิทัล SCB Digital Fixed 6 เดือน',
    nameEn: 'SCB Digital Fixed Deposit 6 Months',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    depositType: 'digital',
    interestRate: 1.80,
    tenorMonths: 6,
    conditions:
      'เปิดบัญชีผ่าน SCB EASY App เท่านั้น ฝากขั้นต่ำ 1,000 บาท สูงสุด 5,000,000 บาท ถอนก่อนกำหนดไม่ได้รับดอกเบี้ย',
    depositInsuranceLimit: 1_000_000,
  },
  {
    id: 'dep-008',
    type: 'deposit',
    name: 'เงินฝากดิจิทัล SCB Digital Savings',
    nameEn: 'SCB Digital Savings Account',
    riskLevel: 1,
    minInvestment: 100,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    depositType: 'digital',
    interestRate: 1.30,
    tenorMonths: 0,
    conditions:
      'เปิดบัญชีผ่าน SCB EASY App เท่านั้น ฝากขั้นต่ำ 100 บาท ถอนได้ทุกเมื่อผ่านแอป ดอกเบี้ยคำนวณรายวัน จ่ายทุก 6 เดือน',
    depositInsuranceLimit: 1_000_000,
  },
  {
    id: 'dep-009',
    type: 'deposit',
    name: 'เงินฝากดิจิทัล SCB Digital Fixed 12 เดือน',
    nameEn: 'SCB Digital Fixed Deposit 12 Months',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    depositType: 'digital',
    interestRate: 2.10,
    tenorMonths: 12,
    conditions:
      'เปิดบัญชีผ่าน SCB EASY App เท่านั้น ฝากขั้นต่ำ 1,000 บาท สูงสุด 5,000,000 บาท ถอนก่อนกำหนดไม่ได้รับดอกเบี้ย ดอกเบี้ยจ่ายเมื่อครบกำหนด',
    depositInsuranceLimit: 1_000_000,
  },
];

export default deposits;
