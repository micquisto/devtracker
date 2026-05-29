// backend/src/server.ts

// WHY import instead of require()?
// TypeScript uses ES6 import syntax — cleaner and type-safe
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create Express app
// WHY Application type? TypeScript needs to know what type 'app' is
const app: Application = express();

// ─── MIDDLEWARE ───────────────────────────────────────────
// WHY cors()? Allows React (port 5173) to call this server (port 5000)
app.use(cors());

// WHY express.json()? Parses incoming JSON request bodies
app.use(express.json());

// ─── ROUTES ───────────────────────────────────────────────
// WHY Request, Response types? TypeScript gives us autocomplete & safety
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🚀 MERN TypeScript Backend is running!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Test route with URL parameter
// WHY params type annotation? Ensures 'name' is always a string
app.get('/hello/:name', (req: Request, res: Response) => {
  // TypeScript knows req.params.name is a string ✅
  const name: string = req.params.name;
  
  res.json({
    message: `Hello, ${name}! Welcome to TypeScript MERN! 🎉`
  });
});

// ─── ERROR HANDLING MIDDLEWARE ────────────────────────────
// WHY 4 parameters? Express identifies error handlers by having 4 params
// This catches ANY unhandled errors in your app
app.use((err: Error, req: Request, res: Response) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : '❌ Something went wrong'
  });
});

// ─── START SERVER ─────────────────────────────────────────
const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
});
