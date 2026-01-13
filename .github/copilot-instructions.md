# GitHub Copilot Instructions

## Project Overview
This is **Impulse Buy Budget Tracer** - a behavioral psychology tracking app that helps users understand their spending patterns and emotional triggers. Built with Next.js 15, TypeScript, Prisma, and NextAuth.js.

## Tech Stack
- **Framework**: Next.js 15.5.9 (App Router)
- **Language**: TypeScript 5
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js v5 (beta)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Special Features**: Barcode scanning, PWA support

## Architecture & Patterns

### Authentication
- Uses NextAuth.js with OAuth providers (Google, GitHub)
- JWT session strategy for stateless authentication
- All API routes must check authentication with `auth()` from `@/lib/auth`
- User ID required for all data operations
- Session type extended in `types/next-auth.d.ts` to include user ID

### Database Access
- **Always use Prisma client** from `@/lib/db`
- **Never use raw SQL** unless absolutely necessary
- All purchase queries must filter by `userId`
- Use transactions for multi-step operations
- Prisma client is singleton pattern (for development hot reload)

### API Routes
- Located in `app/api/`
- All routes must authenticate: `const session = await auth()`
- Return 401 for unauthenticated requests
- Return JSON responses with proper status codes
- Use try-catch blocks for error handling

### Type Safety
- All types defined in `types/index.ts`
- Use `Purchase`, `Currency`, `TriggerType` types consistently
- Extend NextAuth types in `types/next-auth.d.ts`
- Never use `any` unless for type compatibility with external libraries

## Code Conventions

### File Structure
```
app/                    # Next.js App Router pages
  api/                  # API routes
  auth/                 # Authentication pages
components/             # React components (PascalCase)
lib/                    # Utility functions and configs
  auth.ts              # NextAuth configuration
  db.ts                # Prisma client
  storage.ts           # Database operations
prisma/
  schema.prisma        # Database schema
types/                 # TypeScript type definitions
```

### Naming Conventions
- **Components**: PascalCase (e.g., `PurchaseForm.tsx`)
- **Utilities**: camelCase (e.g., `getPurchases`)
- **API Routes**: kebab-case folders (e.g., `[id]/route.ts`)
- **Database Models**: PascalCase (e.g., `Purchase`, `User`)
- **Types/Interfaces**: PascalCase (e.g., `Purchase`, `BehaviorStats`)

### Component Patterns
- Use `"use client"` directive for client components
- Server components by default for pages
- Hooks at top of components
- Props interfaces inline or in types file
- Always destructure props

### Styling
- Use Tailwind CSS utility classes
- Color scheme: amber (primary), rose (accent), gray (neutral)
- Gradient backgrounds: `bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50`
- Responsive design: mobile-first with `md:` and `lg:` breakpoints
- Icons from Lucide React with consistent sizing

## Authentication Patterns

### Checking Auth Status (Client)
```typescript
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
if (status === "authenticated") {
  // User is signed in
}
```

### Checking Auth Status (Server)
```typescript
import { auth } from "@/lib/auth";

const session = await auth();
if (!session?.user?.id) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### Sign In/Out
```typescript
import { signIn, signOut } from "next-auth/react";

// Sign in
signIn("google", { callbackUrl: "/" });

// Sign out
signOut({ callbackUrl: "/" });
```

## Database Patterns

### Creating Records
```typescript
await prisma.purchase.create({
  data: {
    userId,
    itemName: "...",
    price: 29.99,
    // ... other fields
  },
});
```

### Querying User Data
```typescript
const purchases = await prisma.purchase.findMany({
  where: { userId },
  orderBy: { timestamp: "desc" },
});
```

### Deleting with User Check
```typescript
await prisma.purchase.delete({
  where: {
    id: purchaseId,
    userId, // Ensures user can only delete their own
  },
});
```

## Common Tasks

### Adding a New API Route
1. Create file in `app/api/[route]/route.ts`
2. Import `auth` from `@/lib/auth`
3. Check authentication at start of handler
4. Implement logic with proper error handling
5. Return JSON responses

### Adding a New Component
1. Create file in `components/[ComponentName].tsx`
2. Add `"use client"` if uses hooks/interactivity
3. Import types from `@/types`
4. Use Tailwind for styling
5. Export as default

### Adding a New Database Model
1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name [migration_name]`
3. Run `npx prisma generate`
4. Create functions in `lib/storage.ts`
5. Update types in `types/index.ts`

