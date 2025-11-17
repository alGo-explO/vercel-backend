import { Router } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../prismaClient.js';
import { signToken } from '../utils/jwt.js';
import { requireAuth } from '../middleware/auth.js';

const authRouter = Router();
const SALT_ROUNDS = 10;

authRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true, createdAt: true },
    });

    const token = signToken({ sub: user.id, email: user.email });
    return res.status(201).json({ user, token });
  } catch (error) {
    console.error('Signup error', error);
    return res.status(500).json({ message: 'Failed to create user' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ sub: user.id, email: user.email });
    return res.json({
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
      token,
    });
  } catch (error) {
    console.error('Login error', error);
    return res.status(500).json({ message: 'Failed to login' });
  }
});

authRouter.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: { id: true, email: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Profile error', error);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

export { authRouter };

