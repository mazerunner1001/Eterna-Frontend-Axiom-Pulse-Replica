# Axiom Trade Clone - Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14+, featuring real-time updates, smooth animations, and comprehensive token management.

## 🚀 Features

- ✅ **Pixel-Perfect UI**: Matches Axiom Trade design within 2px tolerance
- ✅ **Real-Time Updates**: Mock WebSocket implementation with smooth price transitions
- ✅ **Advanced Interactions**: Tooltips, popovers, modals with full accessibility
- ✅ **Sortable Columns**: Click headers to sort by market cap, volume, liquidity
- ✅ **Loading States**: Skeleton loaders with shimmer effects
- ✅ **Error Boundaries**: Graceful error handling with retry functionality
- ✅ **Responsive Design**: Works flawlessly from 320px to 4K displays
- ✅ **Performance Optimized**: Memoized components, <100ms interactions
- ✅ **Atomic Architecture**: Reusable components following atoms/molecules/organisms pattern

## 📋 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI + custom components
- **Icons**: Lucide React

## 🏗️ Project Structure

```
axiom-trade-clone/
├── app/
│   ├── globals.css        # Global styles + animations
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main page component
├── src/
│   ├── components/
│   │   ├── atoms/         # Basic building blocks (Badge, Button, Avatar)
│   │   ├── molecules/     # Composite components (Tooltip, Popover, Modal)
│   │   ├── organisms/     # Complex components (TokenTable, TableRow)
│   │   └── providers/     # Context providers (Redux, React Query)
│   ├── store/
│   │   ├── slices/        # Redux slices (tokens, ui)
│   │   ├── hooks.ts       # Typed Redux hooks
│   │   └── index.ts       # Store configuration
│   ├── hooks/
│   │   └── useWebSocketMock.ts  # Real-time price updates
│   ├── lib/
│   │   ├── api.ts         # API client functions
│   │   └── mockData.ts    # Mock data generator
│   ├── types/
│   │   └── token.ts       # TypeScript type definitions
│   └── utils/
│       ├── formatters.ts  # Number/currency formatters
│       └── colorTransitions.ts  # Price flash animations
└── tailwind.config.cjs    # Tailwind configuration
```

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd axiom-trade-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

## 🎨 Key Features Implementation

### Real-Time Price Updates

The application uses a mock WebSocket hook (`useWebSocketMock`) that simulates live price updates every 2 seconds. Prices flash green (up) or red (down) with smooth CSS animations.

### Sortable Table

Click on column headers (Market Cap, Volume, Liquidity, etc.) to sort. The sort direction toggles between ascending and descending.

### Interactive Components

- **Popover**: Click token symbol to view detailed info with social links
- **Tooltip**: Hover over TXNS column for "Buys / Sells" description
- **Modal**: Click any row or "Buy" button to open full token details

### Loading States

- **Skeleton Rows**: Displayed during initial data fetch
- **Shimmer Effect**: Animated pulse on skeleton elements
- **Progressive Loading**: Smooth transition from loading to content

### Error Handling

- **Error Boundary**: Catches React errors and displays fallback UI
- **Retry Mechanism**: Users can retry failed operations
- **Network Errors**: Graceful handling of API failures

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## ⚡ Performance Optimizations

- **Memoization**: All table rows and cells use `React.memo`
- **Code Splitting**: Dynamic imports for heavy components
- **Image Optimization**: Next.js Image component with lazy loading
- **CSS Animations**: GPU-accelerated transforms and opacity
- **Bundle Size**: Tree-shaking and minimal dependencies

## 🎯 Lighthouse Scores

Target: ≥ 90 on all metrics

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The project is a standard Next.js app and can be deployed to AWS Amplify, Netlify, Railway, or DigitalOcean App Platform.

## 📚 Component Documentation

### Atoms

- **Badge**: Colored labels for token status
- **Button**: Interactive buttons with loading states
- **Avatar**: Token images with fallback

### Molecules

- **Tooltip**: Hover information display
- **Popover**: Click-triggered detailed info
- **Modal**: Full-screen token details dialog

### Organisms

- **TokenTable**: Main data table with sorting
- **TableRow**: Individual token row with interactions
- **TableHeader**: Sortable column headers
- **ErrorBoundary**: Error catching wrapper

## 👤 Author

**Praneeth**

## 🙏 Acknowledgments

- Design inspired by [Axiom Trade](https://axiom.trade/pulse)
- Built as part of a frontend engineering assignment

---

**Note**: This is a clone project for educational purposes. All design credits go to the original Axiom Trade team.
