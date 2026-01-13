# Authentication Setup Guide

Your authentication system is now fully implemented! Here's how to set up OAuth providers to enable Google and GitHub login.

## Current Status ✅

- [x] NextAuth.js installed and configured
- [x] Prisma database with authentication tables
- [x] Sign-in page with Google & GitHub buttons
- [x] Protected routes with authentication check
- [x] User-specific data storage
- [x] Automatic localStorage migration
- [x] API routes for CRUD operations

## What Works Now

1. **Sign-in page** - Visit http://localhost:3000 to see the sign-in page
2. **Database** - SQLite database created with User, Account, Session, and Purchase tables
3. **UI Components** - SignIn, SignOut, UserAvatar components
4. **Protected content** - Main app only accessible after sign-in

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

1. **Start the dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the app** in your browser:
   - http://localhost:3000

3. **You should see**:
   - Sign-in page with Google and GitHub buttons
   - Your app branding (Brain icon + title)

4. **After setting up OAuth**:
   - Click "Continue with Google" or "Continue with GitHub"
   - Sign in with your account
   - You'll be redirected back to the app
   - The main dashboard will load with your user info

## Testing the Complete Flow

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
- [ ] Production environment variables set

## Next Steps

1. **Set up OAuth credentials** (see instructions above)
2. **Test the authentication flow**
3. **Verify purchases are saved per-user**
4. **Consider adding more features**:
   - Email/password authentication
   - Password reset flow
   - User profile page
   - Export data functionality
   - Account deletion

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
