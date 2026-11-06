import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeNarrationText, CURATED_VOICES } from './audioEngine.ts';

test('normalizeNarrationText cleans formatting and expands abbreviations for clear speech', () => {
  const input = 'Built ca. 14th century, this facade rises 45m above the plaza. Notice the **marble pillars**—they were carved in the 18th century.';
  const output = normalizeNarrationText(input);

  assert.ok(!output.includes('ca.'));
  assert.ok(output.includes('circa'));
  assert.ok(!output.includes('**'));
  assert.ok(output.includes('fourteenth century'));
  assert.ok(output.includes('45 meters'));
  assert.ok(output.includes('eighteenth century'));
  assert.ok(!output.includes('—')); // em-dash replaced with comma
});

test('CURATED_VOICES includes high clarity professional voices', () => {
  assert.ok(CURATED_VOICES.length >= 4);
  const voiceIds = CURATED_VOICES.map(v => v.id);
  assert.ok(voiceIds.includes('serena'));
  assert.ok(voiceIds.includes('david'));
  assert.ok(voiceIds.includes('aria'));
  assert.ok(voiceIds.includes('julian'));

  const serena = CURATED_VOICES.find(v => v.id === 'serena')!;
  assert.equal(serena.gender, 'female');
  assert.ok(serena.rate <= 1.0); // professional, unhurried pacing
});
