# Next Steps & TODO

## ✅ Completed

- [x] Project setup with Next.js 14 + TypeScript
- [x] Tailwind CSS v4 configuration
- [x] Redux Toolkit store setup
- [x] React Query integration
- [x] Atomic component architecture (atoms, molecules, organisms)
- [x] Mock data generator
- [x] WebSocket mock for real-time updates
- [x] Token table with sorting
- [x] Skeleton loading states
- [x] Price flash animations
- [x] Error boundaries
- [x] Responsive layout foundation
- [x] Token detail modal
- [x] Tooltips and popovers

## 🚧 TODO: Before Submission

### 1. Visual Polish & Pixel-Perfect Matching (Priority: HIGH)

- [ ] Compare with actual Axiom Trade screenshot
- [ ] Fine-tune spacing, colors, typography to match exactly
- [ ] Add missing token badge icons
- [ ] Create/add actual token images to `/public/tokens/`
- [ ] Match exact color scheme from Axiom Trade
- [ ] Add hover states that match reference design
- [ ] Test visual regression with Playwright

### 2. Responsive Design (Priority: HIGH)

- [ ] Test and fix 320px mobile layout
- [ ] Test and fix 375px mobile layout (iPhone SE)
- [ ] Test 768px tablet layout
- [ ] Test 1024px desktop layout
- [ ] Test 1440px+ large desktop layout
- [ ] Take screenshots at all breakpoints
- [ ] Add screenshots to README
- [ ] Ensure horizontal scrolling on mobile if needed
- [ ] Make header responsive with hamburger menu

### 3. Performance Optimization (Priority: HIGH)

- [ ] Run Lighthouse audit (mobile + desktop)
- [ ] Optimize images (convert to WebP, add sizes)
- [ ] Add virtualization for long lists (react-virtual)
- [ ] Code-split heavy components
- [ ] Lazy load modal content
- [ ] Add font preloading
- [ ] Minimize CSS/JS bundles
- [ ] Ensure <100ms interaction times
- [ ] Add performance monitoring

### 4. Testing (Priority: MEDIUM)

- [ ] Install Playwright
- [ ] Write visual regression tests
- [ ] Set up CI/CD with GitHub Actions
- [ ] Add unit tests for utils/formatters
- [ ] Add integration tests for table sorting
- [ ] Test error boundaries
- [ ] Test loading states
- [ ] Test WebSocket reconnection

### 5. Accessibility (Priority: MEDIUM)

- [ ] Add proper ARIA labels
- [ ] Test keyboard navigation
- [ ] Test screen reader support
- [ ] Add focus indicators
- [ ] Test with axe DevTools
- [ ] Ensure color contrast ratios
- [ ] Add skip-to-content link

### 6. Additional Features (Priority: LOW)

- [ ] Add filter dropdown
- [ ] Add search functionality
- [ ] Add pagination
- [ ] Add "New pairs" / "Final Stretch" / "Migrated" tabs
- [ ] Add chart preview on hover
- [ ] Add favorites/watchlist feature
- [ ] Add export to CSV
- [ ] Add dark/light theme toggle

### 7. Deployment (Priority: HIGH)

- [ ] Push to GitHub with clean commit history
- [ ] Set up Vercel project
- [ ] Configure environment variables (if needed)
- [ ] Test production build locally
- [ ] Deploy to Vercel
- [ ] Test deployed version
- [ ] Update README with live URL

### 8. Documentation & Video (Priority: HIGH)

- [ ] Record 1-2 minute demo video
- [ ] Upload to YouTube (unlisted or public)
- [ ] Add video link to README
- [ ] Add all responsive screenshots to README
- [ ] Document any trade-offs or limitations
- [ ] Add setup instructions
- [ ] Document component API

## 🐛 Known Issues to Fix

1. TypeScript errors in `TokenTable.tsx` and `TokenDetailModal.tsx` - need to properly type Redux state
2. Avatar component needs fallback image placeholder
3. Mock data needs more realistic values
4. Table needs horizontal scrolling on mobile
5. Need to add proper error handling for API failures

## 📝 Code Quality Improvements

- [ ] Add JSDoc comments to complex functions
- [ ] Add PropTypes or Zod validation
- [ ] Refactor long components
- [ ] Extract magic numbers to constants
- [ ] Add more comprehensive error messages
- [ ] Improve loading state UX

## 🎨 Design Improvements

- [ ] Match exact fonts from Axiom Trade
- [ ] Add subtle animations (micro-interactions)
- [ ] Improve table row hover effect
- [ ] Add token rank/position column
- [ ] Add mini price charts
- [ ] Add trending indicators

## 📊 Metrics to Track

- Lighthouse Performance: Target 90+
- Lighthouse Accessibility: Target 95+
- Bundle Size: Target <500KB initial load
- Time to Interactive: Target <3s
- First Contentful Paint: Target <1.5s

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build
npm run build
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Test (when added)
npm run test
npm run test:e2e
```

## 📦 Additional Packages to Consider

- `react-virtual` or `react-window` - for virtualization
- `framer-motion` - for advanced animations
- `@tanstack/react-virtual` - for table virtualization
- `recharts` or `lightweight-charts` - for mini charts
- `date-fns` - for date formatting
- `zod` - for runtime type validation

---

**Priority Order**: Visual Polish → Responsive Design → Performance → Deployment → Testing → Additional Features
