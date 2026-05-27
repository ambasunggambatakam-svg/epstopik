"use client";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  color?: "primary" | "success" | "destructive" | "warning";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  showLabel?: boolean;
  label?: string;
}

const colorMap = {
  primary: "bg-primary",
  success: "bg-success",
  destructive: "bg-destructive",
  warning: "bg-warning",
};

const sizeMap = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  className = "",
  color = "primary",
  size = "md",
  animated = true,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-xs font-bold text-muted-foreground">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeMap[size]}`}
      >
        <div
          className={`${colorMap[color]} ${sizeMap[size]} rounded-full transition-all duration-1000 ease-out ${animated ? "animate-progress-fill" : ""}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
