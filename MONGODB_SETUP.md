# MongoDB Authentication Setup Guide

## Step 1: Create MongoDB Database

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Option B: Local MongoDB

```bash
# Install MongoDB locally
# Then use this connection string:
mongodb://localhost:27017/bazardor
```

## Step 2: Update Environment Variables

Replace the DATABASE_URL in `.env.local` with your actual MongoDB connection string:

```env
# .env.local
DATABASE_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/bazardor?retryWrites=true&w=majority"
BETTER_AUTH_SECRET=a_random_secret_key_1234567890_bazardor
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Important:** Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your actual MongoDB credentials.

## Step 3: Push Schema to MongoDB

Since MongoDB is schemaless, you don't need migrations. Just make sure your connection string is correct.

```bash
# Test the connection
npx prisma db push
```

## Step 4: Test Authentication

1. Start the development server:
```bash
npm run dev
```

2. Navigate to http://localhost:3000
3. Click "সাইন আপ" (Sign Up)
4. Fill in the form:
   - Name: Your name
   - Email: test@example.com
   - Password: password123 (at least 8 characters)
5. Click "অ্যাকাউন্ট তৈরি করুন" (Create Account)
6. You should see a success message and be redirected to homepage

## Step 5: Test Sign In

1. Click "সাইন ইন" (Sign In)
2. Enter your credentials
3. Click "সাইন ইন" button
4. You should be signed in successfully

## What's Been Configured:

✅ **Prisma Schema** - MongoDB models for User, Account, Session, VerificationToken
✅ **BetterAuth** - Configured with Prisma adapter for MongoDB
✅ **Sign Up Page** - Functional with validation and error handling
✅ **Sign In Page** - Functional with authentication
✅ **Toast Notifications** - User feedback for all actions
✅ **Loading States** - Button disabled during submission

## Troubleshooting:

### Error: "Connection refused"
- Check if your MongoDB connection string is correct
- For Atlas: Make sure your IP is whitelisted in Network Access
- For local: Make sure MongoDB service is running

### Error: "Invalid credentials"
- Check if the user exists in the database
- Password must be at least 8 characters

### Error: "Email already exists"
- Try using a different email address
- Or sign in with existing credentials

## Next Steps:

1. **Update Navbar** - Show user info when logged in
2. **Add Sign Out** - Implement logout functionality
3. **Protect Routes** - Add middleware for protected pages
4. **OAuth Setup** - Configure Google/GitHub if needed

## MongoDB Atlas IP Whitelist:

If using MongoDB Atlas, add your IP address:
1. Go to MongoDB Atlas dashboard
2. Click "Network Access"
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (for development)
5. Or add your specific IP address (for production)