### Adding a New Purchase Field
1. Update `Purchase` interface in `types/index.ts`
2. Update Prisma schema
3. Create and run migration
4. Update `PurchaseForm` component
5. Update API routes
6. Update storage functions

## Environment Variables

Required in `.env`:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="[auto-generated]"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="[from Google Cloud Console]"
GOOGLE_CLIENT_SECRET="[from Google Cloud Console]"
GITHUB_ID="[from GitHub Settings]"
GITHUB_SECRET="[from GitHub Settings]"
```

## Best Practices

### Security
- Always filter by `userId` in database queries
- Never expose API keys in client code
- Use environment variables for secrets
- Validate user input before database operations
- Return generic error messages (don't leak details)

### Performance
- Use Prisma's select/include to minimize data transfer
- Index frequently queried fields (userId, timestamp)
- Lazy load images with Next.js Image component
- Use React.memo for expensive components

### Error Handling
- Use try-catch in all async functions
- Log errors to console (server-side only)
- Return user-friendly error messages
- Handle loading and error states in UI

### TypeScript
- Enable strict mode
- No implicit any
- Proper type annotations for function parameters
- Use interface over type for object shapes
- Export types that are used in multiple files

## Testing Considerations

When writing tests:
- Mock NextAuth session for protected routes
- Use test database for integration tests
- Mock Prisma client for unit tests
- Test authentication flows
- Test data isolation between users

## Migration & Backwards Compatibility

- Old `localStorage` purchases auto-migrate on first sign-in
- Support legacy fields: `date`, `createdAt` (marked optional)
- New schema uses: `timestamp`, `category`, `notes`
- Migration happens in `app/api/purchases/migrate/route.ts`

## Special Features

### Barcode Scanning
- Uses `@zxing/library` and `react-webcam`
- Camera access required
- Component: `BarcodeScanner.tsx`

### PWA Support
- Manifest in `public/manifest.json`
- Service worker configuration in `next.config.ts`
- Install prompts for mobile devices

### Behavioral Analytics
- Track emotional triggers: Boredom, Stress, Social Media, etc.
- Star ratings for purchases (1-5)
- Dashboard with spending insights
- Component: `Dashboard.tsx`

## Common Gotchas

- NextAuth v5 uses `auth()` not `getServerSession()`
- Prisma 7 has config in `prisma.config.ts`, not schema file
- Currency and Trigger types must match TypeScript definitions
- Always await `auth()` in API routes
- Remember to restart dev server after `.env` changes

## Development Workflow

1. Start dev server: `npm run dev`
2. Open Prisma Studio: `npx prisma studio`
3. Make schema changes: Edit `prisma/schema.prisma`
4. Create migration: `npx prisma migrate dev --name [name]`
5. Generate client: `npx prisma generate`
6. Test in browser: `http://localhost:3000`

## Production Deployment

- Change DATABASE_URL to production PostgreSQL
- Update `datasource db { provider = "postgresql" }` in schema
- Run `npx prisma migrate deploy`
- Update OAuth redirect URIs for production domain
- Set all environment variables in hosting platform
- Generate new NEXTAUTH_SECRET for production

## When Assisting

- Prefer functional components over class components
- Use async/await over promises
- Keep components small and focused
- Follow existing patterns in the codebase
- Consider mobile responsiveness
- Maintain type safety
- Test authentication flows
- Document complex logic
- Use meaningful variable names
- Follow the established color scheme (amber/rose)
