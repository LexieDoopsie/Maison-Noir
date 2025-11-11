// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  isOnline: boolean;
  lastSeen: Date;
}

export interface UserProfile extends User {
  servers: string[];
  friends: string[];
  blockedUsers: string[];
}

// Server Types
export interface Server {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  ownerId: string;
  members: string[];
  channels: string[];
  inviteCode: string;
  createdAt: Date;
  isPrivate: boolean;
}

// Channel Types
export interface Channel {
  _id: string;
  serverId: string;
  name: string;
  type: 'text' | 'voice' | 'dm';
  description?: string;
  members?: string[]; // For DM channels
  createdAt: Date;
  lastMessageAt?: Date;
}

// Message Types
export interface Message {
  _id: string;
  channelId: string;
  serverId?: string;
  userId: string;
  content: string;
  encrypted?: boolean;
  reactions: MessageReaction[];
  editedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  user?: User;
}

export interface MessageReaction {
  emoji: string;
  users: string[];
}

// Invite Types
export interface Invite {
  _id: string;
  serverId: string;
  code: string;
  createdBy: string;
  expiresAt?: Date;
  maxUses?: number;
  uses: number;
  createdAt: Date;
}

// Socket Event Types
export interface SocketEvents {
  // Client to Server
  'message:send': { channelId: string; content: string };
  'message:react': { messageId: string; emoji: string };
  'message:delete': { messageId: string };
  'typing:start': { channelId: string };
  'typing:stop': { channelId: string };
  'user:join': { serverId: string };
  'user:leave': { serverId: string };
  
  // Server to Client
  'message:new': Message;
  'message:updated': Message;
  'message:deleted': { messageId: string; channelId: string };
  'typing:update': { channelId: string; userId: string; username: string };
  'user:online': { userId: string };
  'user:offline': { userId: string };
  'error': { message: string };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

