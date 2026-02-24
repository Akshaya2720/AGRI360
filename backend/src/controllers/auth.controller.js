const prisma = require('../lib/prisma.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const signup = async (req, res) => {
    const { name, email, mobile, password, role, farmerData, officerData } = req.body;

    try {
        const userExists = await prisma.user.findFirst({
            where: { OR: [{ email }, { mobile }] }
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                mobile,
                password: hashedPassword,
                role,
                ...(role === 'FARMER' && {
                    farmer: {
                        create: {
                            aadhaarMasked: farmerData.aadhaarMasked,
                            landArea: parseFloat(farmerData.landArea),
                            village: farmerData.village,
                            taluk: farmerData.taluk,
                            bankAccount: farmerData.bankAccount,
                            upiId: farmerData.upiId
                        }
                    }
                }),
                ...(role !== 'FARMER' && role !== 'BANK_OFFICER' && {
                    officer: {
                        create: {
                            departmentCode: officerData.departmentCode,
                            officialId: officerData.officialId
                        }
                    }
                })
            },
            include: { farmer: true, officer: true }
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = { signup, login };
