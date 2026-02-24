const prisma = require('../lib/prisma.js');

const getPendingSubmissions = async (req, res) => {
    const submissions = await prisma.paddySubmission.findMany({
        where: { status: 'PENDING' },
        include: { farmer: { include: { user: true } } },
        orderBy: { createdAt: 'desc' }
    });
    res.json(submissions);
};

const approveSubmission = async (req, res) => {
    const { id } = req.params;

    try {
        const submission = await prisma.paddySubmission.findUnique({
            where: { id },
            include: { farmer: true }
        });

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        // 1. Update Status
        const updatedSubmission = await prisma.paddySubmission.update({
            where: { id },
            data: { status: 'APPROVED' }
        });

        // 2. Trigger Escrow Simulation
        // In a real system, this would call a banking API or smart contract
        const mspPricePerKg = 28.20; // Example MSP
        const totalAmount = submission.quantityKg * mspPricePerKg;

        const transaction = await prisma.escrowTransaction.create({
            data: {
                submissionId: id,
                amount: totalAmount,
                transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                status: 'COMPLETED'
            }
        });

        // 3. Update status to Escrow Triggered
        await prisma.paddySubmission.update({
            where: { id },
            data: { status: 'ESCROW_TRIGGERED' }
        });

        // 4. Audit Log
        await prisma.auditLog.create({
            data: {
                userId: req.user.id,
                action: 'APPROVE_SUBMISSION',
                metadata: { submissionId: id, amount: totalAmount, txnId: transaction.transactionId }
            }
        });

        res.json({ message: 'Submission approved and escrow triggered', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error approving submission' });
    }
};

module.exports = { getPendingSubmissions, approveSubmission };
