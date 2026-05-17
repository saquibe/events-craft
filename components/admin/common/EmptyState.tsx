"use client";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground text-lg">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
}
