import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-smooth",
  {
    variants: {
      status: {
        todo: "bg-muted text-muted-foreground",
        "in-progress": "bg-primary/10 text-primary",
        review: "bg-warning/10 text-warning",
        done: "bg-success/10 text-success",
        blocked: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      status: "todo",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function StatusBadge({ className, status, children, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusVariants({ status }), className)} {...props}>
      <div className={cn(
        "h-2 w-2 rounded-full",
        status === "todo" && "bg-muted-foreground",
        status === "in-progress" && "bg-primary",
        status === "review" && "bg-warning",
        status === "done" && "bg-success",
        status === "blocked" && "bg-destructive"
      )} />
      {children}
    </span>
  );
}