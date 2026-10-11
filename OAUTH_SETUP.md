# 🔐 OAuth Setup Guide (Google & GitHub)

## Overview
Your BazarDor app now has Google and GitHub OAuth buttons that are ready to work! You just need to get the OAuth credentials from Google Cloud Console and GitHub.

---

## 📋 Step 1: Google OAuth Setup

### 1.1 Create Google Cloud Project
1. Go to https://console.cloud.google.com/
2. Click **"Select a project"** → **"New Project"**
3. Name: `BazarDor` (or any name)
4. Click **"Create"**

### 1.2 Configure OAuth Consent Screen
1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** → Click **"Create"**
3. Fill in:
   - **App name:** BazarDor
   - **User support email:** Your email
   - **Developer contact:** Your email
4. Click **"Save and Continue"**
5. Skip "Scopes" → Click **"Save and Continue"**
6. Add test users (optional for development)
7. Click **"Save and Continue"**

### 1.3 Create OAuth Credentials
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: `BazarDor Web Client`
5. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   ```
6. **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Click **"Create"**
8. **Copy** the `Client ID` and `Client Secret`

---

## 📋 Step 2: GitHub OAuth Setup

### 2.1 Register OAuth App
1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name:** BazarDor
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Click **"Register application"**

### 2.2 Generate Client Secret
1. On the app page, click **"Generate a new client secret"**
2. **Copy** the `Client ID` and `Client Secret` immediately (secret is only shown once!)

---

## 📋 Step 3: Add Credentials to `.env.local`

Open your `.env.local` file and add:

```env
# Database
DATABASE_URL="mongodb+srv://YOUR_MONGODB_CONNECTION_STRING"

# BetterAuth
BETTER_AUTH_SECRET=a_random_secret_key_1234567890_bazardor
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET_HERE"

# GitHub OAuth
GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID_HERE"
GITHUB_CLIENT_SECRET="YOUR_GITHUB_CLIENT_SECRET_HERE"
```

**Important:** Replace the placeholders with actual values from Google and GitHub.

---

## 🚀 Step 4: Test OAuth

### Start Development Server
```bash
npm run dev
```

### Test Google Sign In
1. Go to http://localhost:3000/signin
2. Click **"Google দিয়ে চালিয়ে যান"** button
3. Google OAuth popup should open
4. Select your Google account
5. You should be redirected back and signed in! ✅

### Test GitHub Sign In
1. Go to http://localhost:3000/signin
2. Click **"GitHub দিয়ে চালিয়ে যান"** button
3. GitHub OAuth popup should open
4. Click **"Authorize"**
5. You should be redirected back and signed in! ✅

---

## 🎨 What Happens Behind the Scenes

### OAuth Flow:
1. User clicks Google/GitHub button
2. App redirects to Google/GitHub login
3. User authorizes the app
4. Google/GitHub redirects back to: `/api/auth/callback/google` or `/api/auth/callback/github`
5. BetterAuth:
   - Creates or finds user in MongoDB
   - Creates session
   - Stores OAuth tokens
6. User is redirected to homepage (signed in)

### Database Storage:
- **User info** (name, email, image) stored in `user` collection
- **OAuth tokens** stored in `account` collection
- **Session** created in `session` collection

---

## 🔧 Troubleshooting

### "Redirect URI mismatch" Error
**Cause:** Wrong redirect URI configured  
**Fix:** Make sure redirect URIs match exactly:
- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

### "Invalid client" Error
**Cause:** Wrong Client ID or Secret  
**Fix:** Double-check credentials in `.env.local`

### "Access denied" Error
**Cause:** User canceled OAuth  
**Fix:** This is normal - user chose not to sign in

### OAuth Popup Blocked
**Cause:** Browser popup blocker  
**Fix:** Allow popups for localhost:3000

---

## 📱 For Production

### Update OAuth Settings:

#### Google Console:
1. Add production domain to **Authorized JavaScript origins:**
   ```
   https://yourdomain.com
   ```
2. Add production callback to **Authorized redirect URIs:**
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

#### GitHub OAuth App:
1. Update **Homepage URL:**
   ```
   https://yourdomain.com
   ```
2. Update **Authorization callback URL:**
   ```
   https://yourdomain.com/api/auth/callback/github
   ```

#### Update `.env` for Production:
```env
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## ✅ Features Now Available

### Sign In Page (`/signin`)
- ✅ Email/Password sign in
- ✅ **Google OAuth sign in** (click button)
- ✅ **GitHub OAuth sign in** (click button)
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

### Sign Up Page (`/signup`)
- ✅ Email/Password sign up
- ✅ **Google OAuth sign up** (click button)
- ✅ **GitHub OAuth sign up** (click button)
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

---

## 🎉 Summary

Your OAuth integration is **ready to go**! Just:

1. ✅ Get Google OAuth credentials
2. ✅ Get GitHub OAuth credentials
3. ✅ Add them to `.env.local`
4. ✅ Restart dev server
5. ✅ Test signing in with Google/GitHub!

**No code changes needed** - everything is already wired up! 🚀

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
- [BetterAuth Social Providers](https://www.better-auth.com/docs/authentication/social)
