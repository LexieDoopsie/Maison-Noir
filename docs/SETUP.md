# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **pnpm** - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Use it in your `.env` file

### 3. Configure Environment Variables

#### Backend Configuration

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maison-noir
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ENCRYPTION_KEY=your-32-byte-hex-encryption-key-change-this-in-production
```

**Generate secure keys:**

```bash
# Generate JWT_SECRET (any long random string)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate ENCRYPTION_KEY (32 bytes = 64 hex characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Frontend Configuration (Optional)

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Start the Application

#### Development Mode (Recommended)

```bash
# Start both frontend and backend
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000

#### Separate Terminals

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### 5. Verify Installation

1. **Backend Health Check**: Visit http://localhost:5000/api/health
   - Should return: `{"status":"ok","message":"Maison Noir API is running"}`

2. **Frontend**: Visit http://localhost:3000
   - Should see the loading screen, then redirect to login

3. **Create Account**: Register a new user
   - Should redirect to the app after successful registration

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**:
- Ensure MongoDB is running
- Check `MONGODB_URI` in `backend/.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
- Change `PORT` in `backend/.env`
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:5000 | xargs kill
  ```

### Module Not Found Errors

**Error**: `Cannot find module '...'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
cd frontend && npm install
cd ../backend && npm install
```

### TypeScript Errors

**Error**: Type errors in IDE

**Solution**:
- Ensure TypeScript is installed: `npm install -g typescript`
- Restart your IDE/editor
- Run `npm run build` to check for actual errors

## Production Build

```bash
# Build both frontend and backend
npm run build

# Start production servers
cd frontend && npm start
cd ../backend && npm start
```

## Next Steps

1. **Create Your First Server**: Click the "+" button in the sidebar
2. **Invite Friends**: Use the invite code to share your server
3. **Customize Profile**: Visit `/profile` to update your bio and avatar
4. **Explore Settings**: Visit `/settings` to configure preferences

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)

