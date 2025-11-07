# MongoDB Setup Guide

## Installing MongoDB Locally (Windows)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or 6.0)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. Check "Install MongoDB as a Service"
4. Check "Run service as Network Service user"
5. Leave "Service Name" as "MongoDB"
6. Check "Install MongoDB Compass" (optional GUI tool)
7. Click "Install"

### Step 3: Verify Installation
1. Open PowerShell as Administrator
2. Check if MongoDB service is running:
   ```powershell
   Get-Service MongoDB
   ```
3. If it shows "Running", MongoDB is installed correctly!

### Step 4: Test Connection
Open a new terminal and run:
```powershell
mongosh
```
If you see a MongoDB prompt, it's working!

## Important: Local vs Cloud Database

### Local MongoDB (for Development)
- ✅ Use for: Testing and development on your computer
- ❌ Cannot use for: Hosting on Render or other cloud platforms
- Why: Render servers can't access your local computer's database

### MongoDB Atlas (for Production/Hosting)
- ✅ Use for: Hosting your app on Render, Vercel, etc.
- ✅ Free tier available (512MB storage)
- ✅ Works from anywhere (cloud-based)

## Setup for Render Hosting

Since you want to host on Render, you need MongoDB Atlas:

1. **Keep your current Atlas connection** (in your .env file)
2. **Fix the IP whitelist issue:**
   - Go to https://cloud.mongodb.com
   - Click "Network Access" → "Add IP Address"
   - Click "Add Current IP Address" (for your development)
   - Add `0.0.0.0/0` to allow Render's servers (or add Render's IP ranges)

3. **For Render deployment:**
   - Use the same MongoDB Atlas connection string
   - Add it as an environment variable in Render dashboard
   - Render will connect to Atlas, not your local MongoDB

## Recommended Setup

**For Development (Your Computer):**
- Option A: Use local MongoDB (after installing)
  - Update `.env`: `MONGO_URI=mongodb://127.0.0.1:27017/mern_intern`
  
- Option B: Use MongoDB Atlas (fix IP whitelist)
  - Keep current `.env` with Atlas connection
  - Whitelist your IP address

**For Production (Render Hosting):**
- Must use MongoDB Atlas
- Add connection string in Render's environment variables
- Whitelist Render's IP addresses (or use 0.0.0.0/0 for development)

## Quick Start Commands

After installing MongoDB locally:

```powershell
# Start MongoDB (usually auto-starts)
Start-Service MongoDB

# Stop MongoDB
Stop-Service MongoDB

# Check status
Get-Service MongoDB

# Connect to MongoDB shell
mongosh
```

