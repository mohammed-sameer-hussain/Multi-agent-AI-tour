import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  registerUser, 
  loginUser, 
  verifyToken, 
  getUserById, 
  toggleSaveTourForUser, 
  initDefaultUsers 
} from './src/lib/auth/authStore.ts';
import { SAMPLE_TOURS } from './src/lib/tours/sampleTours.ts';
import { generateTourWithAgents } from './src/lib/tours/tourGenerator.ts';
import { Tour, AgentStepStatus } from './src/lib/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Initialize demo users
initDefaultUsers();

// In-memory tour storage seeded with samples
const toursStore: Map<string, Tour> = new Map();
SAMPLE_TOURS.forEach(tour => toursStore.set(tour.id, tour));

// Auth Middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  (req as any).user = decoded;
  next();
}

function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : req.cookies?.token;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      (req as any).user = decoded;
    }
  }
  next();
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await registerUser(email, password, name);
    res.cookie('token', result.token, { httpOnly: true, secure: isProduction, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.cookie('token', result.token, { httpOnly: true, secure: isProduction, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message || 'Login failed' });
  }
});

app.get('/api/auth/me', optionalAuth, (req, res) => {
  const userPayload = (req as any).user;
  if (!userPayload) {
    return res.status(200).json({ user: null });
  }
  const user = getUserById(userPayload.sub);
  if (!user) {
    return res.status(200).json({ user: null });
  }
  res.json({ user });
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

app.post('/api/auth/toggle-save', requireAuth, (req, res) => {
  const userPayload = (req as any).user;
  const { tourId } = req.body;
  if (!tourId) {
    return res.status(400).json({ error: 'tourId is required' });
  }
  const savedTourIds = toggleSaveTourForUser(userPayload.sub, tourId);
  res.json({ savedTourIds });
});

// Tour Endpoints
app.get('/api/tours', (_req, res) => {
  const tours = Array.from(toursStore.values()).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json({ tours });
});

app.get('/api/tours/:id', (req, res) => {
  const tour = toursStore.get(req.params.id);
  if (!tour) {
    return res.status(404).json({ error: 'Tour not found' });
  }
  res.json({ tour });
});

app.post('/api/tours/generate', optionalAuth, async (req, res) => {
  try {
    const { location, interests, durationMinutes, voiceStyle } = req.body;

    if (!location || typeof location !== 'string' || location.trim().length === 0) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const userPayload = (req as any).user;
    const progressLogs: AgentStepStatus[] = [];

    const tour = await generateTourWithAgents({
      location: location.trim(),
      interests: Array.isArray(interests) && interests.length > 0 ? interests : ['History', 'Architecture'],
      durationMinutes: Number(durationMinutes) || 15,
      voiceStyle: voiceStyle || 'Friendly & Casual',
      userId: userPayload?.sub,
      apiKey: process.env.GEMINI_API_KEY,
      onStepProgress: (step) => {
        progressLogs.push(step);
      }
    });

    // Save into store
    toursStore.set(tour.id, tour);

    res.json({
      tour,
      agentSteps: progressLogs,
    });
  } catch (error: any) {
    console.error('Error generating tour:', error);
    res.status(500).json({ error: error.message || 'Failed to generate tour' });
  }
});

app.post('/api/tours/save', optionalAuth, (req, res) => {
  const tour = req.body as Tour;
  if (!tour || !tour.id) {
    return res.status(400).json({ error: 'Valid tour data is required' });
  }
  toursStore.set(tour.id, tour);
  res.json({ success: true, tour });
});

// ----------------------------------------------------
// VITE DEV SERVER OR STATIC ASSETS
// ----------------------------------------------------
async function startServer() {
  if (!isProduction) {
    // Dynamic import of Vite in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[EchoGuide Server] Listening on http://0.0.0.0:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
