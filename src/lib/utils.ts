import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID using the cryptographically secure crypto.randomUUID()
 */
export function generateId(): string {
  return crypto.randomUUID();
}
