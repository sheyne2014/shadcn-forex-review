"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronDown } from 'lucide-react';

interface ProgressiveLoaderProps<T> {
  loadData: (page: number, limit: number) => Promise<T[]>;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  initialLimit?: number;
  loadMoreLimit?: number;
  threshold?: number;
  className?: string;
  emptyMessage?: string;
  errorMessage?: string;
}

export function ProgressiveLoader<T>({
  loadData,
  renderItem,
  renderSkeleton,
  initialLimit = 10,
  loadMoreLimit = 10,
  threshold = 0.8,
  className = '',
  emptyMessage = 'No items found',
  errorMessage = 'Failed to load items'
}: ProgressiveLoaderProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMoreData();
        }
      },
      { threshold }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadingMore, threshold]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const newItems = await loadData(0, initialLimit);
      setItems(newItems);
      setPage(1);
      setHasMore(newItems.length === initialLimit);
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      setError(null);
      
      const newItems = await loadData(page, loadMoreLimit);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(newItems.length === loadMoreLimit);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessage);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadMoreLimit, hasMore, loadingMore, loadData, errorMessage]);

  const retry = () => {
    if (items.length === 0) {
      loadInitialData();
    } else {
      loadMoreData();
    }
  };

  const DefaultSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className={className}>
        {renderSkeleton ? renderSkeleton() : <DefaultSkeleton />}
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Render items */}
      <div className="space-y-4">
        {items.map((item, index) => renderItem(item, index))}
      </div>

      {/* Load more section */}
      {hasMore && (
        <div ref={loadMoreRef} className="mt-8 text-center">
          {loadingMore ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading more...</span>
            </div>
          ) : (
            <Button
              onClick={loadMoreData}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <span>Load More</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Error state for load more */}
      {error && items.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-destructive text-sm mb-2">{error}</p>
          <Button onClick={retry} variant="outline" size="sm">
            Retry
          </Button>
        </div>
      )}

      {/* End of list indicator */}
      {!hasMore && items.length > 0 && (
        <div className="mt-8 text-center text-muted-foreground text-sm">
          You've reached the end of the list
        </div>
      )}
    </div>
  );
}

// Specialized progressive loader for brokers
interface BrokerProgressiveLoaderProps {
  categoryId?: string;
  searchQuery?: string;
  className?: string;
}

export function BrokerProgressiveLoader({
  categoryId,
  searchQuery,
  className
}: BrokerProgressiveLoaderProps) {
  const loadBrokers = async (page: number, limit: number) => {
    const offset = page * limit;
    
    // This would be replaced with actual API call
    const response = await fetch(`/api/brokers?offset=${offset}&limit=${limit}&category=${categoryId || ''}&search=${searchQuery || ''}`);
    
    if (!response.ok) {
      throw new Error('Failed to load brokers');
    }
    
    const data = await response.json();
    return data.brokers || [];
  };

  const renderBroker = (broker: any, index: number) => (
    <div key={broker.id || index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
          {broker.logo_url ? (
            <img src={broker.logo_url} alt={broker.name} className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-sm font-semibold">{broker.name?.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{broker.name}</h3>
          <p className="text-sm text-muted-foreground">{broker.description}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm">Rating: {broker.rating}/5</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">Min Deposit: ${broker.min_deposit}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrokerSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <ProgressiveLoader
      loadData={loadBrokers}
      renderItem={renderBroker}
      renderSkeleton={renderBrokerSkeleton}
      className={className}
      emptyMessage="No brokers found matching your criteria"
      errorMessage="Failed to load brokers. Please try again."
    />
  );
}
