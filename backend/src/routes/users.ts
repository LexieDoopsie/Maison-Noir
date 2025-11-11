import express, { Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get current user profile
router.get('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch profile',
    });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { username, bio, avatar } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    if (username && username !== user.username) {
      const existing = await User.findOne({ username });
      if (existing) {
        return res.status(400).json({
          success: false,
          error: 'Username already taken',
        });
      }
      user.username = username;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (avatar) {
      user.avatar = avatar;
    }

    await user.save();

    const userResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      createdAt: user.createdAt,
      isOnline: user.isOnline,
    };

    res.json({
      success: true,
      data: userResponse,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update profile',
    });
  }
});

export default router;

