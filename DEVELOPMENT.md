# Development Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000

## 📁 Project Architecture

### Atomic Design Pattern

The project follows **Atomic Design** principles:

1. **Atoms** (`src/components/atoms/`)
   - Smallest building blocks
   - Examples: Button, Badge, Avatar
   - No business logic, just presentation

2. **Molecules** (`src/components/molecules/`)
   - Combinations of atoms
   - Examples: Tooltip, Popover, Modal
   - Simple interactions

3. **Organisms** (`src/components/organisms/`)
   - Complex components made of molecules/atoms
   - Examples: TokenTable, TableRow, TableHeader
   - Contains business logic

### State Management

**Redux Toolkit** (`src/store/`)
- **tokensSlice**: Price updates and selection state
- **uiSlice**: UI state (sorting, filters, modals)

**React Query** (`@tanstack/react-query`)
- Data fetching and caching
- Automatic refetching
- Optimistic updates

### Data Flow

```
API (mock) → React Query Cache → Components
                      ↓
            Redux Store (UI State)
                      ↓
            WebSocket Mock → Price Updates
```

## 🔧 Key Technologies

### Next.js 14+ (App Router)

- **Server Components**: Default, use 'use client' only when needed
- **Route Handlers**: API routes in `app/api/`
- **Metadata API**: SEO optimization
- **Image Optimization**: Automatic image optimization

### TypeScript (Strict Mode)

```typescript
// Always use strict typing
interface TokenPair {
  id: string;
  price: number;
  // ... more fields
}

// No 'any' allowed
// Use generics when needed
function sortBy<T>(items: T[], key: keyof T): T[] { ... }
```

### Tailwind CSS v4

```tsx
// Use utility classes
<div className="flex items-center gap-4 p-4 hover:bg-gray-800">

// Custom animations in globals.css
.price-flash-up {
  animation: flashUp 700ms ease-out;
}
```

## 🎨 Component Development

### Creating a New Atom

```typescript
// src/components/atoms/MyAtom.tsx
import React from 'react';

interface MyAtomProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const MyAtom: React.FC<MyAtomProps> = React.memo(({ 
  variant = 'primary',
  children 
}) => {
  return (
    <div className={variant === 'primary' ? 'bg-blue-600' : 'bg-gray-600'}>
      {children}
    </div>
  );
});

MyAtom.displayName = 'MyAtom';
```

### Performance Best Practices

1. **Use React.memo** for components that render often
2. **Use useCallback** for function props
3. **Use useMemo** for expensive calculations
4. **Avoid inline object/array creation** in render

```typescript
// ❌ Bad - creates new object every render
<Component style={{ margin: 10 }} />

// ✅ Good - define outside or use useMemo
const style = { margin: 10 };
<Component style={style} />
```

## 🔌 WebSocket Mock

The `useWebSocketMock` hook simulates real-time updates:

```typescript
// Runs every 2 seconds
// Updates 2-5 random tokens
// Triggers price flash animations
useWebSocketMock(true);
```

## 📊 Data Fetching

```typescript
// Using React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['tokens'],
  queryFn: () => fetchTokens('new'),
  staleTime: 30000, // 30 seconds
});

// Update cache manually (WebSocket updates)
queryClient.setQueryData(['tokens'], (old) => {
  // Update logic
});
```

## 🎭 Styling Guidelines

### Color Palette

```css
--background: #0a0a0a;      /* Main background */
--foreground: #ededed;      /* Main text */
--gray-900: #111;           /* Card backgrounds */
--gray-800: #1a1a1a;       /* Borders */
--gray-700: #2a2a2a;       /* Hover states */
--blue-600: #2563eb;        /* Primary actions */
--green-500: #22c55e;       /* Positive changes */
--red-500: #ef4444;         /* Negative changes */
```

### Spacing Scale

- `gap-2`: 0.5rem (8px)
- `gap-4`: 1rem (16px)
- `p-4`: 1rem padding
- `py-6`: 1.5rem vertical padding

## 🧪 Testing Strategy

### Unit Tests (Utils)

```typescript
// src/utils/__tests__/formatters.test.ts
import { formatCurrency } from '../formatters';

test('formats large numbers', () => {
  expect(formatCurrency(1500000)).toBe('$1.5M');
});
```

### Integration Tests (Components)

```typescript
// TableRow.test.tsx
import { render, screen } from '@testing-library/react';
import { TableRow } from './TableRow';

test('displays token symbol', () => {
  render(<TableRow token={mockToken} />);
  expect(screen.getByText('BTC')).toBeInTheDocument();
});
```

### Visual Regression (Playwright)

```typescript
// playwright/visual.spec.ts
test('token table matches snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('table.png', {
    maxDiffPixelRatio: 0.02
  });
});
```

## 🐛 Debugging

### Redux DevTools

Install Redux DevTools extension to inspect state changes.

### React Query DevTools

```typescript
// Add in development
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<ReactQueryDevtools initialIsOpen={false} />
```

### Performance Profiling

Use React DevTools Profiler to identify slow renders.

## 📦 Building for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm run start

# Analyze bundle size
npm run build --analyze
```

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Build succeeds without errors
- [ ] All images optimized
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Error boundaries tested
- [ ] Mobile layout tested
- [ ] SEO metadata added

## 🔐 Environment Variables

Create `.env.local` if needed:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📝 Code Style

### Naming Conventions

- **Components**: PascalCase (`TokenTable`, `TableRow`)
- **Files**: PascalCase for components (`TokenTable.tsx`)
- **Utilities**: camelCase (`formatCurrency`)
- **Constants**: SCREAMING_SNAKE_CASE (`UPDATE_INTERVAL`)

### Import Order

1. React/Next imports
2. Third-party libraries
3. Internal components
4. Types
5. Utils
6. Styles

```typescript
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TokenTable } from '@/components/organisms';
import { TokenPair } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import './styles.css';
```

## 🤝 Git Workflow

### Commit Message Format

```
feat: add token sorting functionality
fix: resolve price update race condition
perf: optimize table rendering
style: match Axiom Trade spacing
docs: update README with setup instructions
test: add tests for formatters
```

### Branch Strategy

- `main`: Production-ready code
- `dev`: Development branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/)

---

**Happy Coding! 🎉**
