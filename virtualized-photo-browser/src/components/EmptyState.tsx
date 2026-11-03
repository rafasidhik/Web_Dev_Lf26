import type { ReactNode } from "react";

interface EmptyStateProps {
  readonly icon?: string;
  readonly title: string;
  readonly description: string;
  readonly isLoading?: boolean;
  readonly role?: string;
  readonly ariaLive?: "polite" | "assertive" | "off";
  readonly children?: ReactNode;
}

/**
 * Reusable empty, loading, or informative state placeholder.
 */
export function EmptyState({
  icon,
  title,
  description,
  isLoading = false,
  role = "status",
  ariaLive = "polite",
  children,
}: EmptyStateProps) {
  return (
    <div
      className={`empty-state ${isLoading ? "loading-state" : ""}`}
      role={role}
      aria-live={ariaLive}
    >
      {isLoading ? (
        <div className="spinner-large" aria-hidden="true" />
      ) : icon ? (
        <div className="empty-icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}

export default EmptyState;
