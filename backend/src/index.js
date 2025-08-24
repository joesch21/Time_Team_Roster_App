import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import rosterRoutes from './routes/roster.js';
import timesheetRoutes from './routes/timesheet.js';
import swapsRoutes from './routes/swaps.js';
import relayRoutes from './routes/relay.js';

// Initialize the Express application.  We enable CORS so that the
// frontend (served from a different port) can call our API during
// development.  JSON bodies are automatically parsed.
const app = express();
app.use(cors());
app.use(express.json());

// Mount API routes.  Each route file exports an Express router.
app.use('/auth', authRoutes);
app.use('/roster', rosterRoutes);
app.use('/timesheet', timesheetRoutes);
app.use('/swaps', swapsRoutes);
app.use('/relay', relayRoutes);

// Default route to verify server is running.
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Roster backend listening on port ${port}`);
});