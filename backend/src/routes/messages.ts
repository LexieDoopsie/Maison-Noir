import express, { Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import Message from '../models/Message.js';
import Channel from '../models/Channel.js';
import Server from '../models/Server.js';

const router = express.Router();

// Get messages for a channel
router.get('/channel/:channelId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 50, before } = req.query;

    const channel = await Channel.findById(req.params.channelId);

    if (!channel) {
      return res.status(404).json({
        success: false,
        error: 'Channel not found',
      });
    }

    // Check access
    if (channel.serverId) {
      const server = await Server.findById(channel.serverId);
      if (server && !server.members.includes(req.userId as any)) {
        return res.status(403).json({
          success: false,
          error: 'Access denied',
        });
      }
    }

    const query: any = {
      channelId: req.params.channelId,
      deletedAt: { $exists: false },
    };

    if (before) {
      query.createdAt = { $lt: new Date(before as string) };
    }

    const messages = await Message.find(query)
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean();

    // Update last message time
    if (messages.length > 0) {
      channel.lastMessageAt = new Date();
      await channel.save();
    }

    res.json({
      success: true,
      data: messages.reverse(),
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch messages',
    });
  }
});

// Delete message
router.delete('/:messageId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found',
      });
    }

    // Check if user is owner or server admin
    if (message.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized',
      });
    }

    message.deletedAt = new Date();
    await message.save();

    res.json({
      success: true,
      message: 'Message deleted',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete message',
    });
  }
});

export default router;

