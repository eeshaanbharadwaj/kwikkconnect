import React from 'react';
import TimelineEntry from './TimelineEntry';
import Icon from 'components/AppIcon';

const TimelineContainer = ({ entries, isLoading, hasMore, onLoadMore }) => {
  if (isLoading && entries.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3 text-muted-foreground">
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
          <span>Loading timeline...</span>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Clock" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Timeline Entries</h3>
        <p className="text-muted-foreground max-w-md">
          No activities match your current filters. Try adjusting your search criteria or date range.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Timeline Header */}
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Clock" size={16} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Case Timeline</h2>
          <p className="text-sm text-muted-foreground">
            Chronological view of all case activities and interactions
          </p>
        </div>
      </div>

      {/* Timeline Entries */}
      <div className="relative">
        {entries.map((entry, index) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            isLast={index === entries.length - 1 && !hasMore}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin">
                  <Icon name="Loader2" size={16} />
                </div>
                <span>Loading more...</span>
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} />
                <span>Load More Entries</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* End of Timeline Marker */}
      {!hasMore && entries.length > 0 && (
        <div className="flex items-center justify-center pt-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
            <span>End of timeline</span>
            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineContainer;