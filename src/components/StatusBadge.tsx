import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "pending" | "in_progress" | "resolved" | "rejected";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = {
    pending: { variant: "secondary" as const, label: "Pending", className: "" },
    in_progress: { variant: "default" as const, label: "In Progress", className: "" },
    resolved: { variant: "default" as const, label: "Resolved", className: "bg-success text-success-foreground" },
    rejected: { variant: "destructive" as const, label: "Rejected", className: "" },
  };

  const { variant, label, className } = config[status];

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
};