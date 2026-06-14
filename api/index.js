
// This file bridges Vercel serverless functions to the Express app.
import * as server from '../dist/server.cjs';

console.log("Vercel function initialized");

// Vercel expects the default export to be the handler
export default (req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  const app = server.app || server.default || server;
  return app(req, res);
};
