/**
 * Prisma Client Singleton
 * 
 * Prevents multiple Prisma client instances during development
 * and hot reloading.
 * 
 * In development:
 * - The connection is cached to prevent exhausting connections
 * - During hot reload, we return the cached client
 * 
 * @see https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
 */

import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined
}

// Create a single PrismaClient instance
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
})

// In development, cache the client to prevent exhaustion
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
