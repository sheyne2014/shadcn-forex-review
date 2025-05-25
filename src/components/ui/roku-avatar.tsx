"use client";

import React from 'react';
import { Bot, Sparkles, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RokuAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient' | 'professional' | 'animated';
  className?: string;
}

export function RokuAvatar({ 
  size = 'md', 
  variant = 'professional',
  className 
}: RokuAvatarProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6', 
    xl: 'h-8 w-8'
  };

  const baseClasses = cn(
    'relative flex items-center justify-center rounded-full overflow-hidden',
    sizeClasses[size],
    className
  );

  if (variant === 'professional') {
    return (
      <div className={cn(
        baseClasses,
        'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-lg'
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20" />
        <Bot className={cn(iconSizes[size], 'text-white relative z-10')} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={cn(
        baseClasses,
        'bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600'
      )}>
        <Sparkles className={cn(iconSizes[size], 'text-white')} />
      </div>
    );
  }

  if (variant === 'animated') {
    return (
      <div className={cn(
        baseClasses,
        'bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 animate-pulse'
      )}>
        <div className="absolute inset-0 animate-spin-slow">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        <Brain className={cn(iconSizes[size], 'text-white relative z-10')} />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      baseClasses,
      'bg-gradient-to-br from-blue-400 to-indigo-600'
    )}>
      <Zap className={cn(iconSizes[size], 'text-white')} />
    </div>
  );
}

// Professional AI Assistant Logo Component
export function RokuLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <RokuAvatar size="lg" variant="professional" />
      <div className="flex flex-col">
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ROKU AI
        </span>
        <span className="text-xs text-muted-foreground">
          Your Trading Assistant
        </span>
      </div>
    </div>
  );
}

// Floating Action Button with Professional Design
export function RokuFAB({ 
  onClick, 
  notificationCount = 0,
  className 
}: { 
  onClick: () => void;
  notificationCount?: number;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <button
        onClick={onClick}
        className="group relative h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
        
        {/* Main content */}
        <div className="relative flex flex-col items-center justify-center h-full text-white">
          <Bot className="h-6 w-6 mb-1" />
          <span className="text-xs font-semibold">ROKU</span>
        </div>
        
        {/* Notification badge */}
        {notificationCount > 0 && (
          <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-bounce shadow-lg">
            {notificationCount}
          </div>
        )}
        
        {/* Subtle border */}
        <div className="absolute inset-0 rounded-2xl border border-white/20" />
      </button>
    </div>
  );
}
