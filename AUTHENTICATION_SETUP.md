# Authentication Setup Guide

Your authentication system is now fully implemented with **Google, GitHub, Email, and Face ID/Biometric** support! Here's how to use it.

## Current Status ✅

- [x] NextAuth.js installed and configured
- [x] Prisma database with authentication tables
- [x] Sign-in page with Google, GitHub, & Email options
- [x] Email/password registration and login
- [x] Face ID / Touch ID / Biometric authentication
- [x] Protected routes with authentication check
- [x] User-specific data storage
- [x] Automatic localStorage migration
- [x] API routes for CRUD operations

## What Works Now

1. **Sign-in page** - Three login options: Google OAuth, GitHub OAuth, or Email/Password
2. **Email Registration** - Create account with email and password
3. **Face ID Prompt** - After first sign-in, users can enable biometric login
4. **Database** - SQLite database with User, Account, Session, Purchase, and WebAuthnCredential tables
5. **UI Components** - SignIn, SignOut, UserAvatar, FaceIDPrompt components
6. **Protected content** - Main app only accessible after sign-in

## To Enable Google OAuth

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/

### 2. Create or Select a Project
- Click on the project dropdown at the top
- Create a new project or select an existing one

### 3. Enable Google+ API
- Go to "APIs & Services" > "Library"
- Search for "Google+ API"
- Click and enable it

### 4. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth client ID"
- Configure consent screen if prompted:
  - User Type: External
  - App name: Impulse Buy Budget Tracer
  - User support email: Your email
  - Developer contact: Your email
- Choose "Web application"
- Add Authorized redirect URIs:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://yourdomain.com/api/auth/callback/google`

### 5. Get Your Credentials
- Copy the "Client ID" and "Client Secret"

### 6. Add to .env File
```bash
GOOGLE_CLIENT_ID="your-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
```

### 7. Restart the Development Server
```bash
# Press Ctrl+C in the terminal running the dev server
npm run dev
```

## To Enable GitHub OAuth

### 1. Go to GitHub Developer Settings
- Visit: https://github.com/settings/developers

### 2. Create New OAuth App
- Click "OAuth Apps" > "New OAuth App"
- Fill in the details:
  - Application name: Impulse Buy Budget Tracer
  - Homepage URL: `http://localhost:3000` (development)
  - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 3. Register Application
- Click "Register application"
- Copy the "Client ID"
- Click "Generate a new client secret" and copy it

### 4. Add to .env File
```bash
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### 5. Restart the Development Server
```bash
npm run dev
```

## Testing the Authentication

### Email/Password Authentication (Works Immediately!)

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Open the app**: http://localhost:3000

3. **Create an account**:
   - Click "Sign up"
   - Enter your name, email, and password (min 6 characters)
   - Click "Create Account"
   - You'll be automatically signed in

4. **Face ID Prompt**:
   - After signing in, a modal will appear
   - If your device supports Face ID/Touch ID/fingerprint, click "Enable Biometric Login"
   Face ID / Biometric Authentication

### How It Works

After your first sign-in (with any method), the app checks if your device supports biometric authentication. If it does, you'll see a prompt asking if you want to enable it.

### Supported Methods

- **iOS/macOS**: Face ID, Touch ID
- **Android**: Fingerprint, face unlock, pattern
- **Windows**: Windows Hello (fingerprint, face, PIN)

### Benefits

- Faster sign-in (no password needed)
- More secure than passwords
- Your biometric data never leaves your device
- Works with WebAuthn standard

### How to Enable

1. Sign in with any method (email, Google, or GitHub)
2. When the prompt appears, click "Enable Biometric Login"
3. Follow your device's prompts to register
4. Done! Next time you can use biometric login

### How to Skip

- Click "Maybe Later" in the prompt
- The app won't ask again on this device
- You can change this setting later in your account settings

### Security Notes

- Biometric data is stored locally on your device
- The app only stores a public key (not your fingerprint/face)
- Even if someone steals the public key, they can't use it without your biometric
- Each device has its own credential
### First-Time User
1. Click sign-in button
2. Authorize with Google/GitHub
3. User account created in database
4. Redirected to main app
5. Can add purchases

### Returning User
1. Click sign-in button
2. Quick authorization
3. Purchases loaded from database
4. Can add/delete purchases

### localStorage Migration
1. If you had purchases in localStorage before:
2. Sign in for the first time
3. Old purchases automatically migrated to database
4. localStorage cleared
5. All data now synced to your account

## Database Inspection

To view your database:
```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555 where you can see:
- Users
- Accounts (OAuth connections)
- Sessions
- Purchases

