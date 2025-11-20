/**
 * API client for fetching token data
 * Uses mock data for development
 */

import { TokenPair, TokenStatus } from '@/types';
import { generateMockTokens } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTokens = async (status?: TokenStatus): Promise<TokenPair[]> => {
  await delay(50); // Minimal delay for better mobile performance
  
  // Generate fewer tokens for better mobile performance (5 per category = 15 total)
  const newPairs = generateMockTokens(5, 'new');
  const finalStretch = generateMockTokens(5, 'final-stretch');
  const migrated = generateMockTokens(5, 'migrated');
  
  // Combine all tokens
  return [...newPairs, ...finalStretch, ...migrated];
};

export const fetchTokenById = async (id: string): Promise<TokenPair | null> => {
  await delay(200);
  const tokens = await fetchTokens();
  return tokens.find((t) => t.id === id) || null;
};
