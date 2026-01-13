# Authentication Implementation Plan: Google, Email & GitHub Login

## Overview
Add authentication to the Impulse Buy Budget Tracer app using NextAuth.js (Auth.js) to support:
- Google OAuth
- Email (magic link/password)
- GitHub OAuth

## Current App Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: localStorage (will need to migrate to database for auth)
- **Current State**: No authentication, data stored locally per device

## Step 1: Setup & Dependencies

### 1.1 Install Required Packages
```bash
npm install next-auth@beta
npm install @auth/prisma-adapter
npm install prisma @prisma/client
npm install bcryptjs
npm install @types/bcryptjs --save-dev
```

### 1.2 Setup Prisma Database
- Initialize Prisma with PostgreSQL/MySQL
- Create schema for:
  - Users (id, email, name, image, emailVerified)
  - Accounts (OAuth connections)
  - Sessions
  - VerificationTokens (for email magic links)
  - Purchases (migrate from localStorage)

### 1.3 Environment Variables
Create `.env.local`:
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate-random-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# GitHub OAuth
GITHUB_ID="..."
GITHUB_SECRET="..."

# Email (if using SMTP)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="..."
EMAIL_SERVER_PASSWORD="..."
EMAIL_FROM="noreply@yourdomain.com"
```

## Step 2: OAuth Provider Setup

### 2.1 Google Cloud Console
1. Go to console.cloud.google.com
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. For production: `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret

### 2.2 GitHub OAuth App
1. Go to github.com/settings/developers
2. Create new OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

## Step 3: NextAuth Configuration

### 3.1 Create Auth Configuration
**File**: `lib/auth.ts`
- Configure NextAuth with Google, GitHub, Email providers
- Setup Prisma adapter
- Configure session strategy (JWT or database)
- Define callbacks for session and JWT
- Setup user creation/update logic

### 3.2 Create API Route Handler
**File**: `app/api/auth/[...nextauth]/route.ts`
- Export GET and POST handlers
- Connect to auth configuration

## Step 4: Database Schema & Migration

### 4.1 Define Prisma Schema
**File**: `prisma/schema.prisma`
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  purchases     Purchase[]
}

model Purchase {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemName    String
  price       Float
  currency    String
  category    String
  trigger     String
  rating      Int
  notes       String?
  timestamp   DateTime @default(now())
  barcode     String?
}

