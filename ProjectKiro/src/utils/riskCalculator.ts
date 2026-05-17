/**
 * Risk Calculator Utility
 * คำนวณ Risk Profile จากคำตอบแบบสอบถามประเมินความเสี่ยงการลงทุน
 *
 * ช่วงคะแนนรวม → Risk Profile:
 *   0–20   → conservative          (ต่ำมาก)
 *   21–40  → moderately_conservative (ต่ำ)
 *   41–60  → moderate              (ปานกลาง)
 *   61–80  → moderately_aggressive  (สูง)
 *   81–100 → aggressive            (สูงมาก)
 *
 * Requirements: 2.2, 2.3
 */

import type { Question, QuestionnaireAnswer, RiskProfile } from '../types/index';

// ─── Score Boundary Constants ─────────────────────────────────────────────────

const SCORE_BOUNDARIES = [
  {
    maxScore: 20,
    level: 'conservative' as const,
    label: 'ต่ำมาก (Conservative)',
    description:
      'นักลงทุนที่ต้องการความปลอดภัยสูงสุด รับความสูญเสียได้น้อยมาก เน้นการรักษาเงินต้น',
  },
  {
    maxScore: 40,
    level: 'moderately_conservative' as const,
    label: 'ต่ำ (Moderately Conservative)',
    description: 'นักลงทุนที่ยอมรับความเสี่ยงได้เล็กน้อย ต้องการผลตอบแทนที่สม่ำเสมอ',
  },
  {
    maxScore: 60,
    level: 'moderate' as const,
    label: 'ปานกลาง (Moderate)',
    description:
      'นักลงทุนที่ยอมรับความเสี่ยงได้ปานกลาง ต้องการสมดุลระหว่างผลตอบแทนและความเสี่ยง',
  },
  {
    maxScore: 80,
    level: 'moderately_aggressive' as const,
    label: 'สูง (Moderately Aggressive)',
    description: 'นักลงทุนที่ยอมรับความเสี่ยงได้สูง มุ่งหวังผลตอบแทนที่ดีในระยะยาว',
  },
  {
    maxScore: 100,
    level: 'aggressive' as const,
    label: 'สูงมาก (Aggressive)',
    description:
      'นักลงทุนที่ยอมรับความเสี่ยงสูงมาก มุ่งหวังผลตอบแทนสูงสุด พร้อมรับความผันผวน',
  },
] as const;

// ─── calculateProfile ─────────────────────────────────────────────────────────

/**
 * คำนวณ Risk Profile จากชุดคำตอบแบบสอบถาม
 *
 * รวมคะแนนจากทุกคำตอบ แล้ว map ตาม boundary ที่กำหนด
 *
 * @param answers - ชุดคำตอบจากแบบสอบถาม (QuestionnaireAnswer[])
 * @returns RiskProfile ที่ประกอบด้วย level, score, label, description
 */
export function calculateProfile(answers: QuestionnaireAnswer[]): RiskProfile {
  // Sum all selected values
  const totalScore = answers.reduce((sum, answer) => sum + answer.selectedValue, 0);

  // Map score to boundary
  for (const boundary of SCORE_BOUNDARIES) {
    if (totalScore <= boundary.maxScore) {
      return {
        level: boundary.level,
        score: totalScore,
        label: boundary.label,
        description: boundary.description,
      };
    }
  }

  // Fallback for scores > 100 (treat as aggressive)
  const aggressive = SCORE_BOUNDARIES[SCORE_BOUNDARIES.length - 1];
  return {
    level: aggressive.level,
    score: totalScore,
    label: aggressive.label,
    description: aggressive.description,
  };
}

// ─── isQuestionnaireComplete ──────────────────────────────────────────────────

/**
 * ตรวจสอบว่าผู้ใช้ตอบคำถามครบทุกข้อหรือไม่
 *
 * คืน true เมื่อทุก question ใน questions array มีคำตอบที่ตรงกันใน answers array
 *
 * @param answers  - ชุดคำตอบที่ผู้ใช้ให้มา
 * @param questions - รายการคำถามทั้งหมดที่ต้องตอบ
 * @returns true ถ้าตอบครบทุกข้อ, false ถ้ายังขาดคำตอบ
 */
export function isQuestionnaireComplete(
  answers: QuestionnaireAnswer[],
  questions: Question[]
): boolean {
  if (questions.length === 0) return true;

  const answeredIds = new Set(answers.map((a) => a.questionId));
  return questions.every((q) => answeredIds.has(q.id));
}
