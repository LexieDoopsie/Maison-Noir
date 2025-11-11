# 🖤 Maison Noir

A mysterious, elegant, and secure communication platform inspired by Discord. Maison Noir provides a sleek, dark-themed, and exclusive digital salon for secure communication and collaboration.

## ✨ Features

- **Real-time Chat**: Instant messaging with Socket.IO
- **Server & Channel System**: Create and join servers with multiple channels
- **Private DMs**: Direct messaging between users
- **Message Reactions**: React to messages with emojis
- **Maison Codes**: Invite-only links to join private servers
- **Dark Theme**: Beautiful noir aesthetic with gold accents
- **User Profiles**: Customizable avatars and bios
- **End-to-End Encryption**: Basic AES encryption for messages (demo)
- **Moderation Tools**: Delete messages and manage servers

## 🏗️ Architecture

This is a monorepo containing:

- **Frontend**: Next.js 14 (App Router) with TypeScript, TailwindCSS, and Framer Motion
- **Backend**: Express.js with MongoDB, Socket.IO, and JWT authentication
- **Shared**: TypeScript types and interfaces

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- MongoDB (local or MongoDB Atlas)
- Git

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Environment Setup

#### Backend Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maison-noir
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ENCRYPTION_KEY=your-32-byte-hex-encryption-key-change-this-in-production
```

**Important**: Generate secure keys for production:
- `JWT_SECRET`: A long random string
- `ENCRYPTION_KEY`: A 32-byte hex string (64 characters)

#### Frontend Environment Variables

Create `frontend/.env.local` (optional, defaults work for development):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### 4. Run the Application

```bash
# Start both frontend and backend concurrently
npm run dev

# Or run separately:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:5000
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
maison-noir/
├── frontend/              # Next.js frontend application
│   ├── app/              # App Router pages
│   │   ├── login/        # Login/Register page
│   │   ├── app/          # Main app layout
│   │   ├── profile/      # User profile page
│   │   └── settings/     # Settings page
│   ├── components/       # React components
│   │   ├── auth/         # Authentication forms
│   │   └── app/          # App components (sidebar, chat, etc.)
│   └── public/           # Static assets
├── backend/              # Express backend server
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── socket/       # Socket.IO handlers
│   │   ├── middleware/   # Express middleware
│   │   └── utils/        # Utility functions
│   └── dist/             # Compiled TypeScript
├── shared/               # Shared TypeScript types
│   └── types/           # Type definitions
└── docs/                # Documentation
```

## 🔐 Authentication

The app uses JWT-based authentication:

1. Register a new account or login
2. JWT token is stored in `localStorage`
3. Token is sent with each API request via `Authorization: Bearer <token>` header
4. Socket.IO connections authenticate using the token

## 🎨 Customization

### Theme Colors

Edit `frontend/tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  noir: { /* dark grays */ },
  gold: { /* gold accents */ },
  violet: { /* deep purple */ },
}
```

### Logo and Favicon

Replace `frontend/public/favicon.ico` with your custom "MN" logo.

## 🧪 Testing

```bash
# Run backend tests (when implemented)
cd backend
npm test
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Servers
- `GET /api/servers` - Get user's servers
- `GET /api/servers/:id` - Get server details
- `POST /api/servers` - Create new server
- `POST /api/servers/join/:code` - Join server by invite code

### Channels
- `GET /api/channels/server/:serverId` - Get channels for server
- `POST /api/channels/server/:serverId` - Create channel

### Messages
- `GET /api/messages/channel/:channelId` - Get messages
- `DELETE /api/messages/:messageId` - Delete message

## 🔌 Socket.IO Events

### Client → Server
- `join:channel` - Join a channel room
- `message:send` - Send a message
- `message:react` - React to a message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator

### Server → Client
- `message:new` - New message received
- `message:updated` - Message updated (reactions)
- `typing:update` - User typing indicator
- `error` - Error occurred

## 🛠️ Development

### Adding New Features

1. **Backend**: Add routes in `backend/src/routes/`
2. **Frontend**: Add pages in `frontend/app/` or components in `frontend/components/`
3. **Types**: Update `shared/types/index.ts` for new interfaces

### Database Models

Models are defined in `backend/src/models/`:
- `User` - User accounts
- `Server` - Servers/communities
- `Channel` - Text/voice channels
- `Message` - Chat messages

## 🚢 Production Deployment

1. **Environment Variables**: Set secure production values
2. **Build**: `npm run build`
3. **Start**: `npm start`
4. **Database**: Use MongoDB Atlas or managed MongoDB
5. **Reverse Proxy**: Use Nginx or similar for frontend
6. **HTTPS**: Enable SSL/TLS certificates

## 📄 License

This project is for educational purposes. Customize and use as needed.

## 🤝 Contributing

Feel free to fork, modify, and enhance Maison Noir!

## 🎯 Roadmap

- [ ] Enhanced encryption (end-to-end)
- [ ] Voice channels
- [ ] File uploads
- [ ] Message search
- [ ] User roles and permissions
- [ ] Server templates
- [ ] Mobile app
- [ ] Video calls

---

**Built with ❤️ and 🖤 for secure, elegant communication.**

