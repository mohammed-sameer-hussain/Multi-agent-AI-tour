import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'echoguide-dev-secret-key-super-secure-2026';
const TOKEN_EXPIRY = '7d';

export interface StoredUser extends User {
  passwordHash: string;
}

// In-memory persistent database for users in runtime
const usersDatabase: Map<string, StoredUser> = new Map();

// Initialize default demo users
export async function initDefaultUsers() {
  if (usersDatabase.size === 0) {
    const demoPasswordHash1 = await bcrypt.hash('explorer123!', 10);
    const demoPasswordHash2 = await bcrypt.hash('traveler123!', 10);

    const demoUser1: StoredUser = {
      id: 'usr-demo-1',
      email: 'explorer@echoguide.ai',
      name: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      savedTourIds: ['tour-barcelona-gothic', 'tour-kyoto-ancient'],
      createdAt: new Date().toISOString(),
      passwordHash: demoPasswordHash1,
    };

    const demoUser2: StoredUser = {
      id: 'usr-demo-2',
      email: 'traveler@echoguide.ai',
      name: 'Marcus Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      savedTourIds: ['tour-florence-renaissance'],
      createdAt: new Date().toISOString(),
      passwordHash: demoPasswordHash2,
    };

    usersDatabase.set(demoUser1.email.toLowerCase(), demoUser1);
    usersDatabase.set(demoUser2.email.toLowerCase(), demoUser2);
  }
}

// Ensure default users exist
initDefaultUsers();

export function sanitizeUser(stored: StoredUser): User {
  const { passwordHash: _, ...user } = stored;
  return user;
}

export async function registerUser(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
  await initDefaultUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Please provide a valid email address.');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (usersDatabase.has(normalizedEmail)) {
    throw new Error('An account with this email already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: StoredUser = {
    id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    email: normalizedEmail,
    name: name.trim() || normalizedEmail.split('@')[0],
    savedTourIds: [],
    createdAt: new Date().toISOString(),
    passwordHash,
  };

  usersDatabase.set(normalizedEmail, newUser);
  const token = createToken(newUser);

  return {
    user: sanitizeUser(newUser),
    token,
  };
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  await initDefaultUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const stored = usersDatabase.get(normalizedEmail);

  if (!stored) {
    throw new Error('Invalid email or password.');
  }

  const isValid = await bcrypt.compare(password, stored.passwordHash);
  if (!isValid) {
    throw new Error('Invalid email or password.');
  }

  const token = createToken(stored);
  return {
    user: sanitizeUser(stored),
    token,
  };
}

export function createToken(user: Pick<User, 'id' | 'email' | 'name'>): string {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

export function verifyToken(token: string): { sub: string; email: string; name: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; email: string; name: string };
    return decoded;
  } catch {
    return null;
  }
}

export function getUserById(userId: string): User | null {
  for (const stored of usersDatabase.values()) {
    if (stored.id === userId) {
      return sanitizeUser(stored);
    }
  }
  return null;
}

export function getUserByEmail(email: string): User | null {
  const stored = usersDatabase.get(email.trim().toLowerCase());
  return stored ? sanitizeUser(stored) : null;
}

export function toggleSaveTourForUser(userId: string, tourId: string): string[] {
  for (const stored of usersDatabase.values()) {
    if (stored.id === userId) {
      const idx = stored.savedTourIds.indexOf(tourId);
      if (idx >= 0) {
        stored.savedTourIds.splice(idx, 1);
      } else {
        stored.savedTourIds.push(tourId);
      }
      return [...stored.savedTourIds];
    }
  }
  return [];
}
