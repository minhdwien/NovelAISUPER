
// This file bridges Vercel serverless functions to the Express app.
import app from '../server.ts';

// Vercel expects the default export to be the handler
export default app;
