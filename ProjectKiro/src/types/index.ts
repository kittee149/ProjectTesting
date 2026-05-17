/**
 * Core TypeScript interfaces for SCB Investment Advisor
 * ตาม design document: SCB Investment Advisor
 */

// ─── Risk Profile ────────────────────────────────────────────────────────────

export type RiskLevel =
  | 'conservative'
  | 'moderately_conservative'
  | 'moderate'
  | 'moderately_aggressive'
  | 'aggressive';

export interface RiskProfile {
  level: RiskLevel;
  score: number;       // คะแนนรวมจากแบบสอบถาม (0–100)
  label: string;       // ชื่อระดับความเสี่ยง (ภาษาไทย/อังกฤษ)
  description: string; // คำอธิบายลักษณะนักลงทุน
}

// ─── Questionnaire ───────────────────────────────────────────────────────────

export interface QuestionOption {
  value: number; // คะแนนของตัวเลือกนี้
  label: string; // ข้อความตัวเลือก
}

export interface Question {
  id: string;
  text: string;
  category:
    | 'age'
    | 'income'
    | 'investment_period'
    | 'experience'
    | 'loss_tolerance';
  options: QuestionOption[];
}

export interface QuestionnaireAnswer {
  questionId: string;
  selectedValue: number;
}

// ─── Products ────────────────────────────────────────────────────────────────

export type ProductType = 'mutual_fund' | 'bond' | 'deposit' | 'ssf' | 'rmf';

export interface BaseProduct {
  id: string;
  type: ProductType;
  name: string;          // ชื่อผลิตภัณฑ์ (ภาษาไทย)
  nameEn: string;        // ชื่อผลิตภัณฑ์ (ภาษาอังกฤษ)
  riskLevel: number;     // 1–8 (กองทุน) หรือ 1–5 (ทั่วไป)
  minInvestment: number; // จำนวนเงินลงทุนขั้นต่ำ (บาท)
  lastUpdated: Date;     // วันที่อัปเดตข้อมูลล่าสุด
  isFeatured: boolean;   // แสดงบนหน้าหลักหรือไม่
}

/** กองทุนรวมทั่วไป */
export interface MutualFund extends BaseProduct {
  type: 'mutual_fund';
  investmentPolicy: string;     // นโยบายการลงทุน
  returnRate1Y: number | null;  // ผลตอบแทนย้อนหลัง 1 ปี (%)
  returnRate3Y: number | null;  // ผลตอบแทนย้อนหลัง 3 ปี (%)
  returnRate5Y: number | null;  // ผลตอบแทนย้อนหลัง 5 ปี (%)
  purchaseFee: number;          // ค่าธรรมเนียมการซื้อ (%)
  prospectusUrl: string;        // ลิงก์หนังสือชี้ชวน
  aimc_riskLevel: number;       // ระดับความเสี่ยง AIMC (1–8)
}

/** หุ้นกู้ */
export interface Bond extends BaseProduct {
  type: 'bond';
  issuer: string;          // ชื่อผู้ออก
  creditRating: string;    // อันดับความน่าเชื่อถือ (เช่น AAA, AA+)
  interestRate: number;    // อัตราดอกเบี้ย (%)
  tenor: number;           // ระยะเวลา (ปี)
  maturityDate: Date;      // วันครบกำหนด
  isSoldOut: boolean;      // สถานะจำหน่ายหมด
  specificRisks: string[]; // ความเสี่ยงเฉพาะ
}

/** เงินฝาก */
export interface Deposit extends BaseProduct {
  type: 'deposit';
  depositType: 'fixed' | 'savings_special' | 'digital'; // ประเภทเงินฝาก
  interestRate: number;          // อัตราดอกเบี้ยต่อปี (%)
  tenorMonths: number;           // ระยะเวลาฝาก (เดือน)
  conditions: string;            // เงื่อนไขการฝาก
  depositInsuranceLimit: number; // วงเงินคุ้มครอง (1,000,000 บาท)
}

/** กองทุน SSF / RMF */
export interface TaxFund extends BaseProduct {
  type: 'ssf' | 'rmf';
  investmentPolicy: string;
  returnRate1Y: number | null;
  returnRate3Y: number | null;
  returnRate5Y: number | null;
  purchaseFee: number;
  prospectusUrl: string;
  aimc_riskLevel: number;
  /** SSF: ถือครองอย่างน้อย 10 ปีนับจากวันที่ซื้อ
   *  RMF: ถือครองจนอายุ 55 ปีและถือครองอย่างน้อย 5 ปี */
  holdingCondition: string;
  maxDeductionPercent: number; // 30% ของรายได้
  maxDeductionAmount: number;  // SSF: 200,000 / RMF: 500,000
}

// ─── Comparison ──────────────────────────────────────────────────────────────

export interface ComparisonItem {
  productId: string;
  productType: ProductType;
}

// ─── Filter ──────────────────────────────────────────────────────────────────

export interface FilterState {
  productType: ProductType | 'all';
  riskLevel: number | null;        // 1–8
  minInvestmentMax: number | null; // กรองตามเงินลงทุนขั้นต่ำสูงสุด
  hasTaxBenefit: boolean | null;
  searchQuery: string;
}

// ─── Calculators ─────────────────────────────────────────────────────────────

export interface TaxBenefitInput {
  annualIncome: number; // รายได้ต่อปี (บาท)
  taxRate: number;      // อัตราภาษี (%)
}

export interface TaxBenefitResult {
  ssfMaxDeduction: number; // วงเงินลดหย่อน SSF สูงสุด
  rmfMaxDeduction: number; // วงเงินลดหย่อน RMF สูงสุด
  ssfTaxSaving: number;    // ภาษีที่ประหยัดได้จาก SSF
  rmfTaxSaving: number;    // ภาษีที่ประหยัดได้จาก RMF
}

export interface DepositCalculatorInput {
  principal: number;    // จำนวนเงินฝาก (บาท)
  tenorMonths: number;  // ระยะเวลา (เดือน)
  interestRate: number; // อัตราดอกเบี้ย (%)
}

export interface DepositCalculatorResult {
  interest: number;     // ดอกเบี้ยที่ได้รับ (บาท)
  totalAmount: number;  // จำนวนเงินรวม (บาท)
}
