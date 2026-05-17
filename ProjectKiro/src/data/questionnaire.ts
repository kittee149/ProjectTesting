import type { Question } from '../types/index';

/**
 * แบบสอบถามประเมินความเสี่ยงการลงทุน
 * มี 5 ข้อ ครอบคลุม: age, income, investment_period, experience, loss_tolerance
 * แต่ละข้อมีคะแนนสูงสุด 20 คะแนน รวมสูงสุด 100 คะแนน
 *
 * ช่วงคะแนนรวม → Risk Profile:
 *   0–20   → Conservative (ต่ำมาก)
 *   21–40  → Moderately Conservative (ต่ำ)
 *   41–60  → Moderate (ปานกลาง)
 *   61–80  → Moderately Aggressive (สูง)
 *   81–100 → Aggressive (สูงมาก)
 *
 * Requirements: 2.1
 */
export const questions: Question[] = [
  // ─── ข้อ 1: อายุ (age) ───────────────────────────────────────────────────────
  {
    id: 'q-age',
    text: 'อายุของท่านอยู่ในช่วงใด?',
    category: 'age',
    options: [
      { value: 4,  label: '60 ปีขึ้นไป' },
      { value: 8,  label: '50–59 ปี' },
      { value: 12, label: '40–49 ปี' },
      { value: 16, label: '30–39 ปี' },
      { value: 20, label: 'ต่ำกว่า 30 ปี' },
    ],
  },

  // ─── ข้อ 2: รายได้ (income) ──────────────────────────────────────────────────
  {
    id: 'q-income',
    text: 'รายได้ต่อปีของท่านอยู่ในช่วงใด?',
    category: 'income',
    options: [
      { value: 4,  label: 'ต่ำกว่า 300,000 บาท' },
      { value: 8,  label: '300,000–600,000 บาท' },
      { value: 12, label: '600,001–1,200,000 บาท' },
      { value: 16, label: '1,200,001–3,000,000 บาท' },
      { value: 20, label: 'มากกว่า 3,000,000 บาท' },
    ],
  },

  // ─── ข้อ 3: ระยะเวลาการลงทุน (investment_period) ────────────────────────────
  {
    id: 'q-investment-period',
    text: 'ท่านวางแผนลงทุนเป็นระยะเวลานานเท่าใด?',
    category: 'investment_period',
    options: [
      { value: 4,  label: 'น้อยกว่า 1 ปี' },
      { value: 8,  label: '1–3 ปี' },
      { value: 12, label: '3–5 ปี' },
      { value: 16, label: '5–10 ปี' },
      { value: 20, label: 'มากกว่า 10 ปี' },
    ],
  },

  // ─── ข้อ 4: ประสบการณ์การลงทุน (experience) ─────────────────────────────────
  {
    id: 'q-experience',
    text: 'ท่านมีประสบการณ์การลงทุนในระดับใด?',
    category: 'experience',
    options: [
      { value: 4,  label: 'ไม่มีประสบการณ์ เพิ่งเริ่มต้น' },
      { value: 8,  label: 'มีประสบการณ์เล็กน้อย (เงินฝาก/พันธบัตร)' },
      { value: 12, label: 'มีประสบการณ์ปานกลาง (กองทุนรวม/หุ้นกู้)' },
      { value: 16, label: 'มีประสบการณ์มาก (หุ้น/กองทุนหุ้น)' },
      { value: 20, label: 'มีประสบการณ์สูงมาก (อนุพันธ์/ลงทุนต่างประเทศ)' },
    ],
  },

  // ─── ข้อ 5: ความสามารถรับความสูญเสีย (loss_tolerance) ───────────────────────
  {
    id: 'q-loss-tolerance',
    text: 'หากมูลค่าเงินลงทุนของท่านลดลง 20% ท่านจะดำเนินการอย่างไร?',
    category: 'loss_tolerance',
    options: [
      { value: 4,  label: 'ขายทันทีเพื่อหยุดความสูญเสีย' },
      { value: 8,  label: 'ขายบางส่วนเพื่อลดความเสี่ยง' },
      { value: 12, label: 'ถือต่อและรอให้ตลาดฟื้นตัว' },
      { value: 16, label: 'ถือต่อและซื้อเพิ่มในราคาที่ต่ำลง' },
      { value: 20, label: 'ซื้อเพิ่มอย่างมีนัยสำคัญ เพราะมองว่าเป็นโอกาส' },
    ],
  },
];

export default questions;
