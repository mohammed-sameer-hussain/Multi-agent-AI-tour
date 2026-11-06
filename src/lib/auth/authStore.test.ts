import test from 'node:test';
import assert from 'node:assert/strict';
import { registerUser, loginUser, verifyToken, toggleSaveTourForUser, initDefaultUsers } from './authStore.ts';

test('auth registration and login lifecycle', async () => {
  await initDefaultUsers();

  // Test registration
  const email = `traveler_${Date.now()}@example.com`;
  const { user, token } = await registerUser(email, 'secretPass123!', 'Traveler Dave');

  assert.equal(user.email, email);
  assert.equal(user.name, 'Traveler Dave');
  assert.ok(token.length > 20);

  // Test token validation
  const payload = verifyToken(token);
  assert.ok(payload);
  assert.equal(payload.email, email);

  // Test login with correct password
  const loggedIn = await loginUser(email, 'secretPass123!');
  assert.equal(loggedIn.user.id, user.id);

  // Test login with wrong password
  await assert.rejects(
    async () => {
      await loginUser(email, 'wrongpass');
    },
    { message: 'Invalid email or password.' }
  );

  // Test toggle save tour
  const saved = toggleSaveTourForUser(user.id, 'tour-xyz');
  assert.ok(saved.includes('tour-xyz'));
  const unsaved = toggleSaveTourForUser(user.id, 'tour-xyz');
  assert.ok(!unsaved.includes('tour-xyz'));
});

test('login with demo user credentials works', async () => {
  await initDefaultUsers();
  const res = await loginUser('explorer@echoguide.ai', 'explorer123!');
  assert.equal(res.user.name, 'Elena Rostova');
  assert.ok(res.token);
});
