import type { MutualFund } from '../types/index';

/**
 * Mock data สำหรับกองทุนรวม SCBAM
 * ครอบคลุม risk level 1–8 ตามมาตรฐาน AIMC
 */
export const mutualFunds: MutualFund[] = [
  // Risk Level 1–2: ตราสารหนี้ระยะสั้น / ความเสี่ยงต่ำมาก
  {
    id: 'mf-001',
    type: 'mutual_fund',
    name: 'กองทุนเปิดไทยพาณิชย์ตราสารหนี้ระยะสั้น',
    nameEn: 'SCB Short-Term Fixed Income Fund',
    riskLevel: 1,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    investmentPolicy:
      'ลงทุนในตราสารหนี้ภาครัฐและเอกชนที่มีอันดับความน่าเชื่อถือสูง อายุเฉลี่ยของพอร์ตไม่เกิน 1 ปี',
    returnRate1Y: 1.85,
    returnRate3Y: 1.72,
    returnRate5Y: 1.68,
    purchaseFee: 0,
    prospectusUrl: 'https://www.scbam.com/fund/scbsf/prospectus',
    aimc_riskLevel: 1,
  },

  // Risk Level 2: ตราสารหนี้ระยะกลาง
  {
    id: 'mf-002',
    type: 'mutual_fund',
    name: 'กองทุนเปิดไทยพาณิชย์ตราสารหนี้',
    nameEn: 'SCB Fixed Income Fund',
    riskLevel: 2,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    investmentPolicy:
      'ลงทุนในพันธบัตรรัฐบาล หุ้นกู้เอกชนที่มีอันดับความน่าเชื่อถือระดับ Investment Grade และตราสารหนี้ภาครัฐ',
    returnRate1Y: 2.45,
    returnRate3Y: 2.31,
    returnRate5Y: 2.18,
    purchaseFee: 0,
    prospectusUrl: 'https://www.scbam.com/fund/scbfi/prospectus',
    aimc_riskLevel: 2,
  },

  // Risk Level 4: กองทุนผสม (Balanced)
  {
    id: 'mf-003',
    type: 'mutual_fund',
    name: 'กองทุนเปิดไทยพาณิชย์ผสมหลากหลายนโยบาย',
    nameEn: 'SCB Multi-Asset Fund',
    riskLevel: 4,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    investmentPolicy:
      'ลงทุนในหุ้นและตราสารหนี้ทั้งในและต่างประเทศ สัดส่วนหุ้นไม่เกิน 50% ของพอร์ต เพื่อสร้างผลตอบแทนที่สมดุลกับความเสี่ยง',
    returnRate1Y: 5.12,
    returnRate3Y: 4.87,
    returnRate5Y: 5.34,
    purchaseFee: 1.0,
    prospectusUrl: 'https://www.scbam.com/fund/scbma/prospectus',
    aimc_riskLevel: 4,
  },

  // Risk Level 5: กองทุนหุ้นไทย
  {
    id: 'mf-004',
    type: 'mutual_fund',
    name: 'กองทุนเปิดไทยพาณิชย์หุ้นระยะยาว',
    nameEn: 'SCB Thai Equity Long-Term Fund',
    riskLevel: 5,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    investmentPolicy:
      'ลงทุนในหุ้นสามัญของบริษัทจดทะเบียนในตลาดหลักทรัพย์แห่งประเทศไทย เน้นหุ้นที่มีปัจจัยพื้นฐานดีและมีศักยภาพการเติบโตสูง',
    returnRate1Y: 8.23,
    returnRate3Y: 7.45,
    returnRate5Y: 9.12,
    purchaseFee: 1.5,
    prospectusUrl: 'https://www.scbam.com/fund/scblt/prospectus',
    aimc_riskLevel: 5,
  },

  // Risk Level 6: กองทุนหุ้นต่างประเทศ
  {
    id: 'mf-005',
    type: 'mutual_fund',
    name: 'กองทุนเปิดไทยพาณิชย์หุ้นเอเชีย',
    nameEn: 'SCB Asia Equity Fund',
    riskLevel: 6,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    investmentPolicy:
      'ลงทุนในหุ้นของบริษัทในภูมิภาคเอเชีย (ไม่รวมญี่ปุ่น) ที่มีศักยภาพการเติบโตสูง ผ่านกองทุนหลักในต่างประเทศ',
    returnRate1Y: 10.54,
    returnRate3Y: 9.87,
    returnRate5Y: 11.23,
    purchaseFee: 1.5,
    prospectusUrl: 'https://www.scbam.com/fund/scbae/prospectus',
    aimc_riskLevel: 6,
  },

  // Risk Level 7–8: กองทุนหุ้นกลุ่มอุตสาหกรรม / ความเสี่ยงสูงมาก
  {
    id: 'mf-006',
    type: 'mutual_fund',
    name: 'กองทุนเปิดไทยพาณิชย์โกลบอลเทคโนโลยี',
    nameEn: 'SCB Global Technology Fund',
    riskLevel: 8,
    minInvestment: 1000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    investmentPolicy:
      'ลงทุนในหุ้นของบริษัทเทคโนโลยีชั้นนำทั่วโลก เน้นกลุ่ม AI, Cloud Computing, Semiconductor และ Digital Transformation ผ่านกองทุนหลักในต่างประเทศ',
    returnRate1Y: 18.76,
    returnRate3Y: 15.43,
    returnRate5Y: null,
    purchaseFee: 1.5,
    prospectusUrl: 'https://www.scbam.com/fund/scbgt/prospectus',
    aimc_riskLevel: 8,
  },
];

export default mutualFunds;
