import type { Bond } from '../types/index';

/**
 * Mock data สำหรับหุ้นกู้ SCB
 * รวมถึงรายการที่ isSoldOut: true ตาม Requirement 4.5
 */
export const bonds: Bond[] = [
  // Investment Grade — AAA (จำหน่ายอยู่)
  {
    id: 'bond-001',
    type: 'bond',
    name: 'หุ้นกู้ธนาคารไทยพาณิชย์ ครั้งที่ 1/2568',
    nameEn: 'SCB Debenture No. 1/2025',
    riskLevel: 2,
    minInvestment: 100000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    issuer: 'ธนาคารไทยพาณิชย์ จำกัด (มหาชน)',
    creditRating: 'AAA',
    interestRate: 3.25,
    tenor: 3,
    maturityDate: new Date('2028-03-15'),
    isSoldOut: false,
    specificRisks: [
      'ความเสี่ยงด้านอัตราดอกเบี้ย: มูลค่าหุ้นกู้อาจลดลงหากอัตราดอกเบี้ยในตลาดปรับตัวสูงขึ้น',
      'ความเสี่ยงด้านสภาพคล่อง: หุ้นกู้อาจไม่มีตลาดรองรับการซื้อขายก่อนครบกำหนด',
    ],
  },

  // Investment Grade — AA+ (จำหน่ายอยู่)
  {
    id: 'bond-002',
    type: 'bond',
    name: 'หุ้นกู้บริษัท ปตท. จำกัด (มหาชน) ครั้งที่ 2/2568',
    nameEn: 'PTT Debenture No. 2/2025',
    riskLevel: 2,
    minInvestment: 100000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: true,
    issuer: 'บริษัท ปตท. จำกัด (มหาชน)',
    creditRating: 'AA+',
    interestRate: 3.50,
    tenor: 5,
    maturityDate: new Date('2030-06-30'),
    isSoldOut: false,
    specificRisks: [
      'ความเสี่ยงด้านอัตราดอกเบี้ย: มูลค่าหุ้นกู้อาจลดลงหากอัตราดอกเบี้ยในตลาดปรับตัวสูงขึ้น',
      'ความเสี่ยงด้านธุรกิจ: ผลการดำเนินงานของผู้ออกหุ้นกู้อาจได้รับผลกระทบจากราคาพลังงานโลก',
      'ความเสี่ยงด้านสภาพคล่อง: หุ้นกู้อาจไม่มีตลาดรองรับการซื้อขายก่อนครบกำหนด',
    ],
  },

  // Investment Grade — A (จำหน่ายหมดแล้ว — isSoldOut: true)
  {
    id: 'bond-003',
    type: 'bond',
    name: 'หุ้นกู้บริษัท ซีพี ออลล์ จำกัด (มหาชน) ครั้งที่ 1/2567',
    nameEn: 'CP All Debenture No. 1/2024',
    riskLevel: 3,
    minInvestment: 100000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    issuer: 'บริษัท ซีพี ออลล์ จำกัด (มหาชน)',
    creditRating: 'A',
    interestRate: 4.10,
    tenor: 3,
    maturityDate: new Date('2027-09-20'),
    isSoldOut: true,
    specificRisks: [
      'ความเสี่ยงด้านอัตราดอกเบี้ย: มูลค่าหุ้นกู้อาจลดลงหากอัตราดอกเบี้ยในตลาดปรับตัวสูงขึ้น',
      'ความเสี่ยงด้านธุรกิจ: ผลการดำเนินงานของผู้ออกหุ้นกู้อาจได้รับผลกระทบจากการแข่งขันในธุรกิจค้าปลีก',
      'ความเสี่ยงด้านสภาพคล่อง: หุ้นกู้อาจไม่มีตลาดรองรับการซื้อขายก่อนครบกำหนด',
    ],
  },

  // Investment Grade — BBB+ (จำหน่ายอยู่)
  {
    id: 'bond-004',
    type: 'bond',
    name: 'หุ้นกู้บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน) ครั้งที่ 1/2568',
    nameEn: 'Central Retail Debenture No. 1/2025',
    riskLevel: 3,
    minInvestment: 100000,
    lastUpdated: new Date('2025-01-15'),
    isFeatured: false,
    issuer: 'บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)',
    creditRating: 'BBB+',
    interestRate: 4.75,
    tenor: 2,
    maturityDate: new Date('2027-04-10'),
    isSoldOut: false,
    specificRisks: [
      'ความเสี่ยงด้านอัตราดอกเบี้ย: มูลค่าหุ้นกู้อาจลดลงหากอัตราดอกเบี้ยในตลาดปรับตัวสูงขึ้น',
      'ความเสี่ยงด้านธุรกิจ: ผลการดำเนินงานของผู้ออกหุ้นกู้อาจได้รับผลกระทบจากพฤติกรรมผู้บริโภคและภาวะเศรษฐกิจ',
      'ความเสี่ยงด้านสภาพคล่อง: หุ้นกู้อาจไม่มีตลาดรองรับการซื้อขายก่อนครบกำหนด',
      'ความเสี่ยงด้านเครดิต: อันดับความน่าเชื่อถือของผู้ออกหุ้นกู้อาจถูกปรับลดในอนาคต',
    ],
  },
];

export default bonds;
