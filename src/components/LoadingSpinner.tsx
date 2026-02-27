import { Loader2 } from 'lucide-react';

import { cn } from '../lib/utils';

export interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return <Loader2 className={cn('animate-spin text-blue-500', className)} />;
}
