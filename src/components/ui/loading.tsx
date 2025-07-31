import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loading = ({ className, size = 'md' }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        {/* Outer rotating ring */}
        <div 
          className={cn(
            'rounded-full border-2 border-transparent border-t-primary animate-spin',
            sizeClasses[size]
          )}
        />
        
        {/* Inner pulsing dot */}
        <div 
          className={cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'w-2 h-2 bg-primary rounded-full animate-pulse-glow',
            size === 'sm' && 'w-1.5 h-1.5',
            size === 'lg' && 'w-3 h-3'
          )}
        />
        
        {/* Orbiting particles */}
        <div className={cn('absolute inset-0 animate-spin', size === 'sm' && 'hidden')}>
          <div className="absolute -top-1 left-1/2 w-1 h-1 bg-accent rounded-full transform -translate-x-1/2 animate-pulse" />
          <div className="absolute top-1/2 -right-1 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-accent rounded-full transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 -left-1 w-1 h-1 bg-accent rounded-full transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </div>
  );
};

export const LoadingOverlay = ({ className }: { className?: string }) => (
  <div className={cn('fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50', className)}>
    <div className="text-center space-y-4">
      <Loading size="lg" />
      <p className="text-foreground-muted animate-pulse">Loading...</p>
    </div>
  </div>
);