import express, { Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import Channel from '../models/Channel.js';
import Server from '../models/Server.js';

const router = express.Router();

// Get channels for a server
router.get('/server/:serverId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const server = await Server.findById(req.params.serverId);

    if (!server) {
      return res.status(404).json({
        success: false,
        error: 'Server not found',
      });
    }

    if (!server.members.includes(req.userId as any)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
      });
    }

    const channels = await Channel.find({
      serverId: req.params.serverId,
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      data: channels,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch channels',
    });
  }
});

// Create channel
router.post('/server/:serverId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, type, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Channel name is required',
      });
    }

    const server = await Server.findById(req.params.serverId);

    if (!server) {
      return res.status(404).json({
        success: false,
        error: 'Server not found',
      });
    }

    if (server.ownerId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        error: 'Only server owner can create channels',
      });
    }

    const channel = new Channel({
      serverId: req.params.serverId,
      name,
      type: type || 'text',
      description,
    });

    await channel.save();
    server.channels.push(channel._id);
    await server.save();

    res.status(201).json({
      success: true,
      data: channel,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create channel',
    });
  }
});

export default router;

