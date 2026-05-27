interface BadgeProps {
  level: "beginner" | "intermediate" | "advanced";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const levelConfig = {
  beginner: {
    label: "Beginner",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  intermediate: {
    label: "Intermediate",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  advanced: {
    label: "Advanced",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },
};

const sizeMap = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function Badge({
  level,
  size = "md",
  animated = false,
  className = "",
}: BadgeProps) {
  const config = levelConfig[level];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full border
        ${config.bg} ${config.text} ${config.border} ${sizeMap[size]}
        ${animated ? "animate-badge-pop" : ""}
        ${className}
      `}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export function getLevelFromScore(
  score: number,
  total: number
): "beginner" | "intermediate" | "advanced" {
  const percentage = (score / total) * 100;
  if (percentage >= 80) return "advanced";
  if (percentage >= 50) return "intermediate";
  return "beginner";
}
