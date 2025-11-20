/**
 * Token Card Grid - Pixel-perfect Axiom Trade Pulse Page Replica
 * Three independently scrollable columns: New Pairs | Final Stretch | Migrated
 */

'use client';

import React from 'react';
import { TokenPair } from '@/types';
import { 
  TrendingDown, 
  Users, 
  Globe,
  ExternalLink,
  Zap,
  Activity,
  CheckCircle2,
  Flame,
  Music2,
  AlertCircle,
  Droplets
} from 'lucide-react';
import { Tooltip } from '../molecules/Tooltip';
import { useAppSelector } from '@/store/hooks';

interface TokenCardGridProps {
  tokens: TokenPair[];
  isLoading?: boolean;
  globalSortBy?: 'mc' | 'volume' | 'price' | 'age';
  mobileTab?: 'new' | 'final-stretch' | 'migrated';
}

const formatNumber = (num: number) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num.toFixed(2)}`;
};

const formatCompact = (num: number) => {
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

const formatPrice = (price: number) => {
  if (price < 0.000001) return `$${price.toFixed(9)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
};

const TokenCard: React.FC<{ token: TokenPair }> = React.memo(({ token }) => {
  const priceUpdate = useAppSelector((state) => state.tokens.priceUpdates[token.id]);
  const isPositive = token.priceChange24h >= 0;
  
  // Use updated price if available, otherwise use token price
  const currentPrice = priceUpdate?.price ?? token.price;
  const priceDirection = priceUpdate?.direction;
  
  // Random percentage values for indicators
  const percentages = {
    p1: Math.floor(Math.random() * 70),
    p2: Math.floor(Math.random() * 30),
    p3: Math.floor(Math.random() * 90),
    p4: Math.floor(Math.random() * 90),
    p5: Math.floor(Math.random() * 30),
  };

  // Dynamic status badges with pill styling
  const statusBadges = [
    { label: `${percentages.p1}%`, color: percentages.p1 > 30 ? 'text-red-500' : 'text-emerald-500', tooltip: 'Top Holder %' },
    { label: `${percentages.p2}%`, color: percentages.p2 > 15 ? 'text-emerald-500' : 'text-red-500', tooltip: 'Liquidity Score' },
    { label: 'DS', color: 'text-blue-400', tooltip: 'Developer Status' },
    { label: `${percentages.p3}%`, color: percentages.p3 > 40 ? 'text-emerald-500' : 'text-red-500', tooltip: 'Holder Distribution' },
    { label: `${percentages.p4}%`, color: percentages.p4 > 40 ? 'text-emerald-500' : 'text-red-500', tooltip: 'Burn Rate' },
    { label: `${percentages.p5}%`, color: percentages.p5 > 15 ? 'text-red-500' : 'text-emerald-500', tooltip: 'Whale Activity' },
  ];

  return (
    <div className="bg-[#111111] border-b border-r border-[#1f2937]/50 hover:bg-[#151515] active:bg-[#1a1a1a] transition-all cursor-pointer px-2 sm:px-4 py-2 flex gap-2 sm:gap-2.5 group card-shimmer">
      {/* Left Column: Image + Username (takes full height) */}
      <div className="shrink-0 flex flex-col justify-between">
        <div className="relative">
          <img 
            src={token.image} 
            alt={token.symbol}
            loading="lazy"
            decoding="async"
            className="w-[60px] h-[60px] sm:w-[76px] sm:h-[76px] rounded-md object-cover border-2 border-green-500 group-hover:border-green-400 transition-colors"
          />
          <Tooltip content="Verified Token">
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-600 rounded-full border-2 border-[#111111] flex items-center justify-center">
              <Music2 className="w-2.5 h-2.5 text-white" />
            </div>
          </Tooltip>
        </div>
        <div className="text-gray-500 text-[11px] text-center mt-0.5">
          {token.symbol.slice(0, 4)}...pump
        </div>
      </div>

      {/* Right Content: Token Info + Stats + Badges */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Top Row: Name/Details | Stats */}
        <div className="flex items-start justify-between gap-2 mb-1">
          {/* Token Info */}
          <div className="flex-1 min-w-0">
            {/* Symbol + Full Name */}
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              <h3 className="font-bold text-white text-[17px] hover:text-blue-400 transition-colors">{token.symbol}</h3>
              <span className="text-gray-500 text-[15px] truncate font-semibold">{token.name}</span>
              {token.badges.some(b => b.type === 'verified') && (
                <Tooltip content="Verified Token">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                </Tooltip>
              )}
            </div>
            
            {/* Age + Icons Row */}
            <div className="flex items-center gap-2.5 text-xs">
              <Tooltip content="Token Age">
                <span className="text-teal-400 font-semibold text-[13px]">{token.age}</span>
              </Tooltip>
              <Tooltip content="Social Links">
                <button className="hover:opacity-80 transition-opacity">
                  <Users className="w-4 h-4 text-blue-400 hover:text-gray-400" />
                </button>
              </Tooltip>
              <Tooltip content="Website">
                <button className="hover:opacity-80 transition-opacity">
                  <Globe className="w-4 h-4 text-white hover:text-gray-400" />
                </button>
              </Tooltip>
              <Tooltip content="Explorer">
                <button className="hover:opacity-80 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-white hover:text-gray-400" />
                </button>
              </Tooltip>
              <Tooltip content="Community">
                <button className="hover:opacity-80 transition-opacity">
                  <Users className="w-4 h-4 text-gray-400 hover:text-gray-400" />
                </button>
              </Tooltip>
              <Tooltip content="Total Holders">
                <span className="text-white text-[13px] font-semibold">{token.holders}</span>
              </Tooltip>
              <Tooltip content="Activity">
                <button className="hover:opacity-80 transition-opacity">
                  <Activity className="w-4 h-4 text-gray-400 hover:text-gray-400" />
                </button>
              </Tooltip>
              <Tooltip content="Total Transactions">
                <span className="text-white text-[13px] font-semibold">{token.txns.buys + token.txns.sells}</span>
              </Tooltip>
            </div>
          </div>

          {/* Right: Stats Column */}
          <div className="text-right shrink-0 space-y-0">
            <Tooltip content="Market Cap">
              <div className={`flex items-center justify-end gap-1.5 transition-all duration-300 ${
                priceDirection === 'up' ? 'price-flash-up' : priceDirection === 'down' ? 'price-flash-down' : ''
              }`}>
                <span className="text-gray-600 text-[12px] font-bold">MC</span>
                <span className={`font-bold text-[15px] transition-colors ${
                  priceDirection === 'up' ? 'text-yellow-300' : priceDirection === 'down' ? 'text-yellow-500' : 'text-yellow-400'
                }`}>{formatNumber(token.marketCap)}</span>
              </div>
            </Tooltip>
            <Tooltip content="24h Volume">
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-gray-600 text-[11px] font-bold">V</span>
                <span className="text-white font-semibold text-[15px]">{formatNumber(token.volume24h)}</span>
              </div>
            </Tooltip>
            <Tooltip content={`F-Score: 1.563 | TX Count: ${token.txns.buys + token.txns.sells}`}>
              <div className="flex items-center gap-1.5 justify-end text-[10px] bg-[#0a0a0a] px-1.5 py-0.5 rounded">
                <span className="text-gray-600 text-[10px] font-bold">F</span>
                <svg className="w-3 h-3" viewBox="0 0 397.7 311.7">
                  <defs>
                    <linearGradient id={`solGrad-${token.id}`} x1="360.88" y1="351.46" x2="-263.33" y2="-351.46" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#00ffa3"/>
                      <stop offset="1" stopColor="#dc1fff"/>
                    </linearGradient>
                  </defs>
                  <path fill={`url(#solGrad-${token.id})`} d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"/>
                  <path fill={`url(#solGrad-${token.id})`} d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"/>
                  <path fill={`url(#solGrad-${token.id})`} d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z"/>
                </svg>
                <span className="text-white font-semibold text-[13px]">1.563</span>
                <span className="text-gray-500 text-[10px] font-bold">TX</span>
                <span className="text-white text-[13px] font-semibold"> {token.txns.buys + token.txns.sells}</span>
                <div className="w-8 h-0.5 bg-gray-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: '60%' }} />
                  <div className="h-full bg-red-500" style={{ width: '40%' }} />
                </div>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Bottom Row: Status Badges | Button */}
        <div className="flex items-center justify-between gap-2 overflow-hidden mt-auto">
          {/* Status Badges Row - Pills */}
          <div className="flex items-center gap-1.5 text-xs font-semibold shrink min-w-0 overflow-x-hidden">
            {statusBadges.map((badge, idx) => (
              <Tooltip key={idx} content={badge.tooltip}>
                <div 
                  className={`px-2 py-0.5 bg-black rounded-full flex items-center gap-1 ${badge.color} hover:bg-black/80 transition-all cursor-help shrink-0`}
                >
                  {idx === 0 && <Users className="w-3 h-3" />}
                  {idx === 1 && <Activity className="w-3 h-3" />}
                  {idx === 3 && <TrendingDown className="w-3 h-3" />}
                  {idx === 4 && <AlertCircle className="w-3 h-3" />}
                  {idx === 5 && <Droplets className="w-3 h-3" />}
                  <span className="text-[11px]">{badge.label}</span>
                </div>
              </Tooltip>
            ))}
          </div>

          {/* Action Button */}
          <Tooltip content="Quick Trade">
            <button 
              className="px-2.5 py-0.5 bg-blue-600 hover:bg-blue-400 text-white text-[13px] font-bold rounded-full flex items-center justify-center gap-1 transition-all shrink-0 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Zap className="w-3.5 h-3.5 text-black" />
              <span className="whitespace-nowrap text-black">0 SOL</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';

interface ColumnHeaderProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = React.memo(({ title, count, icon }) => {
  const [activeTab, setActiveTab] = React.useState<'P1' | 'P2' | 'P3'>('P1');

  return (
    <div className="flex items-center justify-between px-3 py-2.5 bg-[#111111] border-b border-r border-[#1f2937]/50">
      <h2 className="text-base font-semibold text-white">
        {title}
      </h2>
      
      <div className="flex items-center gap-2">
        {/* Sort/Filter Icon - separate from pill */}
        <button className="hover:opacity-80 transition-opacity">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        </button>
        
        {/* Pill-shaped control bar */}
        <div className="flex items-center gap-0 bg-[#0a0a0a] rounded-full px-3 py-1.5 border border-gray-800/50">
        {/* Left section: Lightning + Count */}
        <div className="flex items-center gap-1.5 mx-2">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span className="text-white text-xs font-semibold">0</span>
        </div>

        {/* Center section: Solana logo */}
        <div className="flex items-center gap-2 px-3">
          <svg className="w-4 h-4" viewBox="0 0 397.7 311.7">
            <defs>
              <linearGradient id="solGradient" x1="360.88" y1="351.46" x2="-263.33" y2="-351.46" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00ffa3"/>
                <stop offset="1" stopColor="#dc1fff"/>
              </linearGradient>
            </defs>
            <path fill="url(#solGradient)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"/>
            <path fill="url(#solGradient)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"/>
            <path fill="url(#solGradient)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z"/>
          </svg>
        </div>

        {/* Vertical divider */}
        <div className="w-px h-4 bg-gray-700/50" />

        {/* Tabs section */}
        <div className="flex items-center gap-0 px-3">
          <button
            onClick={() => setActiveTab('P1')}
            className={`px-1.5 py-0.5 text-xs font-semibold transition-colors ${
              activeTab === 'P1' 
                ? 'text-blue-500' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            P1
          </button>
          <button
            onClick={() => setActiveTab('P2')}
            className={`px-1.5 py-0.5 text-xs font-semibold transition-colors ${
              activeTab === 'P2' 
                ? 'text-blue-500' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            P2
          </button>
          <button
            onClick={() => setActiveTab('P3')}
            className={`px-1.5 py-0.5 text-xs font-semibold transition-colors ${
              activeTab === 'P3' 
                ? 'text-blue-500' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            P3
          </button>
        </div>

          {/* Right section: Settings icon with notification dot */}
          <div className="flex items-center gap-2">
            <button className="relative hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {/* Blue notification dot - top right corner */}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ColumnHeader.displayName = 'ColumnHeader';

export const TokenCardGrid: React.FC<TokenCardGridProps> = ({ tokens, isLoading, globalSortBy = 'mc', mobileTab = 'new' }) => {
  const [activeTab, setActiveTab] = React.useState<'new' | 'final-stretch' | 'migrated'>('new');
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRefSm = React.useRef<HTMLDivElement>(null);
  
  // Reset scroll position when tab changes
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);
  
  // Reset scroll position for small screens when mobileTab changes
  React.useEffect(() => {
    if (scrollContainerRefSm.current) {
      scrollContainerRefSm.current.scrollTop = 0;
    }
  }, [mobileTab]);
  
  // Sort function
  const sortTokens = (tokens: TokenPair[], sortKey: 'mc' | 'volume' | 'price' | 'age') => {
    return [...tokens].sort((a, b) => {
      switch (sortKey) {
        case 'mc':
          return b.marketCap - a.marketCap;
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'price':
          return b.price - a.price;
        case 'age':
          // Parse age string (e.g., "5m", "2h", "1d")
          const parseAge = (age: string) => {
            const value = parseInt(age);
            const unit = age.slice(-1);
            if (unit === 's') return value;
            if (unit === 'm') return value * 60;
            if (unit === 'h') return value * 3600;
            if (unit === 'd') return value * 86400;
            return 0;
          };
          return parseAge(a.age) - parseAge(b.age);
        default:
          return 0;
      }
    });
  };
  
  // Divide tokens into three categories and sort them
  const newPairs = sortTokens(tokens.filter(t => t.status === 'new'), globalSortBy);
  const finalStretch = sortTokens(tokens.filter(t => t.status === 'final-stretch'), globalSortBy);
  const migrated = sortTokens(tokens.filter(t => t.status === 'migrated'), globalSortBy);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-hidden min-h-0 mb-6 flex flex-col">
        {/* Mobile Tabs - Loading State (md to lg: inside) */}
        <div className="hidden md:flex lg:hidden gap-2 bg-[#0a0a0a] p-2 rounded-t-lg border-b border-gray-800/50 shrink-0">
          <button className="flex-1 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg font-semibold text-sm border border-gray-700">New Pairs</button>
          <button className="flex-1 px-4 py-2 text-gray-400 rounded-lg font-semibold text-sm">Final Stretch</button>
          <button className="flex-1 px-4 py-2 text-gray-400 rounded-lg font-semibold text-sm">Migrated</button>
        </div>
        
        {/* Medium screens: Single column with tabs */}
        <div className="hidden md:block lg:hidden flex-1 overflow-hidden min-h-0">
          <div className="bg-[#111111] border border-[#1f2937]/50 flex flex-col h-full rounded-b-lg">
            <div className="flex-1 overflow-hidden space-y-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[120px] bg-[#1a1a1a] border-b border-r border-[#1f2937]/50 animate-pulse p-2 flex gap-2.5">
                  <div className="w-[76px] h-[76px] bg-[#222222] rounded-md" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-[#222222] rounded" />
                      <div className="h-3 w-48 bg-[#222222] rounded" />
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="h-6 w-12 bg-[#222222] rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Small screens: Single column */}
        <div className="md:hidden flex-1 overflow-hidden min-h-0">
          <div className="bg-[#111111] border border-[#1f2937]/50 flex flex-col h-full rounded-lg">
            <div className="flex-1 overflow-hidden space-y-0">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[120px] bg-[#1a1a1a] border-b border-r border-[#1f2937]/50 animate-pulse p-2 flex gap-2.5">
                  <div className="w-[76px] h-[76px] bg-[#222222] rounded-md" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-[#222222] rounded" />
                      <div className="h-3 w-48 bg-[#222222] rounded" />
                    </div>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="h-6 w-12 bg-[#222222] rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Desktop: 3 Columns */}
        <div className="hidden lg:grid grid-cols-3 gap-0 flex-1 overflow-hidden min-h-0 rounded-lg">
          {Array.from({ length: 3 }).map((_, colIdx) => (
            <div key={colIdx} className={`bg-[#111111] border-l border-t border-[#1f2937]/50 flex flex-col min-h-0 ${colIdx === 0 ? 'rounded-tl-lg rounded-bl-lg' : colIdx === 2 ? 'rounded-tr-lg rounded-br-lg' : ''}`}>
              <div className="h-16 bg-[#1a1a1a] border-b border-[#1f2937]/50 animate-pulse" />
              <div className="flex-1 overflow-hidden space-y-0">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-[120px] bg-[#1a1a1a] border-b border-r border-[#1f2937]/50 animate-pulse p-2 flex gap-2.5">
                    <div className="w-[76px] h-[76px] bg-[#222222] rounded-md" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-[#222222] rounded" />
                        <div className="h-3 w-48 bg-[#222222] rounded" />
                      </div>
                      <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div key={j} className="h-6 w-12 bg-[#222222] rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Get active tokens for medium screens (md-lg)
  const getActiveTokensMd = () => {
    switch (activeTab) {
      case 'new': return newPairs;
      case 'final-stretch': return finalStretch;
      case 'migrated': return migrated;
      default: return newPairs;
    }
  };
  
  // Get active tokens for small screens (<md)
  const getActiveTokensSm = () => {
    switch (mobileTab) {
      case 'new': return newPairs;
      case 'final-stretch': return finalStretch;
      case 'migrated': return migrated;
      default: return newPairs;
    }
  };

  return (
    <div className="flex-1 overflow-hidden min-h-0 mb-6 flex flex-col">
      {/* Mobile Tab Navigation (md to lg: inside grid, sm: outside in parent) */}
      <div className="hidden md:flex lg:hidden gap-2 bg-[#0a0a0a] p-2 rounded-t-lg border-b border-gray-800/50 shrink-0">
        <button 
          onClick={() => setActiveTab('new')}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
            activeTab === 'new' 
              ? 'bg-[#1a1a1a] text-white border border-gray-700' 
              : 'text-gray-400 hover:text-white hover:bg-[#151515]'
          }`}
        >
          New Pairs
        </button>
        <button 
          onClick={() => setActiveTab('final-stretch')}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
            activeTab === 'final-stretch' 
              ? 'bg-[#1a1a1a] text-white border border-gray-700' 
              : 'text-gray-400 hover:text-white hover:bg-[#151515]'
          }`}
        >
          Final Stretch
        </button>
        <button 
          onClick={() => setActiveTab('migrated')}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
            activeTab === 'migrated' 
              ? 'bg-[#1a1a1a] text-white border border-gray-700' 
              : 'text-gray-400 hover:text-white hover:bg-[#151515]'
          }`}
        >
          Migrated
        </button>
      </div>

      {/* Mobile: Single Column with Tab Content (md to lg) */}
      <div className="hidden md:block lg:hidden flex-1 overflow-hidden min-h-0">
        <div className="bg-[#111111] border border-[#1f2937]/50 flex flex-col h-full rounded-b-lg">
          <div ref={scrollContainerRef} className="overflow-y-auto scrollbar-thin flex-1 space-y-0">
            {getActiveTokensMd().map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Small screens: Single Column (< md) - tabs are in parent */}
      <div className="md:hidden flex-1 overflow-hidden min-h-0">
        <div className="bg-[#111111] border border-[#1f2937]/50 flex flex-col h-full rounded-lg">
          <div ref={scrollContainerRefSm} className="overflow-y-auto scrollbar-thin flex-1 space-y-0">
            {getActiveTokensSm().map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: 3 Columns Side by Side */}
      <div className="hidden lg:grid grid-cols-3 gap-0 flex-1 overflow-hidden min-h-0 mb-6 rounded-lg">
        {/* New Pairs Column */}
        <div className="bg-[#111111] border-l border-t border-[#1f2937]/50 flex flex-col min-h-0 rounded-tl-lg rounded-bl-lg">
          <ColumnHeader 
            title="New Pairs" 
            count={newPairs.length}
            icon={<Zap className="w-4 h-4 text-yellow-400" />}
          />
          <div className="overflow-y-auto scrollbar-thin flex-1 space-y-0">
            {newPairs.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>

        {/* Final Stretch Column */}
        <div className="bg-[#111111] border-l border-t border-[#1f2937]/50 flex flex-col min-h-0">
          <ColumnHeader 
            title="Final Stretch" 
            count={finalStretch.length}
            icon={<Flame className="w-4 h-4 text-yellow-400" />}
          />
          <div className="overflow-y-auto scrollbar-thin flex-1 space-y-0">
            {finalStretch.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>

        {/* Migrated Column */}
        <div className="bg-[#111111] border-l border-t border-[#1f2937]/50 flex flex-col min-h-0 rounded-tr-lg rounded-br-lg">
          <ColumnHeader 
            title="Migrated" 
            count={migrated.length}
            icon={<CheckCircle2 className="w-4 h-4 text-green-400" />}
          />
          <div className="overflow-y-auto scrollbar-thin flex-1 space-y-0">
            {migrated.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

TokenCardGrid.displayName = 'TokenCardGrid';