// ... Account, Session, VerificationToken models
```

### 4.2 Run Migrations
```bash
npx prisma migrate dev --name add_authentication
npx prisma generate
```

## Step 5: Update Application Structure

### 5.1 Create Auth Components
**Files to create**:
- `components/SignIn.tsx` - Sign in page with provider buttons
- `components/SignOut.tsx` - Sign out button
- `components/UserAvatar.tsx` - Display user info
- `components/AuthGuard.tsx` - Protect routes (optional)

### 5.2 Create Auth Pages
- `app/auth/signin/page.tsx` - Custom sign-in page
- `app/auth/error/page.tsx` - Error handling page
- `app/auth/verify-request/page.tsx` - Email verification message

### 5.3 Update Main Layout
**File**: `app/layout.tsx`
- Wrap app with SessionProvider
- Add auth state to header

### 5.4 Update Main Page
**File**: `app/page.tsx`
- Check authentication state
- Show sign-in prompt if not authenticated
- Load user-specific purchases from database

## Step 6: Data Migration Strategy

### 6.1 Create Migration Utility
**File**: `lib/migrateLocalStorage.ts`
- Function to read localStorage purchases
- Upload to database when user signs in
- Clear localStorage after successful migration
- Handle conflicts (if user signs in on multiple devices)

### 6.2 Update Purchase Functions
**File**: `lib/storage.ts` (rename from localStorage.ts)
- Replace localStorage functions with database queries
- Use Prisma client for CRUD operations
- Add userId to all queries
- Keep localStorage as fallback for offline mode

## Step 7: API Routes for Data

### 7.1 Create Purchase API Routes
**Files**:
- `app/api/purchases/route.ts` - GET all, POST new
- `app/api/purchases/[id]/route.ts` - GET one, PUT update, DELETE
- All routes should check authentication
- Filter by userId

### 7.2 Server Actions (Alternative)
If preferred, create server actions:
- `app/actions/purchases.ts`
- Use Next.js Server Actions for type-safe mutations

## Step 8: UI/UX Updates

### 8.1 Sign In Page Design
- Show app branding
- Three prominent buttons: "Continue with Google", "Continue with GitHub", "Continue with Email"
- Match existing amber/rose gradient theme
- Add privacy notice

### 8.2 Navigation Updates
- Add user avatar/menu in header
- Sign out option
- Profile page (optional)

### 8.3 Loading States
- Handle auth loading states
- Show skeleton while checking authentication
- Smooth transitions

## Step 9: Security & Best Practices

### 9.1 Security Checklist
- [ ] Validate NEXTAUTH_SECRET is strong and random
- [ ] Use HTTPS in production
- [ ] Implement CSRF protection (built into NextAuth)
- [ ] Rate limit auth endpoints
- [ ] Validate redirect URLs
- [ ] Sanitize user inputs
- [ ] Implement proper error handling (don't leak sensitive info)

### 9.2 GDPR Compliance
- [ ] Add privacy policy
- [ ] Allow users to export their data
- [ ] Allow users to delete their account
- [ ] Clear cookie consent if needed

### 9.3 Session Management
- Configure session max age
- Implement refresh token rotation
- Handle expired sessions gracefully

## Step 10: Testing Strategy

### 10.1 Unit Tests
**Test Files to Create**:
- `__tests__/lib/auth.test.ts`
  - Test session creation
  - Test user creation
  - Test provider configuration
  
- `__tests__/lib/storage.test.ts`
  - Test CRUD operations
  - Test userId filtering
  - Test error handling

- `__tests__/lib/migrateLocalStorage.test.ts`
  - Test migration logic
  - Test conflict resolution
  - Test localStorage clearing

### 10.2 Integration Tests
**Test Files to Create**:
- `__tests__/integration/auth-flow.test.ts`
  - Test complete sign-in flow (mock OAuth)
  - Test sign-out flow
  - Test session persistence
  - Test unauthorized access

- `__tests__/integration/purchases-api.test.ts`
  - Test authenticated API calls
  - Test unauthenticated rejection
  - Test data isolation between users

### 10.3 E2E Tests (Playwright/Cypress)
**Test Scenarios**:
- Complete sign-in with Google (use test account)
- Complete sign-in with GitHub
- Complete sign-in with email magic link
- Sign out and verify session cleared
- Create purchase when authenticated
- Verify purchases don't leak between users
- Test localStorage migration on first sign-in
- Test offline behavior (if keeping localStorage fallback)

### 10.4 Manual Testing Checklist
- [ ] Sign in with Google - development
- [ ] Sign in with GitHub - development
- [ ] Sign in with Email - development
- [ ] Create/Read/Update/Delete purchases
- [ ] Sign out and verify data persistence
- [ ] Sign in on different browser/device
- [ ] Test expired session handling
- [ ] Test network error handling
- [ ] Mobile responsive sign-in flow
- [ ] Test with slow network
- [ ] Production OAuth (staging environment)
- [ ] Test callback URLs in production

### 10.5 Security Testing
- [ ] Test CSRF protection
- [ ] Test SQL injection in purchase inputs
- [ ] Test XSS in purchase notes/names
- [ ] Test unauthorized API access
- [ ] Test session hijacking protection
- [ ] Verify secrets not exposed in client
- [ ] Test rate limiting on auth endpoints

### 10.6 Performance Testing
- [ ] Measure auth callback latency
- [ ] Test database query performance
- [ ] Test with 1000+ purchases per user
- [ ] Monitor session lookup speed
- [ ] Test concurrent users (load testing)

### 10.7 Browser Compatibility Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge
- [ ] Test PWA installation with auth
- [ ] Test cookie handling in different browsers

## Step 11: Deployment Considerations

### 11.1 Database Setup
- Setup production database (Vercel Postgres, PlanetScale, etc.)
- Run migrations in production
- Setup database backups

### 11.2 Environment Variables
- Add all secrets to Vercel/hosting platform
- Update NEXTAUTH_URL to production domain
- Update OAuth redirect URIs to production

### 11.3 Domain Configuration
- Ensure custom domain supports cookies
- Configure CORS if needed

## Step 12: Documentation & User Communication

### 12.1 Update README
- Add authentication section
- Document environment setup
- Add database setup instructions

### 12.2 User Migration Notice
- Inform existing users about account creation
- Explain data migration process
- Provide support for issues

### 12.3 Developer Documentation
- Document auth configuration
- Document API authentication
- Add troubleshooting guide

## Testing Tools & Frameworks

### Recommended Testing Stack
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev msw # Mock Service Worker for API mocking
npm install --save-dev @playwright/test # E2E testing
```

### Test Coverage Goals
- Unit test coverage: >80%
- Integration test coverage: >70%
- E2E test coverage: Critical flows (auth, CRUD)

## Timeline Estimate

- **Day 1-2**: Setup (dependencies, database, OAuth apps)
- **Day 3-4**: NextAuth configuration & basic auth flow
- **Day 5-6**: Database schema & data migration
- **Day 7-8**: Update UI/UX with auth components
- **Day 9-10**: API routes & data access layer
- **Day 11-12**: Testing (unit + integration)
- **Day 13-14**: E2E testing & bug fixes
- **Day 15**: Security review & final testing
- **Day 16**: Deployment & monitoring

**Total: ~3 weeks** (with buffer for unexpected issues)

## Risk Mitigation

### High Priority Risks
1. **Data Loss During Migration**
   - Mitigation: Thorough testing, keep localStorage backup
   
2. **OAuth Configuration Issues**
   - Mitigation: Test with development credentials first
   
3. **Session Management Bugs**
   - Mitigation: Extensive integration tests
   
4. **Database Performance**
   - Mitigation: Index key fields, connection pooling

### Rollback Plan
- Keep localStorage as fallback for 1-2 weeks
- Feature flag for auth (can disable if critical issues)
- Database backups before migration
- Ability to export user data

## Success Metrics

- [ ] All three auth providers working in production
- [ ] <2 second sign-in time
- [ ] Zero data loss during migration
- [ ] >95% test coverage for auth logic
- [ ] No critical security vulnerabilities
- [ ] <5% user-reported auth issues
- [ ] Mobile PWA auth working seamlessly

## Post-Launch Monitoring

- Monitor authentication success/failure rates
- Track session duration
- Monitor database query performance
- User feedback on auth experience
- Security audit after 1 week
- Performance review after 2 weeks
