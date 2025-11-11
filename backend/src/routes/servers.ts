import express, { Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import Server from '../models/Server.js';
import Channel from '../models/Channel.js';
import { generateInviteCode } from '../utils/generateInviteCode.js';

const router = express.Router();

// Get all servers for user
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const servers = await Server.find({
      members: req.userId,
    }).select('-__v');

    res.json({
      success: true,
      data: servers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch servers',
    });
  }
});

// Get single server
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const server = await Server.findById(req.params.id)
      .populate('ownerId', 'username avatar')
      .populate('members', 'username avatar isOnline');

    if (!server) {
      return res.status(404).json({
        success: false,
        error: 'Server not found',
      });
    }

    if (!server.members.some((m: any) => m._id.toString() === req.userId)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
      });
    }

    res.json({
      success: true,
      data: server,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch server',
    });
  }
});

// Create server
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, isPrivate } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Server name is required',
      });
    }

    let inviteCode = generateInviteCode();
    let existing = await Server.findOne({ inviteCode });
    while (existing) {
      inviteCode = generateInviteCode();
      existing = await Server.findOne({ inviteCode });
    }

    const server = new Server({
      name,
      description,
      ownerId: req.userId,
      members: [req.userId],
      inviteCode,
      isPrivate: isPrivate || false,
    });

    // Create default general channel
    const generalChannel = new Channel({
      serverId: server._id,
      name: 'general',
      type: 'text',
    });

    await generalChannel.save();
    server.channels.push(generalChannel._id);
    await server.save();

    res.status(201).json({
      success: true,
      data: server,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create server',
    });
  }
});

// Join server by invite code
router.post('/join/:code', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const server = await Server.findOne({ inviteCode: req.params.code });

    if (!server) {
      return res.status(404).json({
        success: false,
        error: 'Invalid invite code',
      });
    }

    if (server.members.includes(req.userId as any)) {
      return res.status(400).json({
        success: false,
        error: 'Already a member',
      });
    }

    server.members.push(req.userId as any);
    await server.save();

    res.json({
      success: true,
      data: server,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to join server',
    });
  }
});

export default router;

