// In-memory mock database for Agri-Escrow 360 Demonstration
const users = [];
const farmers = [];
const submissions = [];
const transactions = [];
const auditLogs = [];

const prismaMock = {
    user: {
        findUnique: async ({ where }) => users.find(u => u.id === where.id || u.email === where.email),
        findFirst: async ({ where }) => users.find(u => u.email === where.OR?.[0]?.email || u.mobile === where.OR?.[1]?.mobile),
        create: async ({ data, include }) => {
            const user = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() };
            users.push(user);
            if (data.farmer) {
                const farmer = { ...data.farmer.create, id: 'F-' + user.id, userId: user.id };
                farmers.push(farmer);
                user.farmer = farmer;
            }
            return user;
        }
    },
    farmer: {
        findUnique: async ({ where }) => farmers.find(f => f.userId === where.userId || f.id === where.id),
    },
    paddySubmission: {
        create: async ({ data }) => {
            const sub = { ...data, id: 'SUB-' + Math.random().toString(36).substr(2, 9), createdAt: new Date() };
            submissions.push(sub);
            return sub;
        },
        findMany: async ({ where }) => submissions.filter(s => !where || s.farmerId === where.farmerId || s.status === where.status),
        findUnique: async ({ where }) => submissions.find(s => s.id === where.id),
        update: async ({ where, data }) => {
            const sub = submissions.find(s => s.id === where.id);
            if (sub) Object.assign(sub, data);
            return sub;
        }
    },
    escrowTransaction: {
        create: async ({ data }) => {
            const txn = { ...data, id: 'TXN-' + Math.random().toString(36).substr(2, 9), createdAt: new Date() };
            transactions.push(txn);
            return txn;
        }
    },
    auditLog: {
        create: async ({ data }) => {
            const log = { ...data, id: 'LOG-' + Math.random().toString(36).substr(2, 9), createdAt: new Date() };
            auditLogs.push(log);
            return log;
        }
    },
    fraudFlag: {
        create: async ({ data }) => ({ ...data, id: 'FRAUD-' + Math.random().toString(36).substr(2, 9) })
    }
};

module.exports = prismaMock;
