import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const priorityVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-smooth",
  {
    variants: {
      priority: {
        critical: "bg-destructive/10 text-destructive ring-destructive/20",
        high: "bg-priority-high/10 text-priority-high ring-priority-high/20",
        medium: "bg-priority-medium/10 text-priority-medium ring-priority-medium/20",
        low: "bg-priority-low/10 text-priority-low ring-priority-low/20",
        minimal: "bg-muted text-muted-foreground ring-border",
      },
    },
    defaultVariants: {
      priority: "medium",
    },
  }
);

interface PriorityBadgeProps extends VariantProps<typeof priorityVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function PriorityBadge({ className, priority, children, ...props }: PriorityBadgeProps) {
  return (
    <span className={cn(priorityVariants({ priority }), className)} {...props}>
      <div className={cn(
        "h-2 w-2 rounded-full",
        priority === "critical" && "bg-destructive",
        priority === "high" && "bg-priority-high",
        priority === "medium" && "bg-priority-medium",
        priority === "low" && "bg-priority-low",
        priority === "minimal" && "bg-muted-foreground"
      )} />
      {children}
    </span>
  );
}