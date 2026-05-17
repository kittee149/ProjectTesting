/**
 * Unit Tests: Risk Calculator
 * ทดสอบ calculateProfile และ isQuestionnaireComplete
 * ครอบคลุม boundary values ทั้ง 5 ระดับ และ edge cases ของ isQuestionnaireComplete
 *
 * Requirements: 2.2, 2.3
 */

import { describe, it, expect } from 'vitest';
import { calculateProfile, isQuestionnaireComplete } from './riskCalculator';
import type { Question, QuestionnaireAnswer } from '../types/index';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** สร้าง QuestionnaireAnswer[] จาก array ของ scores (1 answer per question) */
function makeAnswers(scores: number[]): QuestionnaireAnswer[] {
  return scores.map((score, i) => ({
    questionId: `q-${i + 1}`,
    selectedValue: score,
  }));
}

/** สร้าง Question[] ที่มี id ตรงกับ makeAnswers */
function makeQuestions(ids: string[]): Question[] {
  return ids.map((id) => ({
    id,
    text: `Question ${id}`,
    category: 'age' as const,
    options: [{ value: 4, label: 'Option A' }],
  }));
}

// ─── calculateProfile — Score Boundary Tests ──────────────────────────────────

describe('calculateProfile — score boundaries', () => {
  // ── Conservative (0–20) ──────────────────────────────────────────────────

  it('score = 0 → conservative', () => {
    const result = calculateProfile(makeAnswers([0]));
    expect(result.level).toBe('conservative');
    expect(result.score).toBe(0);
  });

  it('score = 10 → conservative (mid-range)', () => {
    // 5 answers × 2 = 10
    const result = calculateProfile(makeAnswers([2, 2, 2, 2, 2]));
    expect(result.level).toBe('conservative');
    expect(result.score).toBe(10);
  });

  it('score = 20 → conservative (upper boundary)', () => {
    // 4 answers × 4 + 1 × 4 = 20
    const result = calculateProfile(makeAnswers([4, 4, 4, 4, 4]));
    expect(result.level).toBe('conservative');
    expect(result.score).toBe(20);
  });

  // ── Moderately Conservative (21–40) ─────────────────────────────────────

  it('score = 21 → moderately_conservative (lower boundary)', () => {
    // 20 + 1
    const result = calculateProfile(makeAnswers([20, 1]));
    expect(result.level).toBe('moderately_conservative');
    expect(result.score).toBe(21);
  });

  it('score = 30 → moderately_conservative (mid-range)', () => {
    const result = calculateProfile(makeAnswers([6, 6, 6, 6, 6]));
    expect(result.level).toBe('moderately_conservative');
    expect(result.score).toBe(30);
  });

  it('score = 40 → moderately_conservative (upper boundary)', () => {
    const result = calculateProfile(makeAnswers([8, 8, 8, 8, 8]));
    expect(result.level).toBe('moderately_conservative');
    expect(result.score).toBe(40);
  });

  // ── Moderate (41–60) ─────────────────────────────────────────────────────

  it('score = 41 → moderate (lower boundary)', () => {
    const result = calculateProfile(makeAnswers([40, 1]));
    expect(result.level).toBe('moderate');
    expect(result.score).toBe(41);
  });

  it('score = 50 → moderate (mid-range)', () => {
    const result = calculateProfile(makeAnswers([10, 10, 10, 10, 10]));
    expect(result.level).toBe('moderate');
    expect(result.score).toBe(50);
  });

  it('score = 60 → moderate (upper boundary)', () => {
    const result = calculateProfile(makeAnswers([12, 12, 12, 12, 12]));
    expect(result.level).toBe('moderate');
    expect(result.score).toBe(60);
  });

  // ── Moderately Aggressive (61–80) ────────────────────────────────────────

  it('score = 61 → moderately_aggressive (lower boundary)', () => {
    const result = calculateProfile(makeAnswers([60, 1]));
    expect(result.level).toBe('moderately_aggressive');
    expect(result.score).toBe(61);
  });

  it('score = 70 → moderately_aggressive (mid-range)', () => {
    const result = calculateProfile(makeAnswers([14, 14, 14, 14, 14]));
    expect(result.level).toBe('moderately_aggressive');
    expect(result.score).toBe(70);
  });

  it('score = 80 → moderately_aggressive (upper boundary)', () => {
    const result = calculateProfile(makeAnswers([16, 16, 16, 16, 16]));
    expect(result.level).toBe('moderately_aggressive');
    expect(result.score).toBe(80);
  });

  // ── Aggressive (81–100) ──────────────────────────────────────────────────

  it('score = 81 → aggressive (lower boundary)', () => {
    const result = calculateProfile(makeAnswers([80, 1]));
    expect(result.level).toBe('aggressive');
    expect(result.score).toBe(81);
  });

  it('score = 90 → aggressive (mid-range)', () => {
    const result = calculateProfile(makeAnswers([18, 18, 18, 18, 18]));
    expect(result.level).toBe('aggressive');
    expect(result.score).toBe(90);
  });

  it('score = 100 → aggressive (upper boundary)', () => {
    const result = calculateProfile(makeAnswers([20, 20, 20, 20, 20]));
    expect(result.level).toBe('aggressive');
    expect(result.score).toBe(100);
  });
});

// ─── calculateProfile — Return Structure ─────────────────────────────────────

