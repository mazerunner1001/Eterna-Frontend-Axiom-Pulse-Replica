/**
 * API client for fetching token data
 * Uses mock data for development
 */

import { TokenPair, TokenStatus } from '@/types';
import { generateMockTokens } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTokens = async (status?: TokenStatus): Promise<TokenPair[]> => {
  await delay(100); // Minimal delay for better mobile performance
  
  // Generate consistent token count (10 per category for all devices)
  const newPairs = generateMockTokens(10, 'new');
  const finalStretch = generateMockTokens(10, 'final-stretch');
  const migrated = generateMockTokens(10, 'migrated');
  
  // Combine all tokens
  return [...newPairs, ...finalStretch, ...migrated];
};

export const fetchTokenById = async (id: string): Promise<TokenPair | null> => {
  await delay(200);
  const tokens = await fetchTokens();
  return tokens.find((t) => t.id === id) || null;
};
