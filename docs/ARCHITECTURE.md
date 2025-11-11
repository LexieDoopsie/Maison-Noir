# Maison Noir Architecture

## Overview

Maison Noir is a full-stack real-time communication platform built with a modern tech stack.

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Socket.IO Client**: Real-time communication
- **Axios**: HTTP client
- **React Markdown**: Markdown rendering

### Backend
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **Socket.IO**: WebSocket server
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Crypto**: Encryption utilities

## System Architecture

```
┌─────────────┐
│   Browser   │
│  (Next.js)  │
└──────┬──────┘
       │ HTTP/REST
       │ WebSocket
       │
┌──────▼──────────────────┐
│   Express Server         │
│  ┌────────────────────┐  │
│  │  REST API Routes   │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │  Socket.IO Server  │  │
│  └────────────────────┘  │
└──────┬───────────────────┘
       │
┌──────▼──────┐
│  MongoDB    │
└─────────────┘
```

## Data Flow

### Authentication Flow
1. User submits login/register form
2. Frontend sends credentials to `/api/auth/login` or `/api/auth/register`
3. Backend validates and creates/verifies user
4. JWT token returned and stored in localStorage
5. Token included in subsequent requests

### Real-time Messaging Flow
1. User connects via Socket.IO with JWT token
2. Server authenticates and establishes connection
3. User joins channel room: `socket.join('channel:channelId')`
4. User sends message: `socket.emit('message:send', { channelId, content })`
5. Server saves message to database
6. Server broadcasts to channel room: `io.to('channel:channelId').emit('message:new', message)`
7. All clients in room receive message

## Database Schema

### User
```typescript
{
  username: string
  email: string
  password: string (hashed)
  avatar?: string
  bio?: string
  isOnline: boolean
  lastSeen: Date
  servers: ObjectId[]
  friends: ObjectId[]
  blockedUsers: ObjectId[]
}
```

### Server
```typescript
{
  name: string
  description?: string
  icon?: string
  ownerId: ObjectId
  members: ObjectId[]
  channels: ObjectId[]
  inviteCode: string
  isPrivate: boolean
}
```

### Channel
```typescript
{
  serverId?: ObjectId
  name: string
  type: 'text' | 'voice' | 'dm'
  description?: string
  members?: ObjectId[]
  lastMessageAt?: Date
}
```

### Message
```typescript
{
  channelId: ObjectId
  serverId?: ObjectId
  userId: ObjectId
  content: string
  encrypted: boolean
  reactions: Array<{ emoji: string, users: ObjectId[] }>
  editedAt?: Date
  deletedAt?: Date
}
```

## Security

### Authentication
- JWT tokens with 7-day expiration
- Password hashing with bcrypt (10 rounds)
- Token validation on every protected route

### Encryption
- Basic AES-256-CBC encryption for messages (demo)
- Encryption key stored in environment variable
- In production, implement proper key management

### Authorization
- Server membership checks
- Channel access validation
- Message ownership verification

## Performance Considerations

### Frontend
- Next.js automatic code splitting
- Optimistic UI updates for messages
- Lazy loading for components
- Image optimization

### Backend
- MongoDB indexes on frequently queried fields
- Socket.IO room-based broadcasting (only to relevant clients)
- Connection pooling for MongoDB
- Rate limiting (to be implemented)

## Scalability

### Horizontal Scaling
- Stateless API design (JWT tokens)
- Socket.IO with Redis adapter for multi-server support
- MongoDB replica sets for read scaling

### Caching
- User session caching (Redis)
- Frequently accessed server/channel data
- Message pagination to limit data transfer

## Future Enhancements

1. **Redis Integration**: For session management and Socket.IO scaling
2. **CDN**: For static assets and media
3. **Message Queue**: For handling high-volume message processing
4. **Microservices**: Split into auth, messaging, and media services
5. **GraphQL**: Alternative API layer for flexible queries

