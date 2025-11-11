import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Message from '../models/Message.js';
import Channel from '../models/Channel.js';
import ServerModel from '../models/Server.js';

const JWT_SECRET = process.env.JWT_SECRET || 'maison-noir-secret-key-change-in-production';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  user?: any;
}

export const setupSocketIO = (io: Server) => {
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = decoded.userId;
      socket.user = user;

      // Update user online status
      user.isOnline = true;
      user.lastSeen = new Date();
      await user.save();

      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`✅ User connected: ${socket.user?.username}`);

    // Join channel
    socket.on('join:channel', async ({ channelId }: { channelId: string }) => {
      try {
        const channel = await Channel.findById(channelId);
        if (channel) {
          socket.join(`channel:${channelId}`);
          console.log(`User ${socket.user?.username} joined channel ${channelId}`);
        }
      } catch (error) {
        console.error('Error joining channel:', error);
      }
    });

    // Leave channel
    socket.on('leave:channel', ({ channelId }: { channelId: string }) => {
      socket.leave(`channel:${channelId}`);
    });

    // Send message
    socket.on('message:send', async ({ channelId, content }: { channelId: string; content: string }) => {
      try {
        if (!content.trim()) return;

        const channel = await Channel.findById(channelId);
        if (!channel) {
          socket.emit('error', { message: 'Channel not found' });
          return;
        }

        // Check access
        if (channel.serverId) {
          const server = await ServerModel.findById(channel.serverId);
          if (server && !server.members.includes(socket.userId as any)) {
            socket.emit('error', { message: 'Access denied' });
            return;
          }
        }

        const message = new Message({
          channelId,
          serverId: channel.serverId,
          userId: socket.userId,
          content: content.trim(),
        });

        await message.save();
        await message.populate('userId', 'username avatar');

        // Update channel last message time
        channel.lastMessageAt = new Date();
        await channel.save();

        // Broadcast to channel
        io.to(`channel:${channelId}`).emit('message:new', {
          ...message.toObject(),
          channelId: message.channelId.toString(),
        });
      } catch (error: any) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: error.message || 'Failed to send message' });
      }
    });

    // Typing indicators
    const typingUsers = new Map<string, Set<string>>();

    socket.on('typing:start', ({ channelId }: { channelId: string }) => {
      if (!typingUsers.has(channelId)) {
        typingUsers.set(channelId, new Set());
      }
      typingUsers.get(channelId)!.add(socket.userId!);

      socket.to(`channel:${channelId}`).emit('typing:update', {
        channelId,
        userId: socket.userId,
        username: socket.user?.username,
      });
    });

    socket.on('typing:stop', ({ channelId }: { channelId: string }) => {
      typingUsers.get(channelId)?.delete(socket.userId!);
    });

    // Message reaction
    socket.on('message:react', async ({ messageId, emoji }: { messageId: string; emoji: string }) => {
      try {
        const message = await Message.findById(messageId);
        if (!message) return;

        const reactionIndex = message.reactions.findIndex((r) => r.emoji === emoji);
        if (reactionIndex >= 0) {
          const reaction = message.reactions[reactionIndex];
          if (reaction.users.includes(socket.userId as any)) {
            // Remove reaction
            reaction.users = reaction.users.filter(
              (id) => id.toString() !== socket.userId
            );
            if (reaction.users.length === 0) {
              message.reactions.splice(reactionIndex, 1);
            }
          } else {
            // Add reaction
            reaction.users.push(socket.userId as any);
          }
        } else {
          // New reaction
          message.reactions.push({
            emoji,
            users: [socket.userId as any],
          });
        }

        await message.save();
        io.to(`channel:${message.channelId}`).emit('message:updated', message);
      } catch (error) {
        console.error('Error reacting to message:', error);
      }
    });

    // Disconnect
    socket.on('disconnect', async () => {
      console.log(`❌ User disconnected: ${socket.user?.username}`);
      
      if (socket.userId) {
        const user = await User.findById(socket.userId);
        if (user) {
          user.isOnline = false;
          user.lastSeen = new Date();
          await user.save();
        }
      }
    });
  });
};