describe('calculateProfile — return structure', () => {
  it('returns all required fields: level, score, label, description', () => {
    const result = calculateProfile(makeAnswers([12, 12, 12, 12, 12]));
    expect(result).toHaveProperty('level');
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('label');
    expect(result).toHaveProperty('description');
  });

  it('score in result matches sum of selectedValues', () => {
    const answers = makeAnswers([4, 8, 12, 16, 20]);
    const result = calculateProfile(answers);
    expect(result.score).toBe(60);
  });

  it('conservative label contains "Conservative"', () => {
    const result = calculateProfile(makeAnswers([4]));
    expect(result.label).toContain('Conservative');
  });

  it('aggressive label contains "Aggressive"', () => {
    const result = calculateProfile(makeAnswers([20, 20, 20, 20, 20]));
    expect(result.label).toContain('Aggressive');
  });

  it('description is a non-empty string', () => {
    const result = calculateProfile(makeAnswers([10, 10, 10]));
    expect(typeof result.description).toBe('string');
    expect(result.description.length).toBeGreaterThan(0);
  });
});

// ─── calculateProfile — Determinism ──────────────────────────────────────────

describe('calculateProfile — determinism', () => {
  it('same answers always produce the same profile', () => {
    const answers = makeAnswers([4, 8, 12, 16, 20]);
    const result1 = calculateProfile(answers);
    const result2 = calculateProfile(answers);
    expect(result1).toEqual(result2);
  });
});

// ─── calculateProfile — Empty / Single Answer ─────────────────────────────────

describe('calculateProfile — edge cases', () => {
  it('empty answers array → score 0 → conservative', () => {
    const result = calculateProfile([]);
    expect(result.level).toBe('conservative');
    expect(result.score).toBe(0);
  });

  it('single answer with score 20 → conservative', () => {
    const result = calculateProfile(makeAnswers([20]));
    expect(result.level).toBe('conservative');
  });

  it('single answer with score 21 → moderately_conservative', () => {
    const result = calculateProfile(makeAnswers([21]));
    expect(result.level).toBe('moderately_conservative');
  });
});

// ─── isQuestionnaireComplete ──────────────────────────────────────────────────

describe('isQuestionnaireComplete', () => {
  const questionIds = ['q-age', 'q-income', 'q-investment-period', 'q-experience', 'q-loss-tolerance'];
  const questions = makeQuestions(questionIds);

  // ── Complete cases ────────────────────────────────────────────────────────

  it('returns true when all 5 questions are answered', () => {
    const answers: QuestionnaireAnswer[] = questionIds.map((id) => ({
      questionId: id,
      selectedValue: 12,
    }));
    expect(isQuestionnaireComplete(answers, questions)).toBe(true);
  });

  it('returns true when answers array has extra entries beyond required questions', () => {
    const answers: QuestionnaireAnswer[] = [
      ...questionIds.map((id) => ({ questionId: id, selectedValue: 12 })),
      { questionId: 'q-extra', selectedValue: 4 },
    ];
    expect(isQuestionnaireComplete(answers, questions)).toBe(true);
  });

  // ── Incomplete cases ──────────────────────────────────────────────────────

  it('returns false when no answers provided', () => {
    expect(isQuestionnaireComplete([], questions)).toBe(false);
  });

  it('returns false when only 4 of 5 questions are answered (missing last)', () => {
    const answers: QuestionnaireAnswer[] = questionIds.slice(0, 4).map((id) => ({
      questionId: id,
      selectedValue: 12,
    }));
    expect(isQuestionnaireComplete(answers, questions)).toBe(false);
  });

  it('returns false when only 1 of 5 questions is answered', () => {
    const answers: QuestionnaireAnswer[] = [{ questionId: 'q-age', selectedValue: 8 }];
    expect(isQuestionnaireComplete(answers, questions)).toBe(false);
  });

  it('returns false when answers have wrong questionIds (none match)', () => {
    const answers: QuestionnaireAnswer[] = [
      { questionId: 'q-wrong-1', selectedValue: 8 },
      { questionId: 'q-wrong-2', selectedValue: 12 },
      { questionId: 'q-wrong-3', selectedValue: 16 },
      { questionId: 'q-wrong-4', selectedValue: 4 },
      { questionId: 'q-wrong-5', selectedValue: 20 },
    ];
    expect(isQuestionnaireComplete(answers, questions)).toBe(false);
  });

  it('returns false when one question id is missing from answers', () => {
    // Answer all except 'q-experience'
    const answers: QuestionnaireAnswer[] = questionIds
      .filter((id) => id !== 'q-experience')
      .map((id) => ({ questionId: id, selectedValue: 12 }));
    expect(isQuestionnaireComplete(answers, questions)).toBe(false);
  });

  // ── Edge cases ────────────────────────────────────────────────────────────

  it('returns true when questions array is empty (vacuously complete)', () => {
    expect(isQuestionnaireComplete([], [])).toBe(true);
  });

  it('returns true for a single question that is answered', () => {
    const singleQuestion = makeQuestions(['q-only']);
    const answers: QuestionnaireAnswer[] = [{ questionId: 'q-only', selectedValue: 8 }];
    expect(isQuestionnaireComplete(answers, singleQuestion)).toBe(true);
  });

  it('returns false for a single question that is not answered', () => {
    const singleQuestion = makeQuestions(['q-only']);
    expect(isQuestionnaireComplete([], singleQuestion)).toBe(false);
  });

  it('duplicate answers for the same question still counts as answered once', () => {
    // All 5 questions answered, but q-age answered twice
    const answers: QuestionnaireAnswer[] = [
      { questionId: 'q-age', selectedValue: 4 },
      { questionId: 'q-age', selectedValue: 8 }, // duplicate
      { questionId: 'q-income', selectedValue: 12 },
      { questionId: 'q-investment-period', selectedValue: 16 },
      { questionId: 'q-experience', selectedValue: 20 },
      { questionId: 'q-loss-tolerance', selectedValue: 4 },
    ];
    expect(isQuestionnaireComplete(answers, questions)).toBe(true);
  });
});
