import { Loader2 } from 'lucide-react';
import React from 'react';

import { cn } from '../lib/utils';

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return <Loader2 className={cn('animate-spin text-blue-500', className)} />;
}
