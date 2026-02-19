import { cn } from '../../lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'flex h-8 items-center justify-between border-t border-gray-800 bg-gray-950 px-4 text-xs text-gray-500',
        className,
      )}
    >
      <div>Running in local mode</div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-gray-300">
          GitHub
        </a>
        <a href="#" className="hover:text-gray-300">
          Report Issue
        </a>
      </div>
    </footer>
  );
}
