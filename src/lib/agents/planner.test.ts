import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimeAllocation, calculateWordBudget, formatDuration, WORDS_PER_MINUTE } from './planner.ts';

test('calculateTimeAllocation reserves intro and conclusion', () => {
  const allocation15 = calculateTimeAllocation(15, ['History', 'Architecture']);
  assert.equal(allocation15.introduction, 1.0);
  assert.equal(allocation15.conclusion, 1.0);
  assert.ok(allocation15.history > 0);
  assert.ok(allocation15.architecture > 0);
  assert.equal(allocation15.culinary, 0);
  assert.equal(allocation15.culture, 0);

  // Total allocated should be close to 15
  const sum = allocation15.introduction + allocation15.conclusion + allocation15.history + allocation15.architecture;
  assert.ok(Math.abs(sum - 15) < 0.5);
});

test('calculateWordBudget adheres to 150 words per minute', () => {
  const budget = calculateWordBudget(10, ['Culinary']);
  assert.equal(budget.totalWords, 1500);
  assert.equal(budget.wordsPerMinute, WORDS_PER_MINUTE);
  assert.ok(budget.sectionWords.culinary > 0);
  assert.ok(budget.sectionWords.introduction > 0);
  assert.ok(budget.sectionWords.conclusion > 0);
});

test('formatDuration formats times cleanly', () => {
  assert.equal(formatDuration(15), '15 min');
  assert.equal(formatDuration(60), '1h');
  assert.equal(formatDuration(75), '1h 15m');
});
