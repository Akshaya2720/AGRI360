console.log('Agri-Escrow 360 Backend: Initializing...');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'Agri-Escrow 360 Backend' });
});

// Import routes
const authRoutes = require('./routes/auth.routes.js');
const farmerRoutes = require('./routes/farmer.routes.js');
const officerRoutes = require('./routes/officer.routes.js');

app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/officer', officerRoutes);

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
