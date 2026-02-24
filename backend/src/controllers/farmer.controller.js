const prisma = require('../lib/prisma.js');
const axios = require('axios');

const submitPaddy = async (req, res) => {
    const { cropType, quantityKg, moisture, harvestDate, latitude, longitude } = req.body;
    const farmer = await prisma.farmer.findUnique({ where: { userId: req.user.id } });

    if (!farmer) {
        return res.status(404).json({ message: 'Farmer profile not found' });
    }

    try {
        // 1. Call AI Service for Fraud and Yield
        const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/detect-fraud`, {
            farmer_id: farmer.id,
            quantity: parseFloat(quantityKg),
            moisture: parseFloat(moisture),
            historical_avg_quantity: 1000 // Mock historical data
        });

        const yieldResponse = await axios.post(`${process.env.AI_SERVICE_URL}/predict-yield`, {
            land_area: farmer.landArea
        });

        const submission = await prisma.paddySubmission.create({
            data: {
                farmerId: farmer.id,
                cropType,
                quantityKg: parseFloat(quantityKg),
                moisture: parseFloat(moisture),
                harvestDate: new Date(harvestDate),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                riskScore: aiResponse.data.risk_score,
                status: aiResponse.data.is_fraud ? 'REJECTED' : 'PENDING'
            }
        });

        // If fraud detected, log it
        if (aiResponse.data.is_fraud) {
            await prisma.fraudFlag.create({
                data: {
                    submissionId: submission.id,
                    reason: aiResponse.data.fraud_reasons.join(', '),
                    severity: 'HIGH'
                }
            });
        }

        res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing submission' });
    }
};

const getFarmerSubmissions = async (req, res) => {
    const farmer = await prisma.farmer.findUnique({ where: { userId: req.user.id } });

    const submissions = await prisma.paddySubmission.findMany({
        where: { farmerId: farmer.id },
        orderBy: { createdAt: 'desc' }
    });

    res.json(submissions);
};

module.exports = { submitPaddy, getFarmerSubmissions };