## Troubleshooting

### "Configuration" Error
- Check that NEXTAUTH_SECRET is set in .env
- Ensure NEXTAUTH_URL matches your development URL

### "OAuthCallback" Error
- Verify redirect URIs in Google/GitHub match exactly
- Check CLIENT_ID and CLIENT_SECRET are correct
- Restart dev server after changing .env

### "Unauthorized" API Errors
- Sign in again
- Check browser console for session errors
- Clear cookies and try again

### Sign-in Button Does Nothing
- Check browser console for errors
- Verify OAuth credentials are in .env
- Ensure dev server was restarted after .env changes

## Production Deployment

When deploying to production (e.g., Vercel):

1. **Update environment variables**:
   ```
   NEXTAUTH_URL="https://yourdomain.com"
   DATABASE_URL="your-production-database-url"
   ```

2. **Update OAuth redirect URIs**:
   - Google: Add `https://yourdomain.com/api/auth/callback/google`
   - GitHub: Add `https://yourdomain.com/api/auth/callback/github`

3. **Use a production database**:
   - PostgreSQL (Vercel Postgres, Supabase, etc.)
   - Update `datasource db { provider = "postgresql" }` in schema.prisma
   - Run migrations: `npx prisma migrate deploy`

4. **Add all environment variables to your hosting platform**

## Security Checklist

- [x] NEXTAUTH_SECRET is random and secure (auto-generated)
- [x] Passwords not stored (using OAuth only)
- [x] User data isolated (userId filtering on all queries)
- [x] API routes protected (authentication check)
- [x] CSRF protection (built into NextAuth)
- [ ] OAuth credentials added (you need to do this)
- [ ] Production environment variables s with email/password support
- `lib/db.ts` - Prisma client
- `lib/storage.ts` - Database operations
- `lib/webauthn.ts` - WebAuthn/Face ID utilities
- `components/AuthProvider.tsx` - Session provider
- `components/SignIn.tsx` - Sign-in page with email/password forms
- `components/SignOut.tsx` - Sign-out button
- `components/UserAvatar.tsx` - User display
- `components/FaceIDPrompt.tsx` - Biometric setup modal
- `app/api/auth/[...nextauth]/route.ts` - Auth API
- `app/api/auth/register/route.ts` - Email registration API
- `app/api/auth/webauthn/route.ts` - WebAuthn credential management
- `app/api/purchases/route.ts` - Purchase API (GET, POST)
- `app/api/purchases/[id]/route.ts` - Purchase API (DELETE)
- `app/api/purchases/migrate/route.ts` - Migration API
- `app/auth/signin/page.tsx` - Sign-in page
- `app/auth/error/page.tsx` - Error page
- `prisma/schema.prisma` - Database schema with password and WebAuthnCredential
## Files Created/Modified

### New Files:
- `lib/auth.ts` - NextAuth configuration
- `lib/db.ts` - Prisma client
- `lib/storage.ts` - Database operations
- `components/AuthProvider.tsx` - Session provider
- `components/SignIn.tsx` - Sign-in page component
- `components/SignOut.tsx` - Sign-out button
- `components/UserAvatar.tsx` - User display
- `app/api/auth/[...nextauth]/route.ts` - Auth API
- `app/api/purchases/route.ts` - Purchase API (GET, POST)
- `app/api/purchases/[id]/route.ts` - Purchase API (DELETE)
- `app/api/purchases/migrate/route.ts` - Migration API
- `app/auth/signin/page.tsx` - Sign-in page
- `app/auth/error/page.tsx` - Error page
- `prisma/schema.prisma` - Database schema
- `types/next-auth.d.ts` - TypeScript types

### Modified Files:
- `app/layout.tsx` - Added AuthProvider wrapper
- `app/page.tsx` - Added authentication logic
- `types/index.ts` - Updated Purchase type
- `.env` - Added auth environment variables

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Ensure OAuth credentials are configured correctly
5. Try clearing cookies and restarting the dev server

Your authentication system is ready to go! Just add the OAuth credentials and you're all set! 🎉
