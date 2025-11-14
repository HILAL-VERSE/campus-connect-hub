import { Badge } from "@/components/ui/badge";
import { AlertCircle, Circle } from "lucide-react";

interface PriorityBadgeProps {
  priority: "urgent" | "normal" | "low";
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = {
    urgent: { 
      variant: "destructive" as const, 
      label: "Urgent", 
      icon: AlertCircle,
      className: ""
    },
    normal: { 
      variant: "default" as const, 
      label: "Normal",
      icon: Circle,
      className: "bg-warning text-warning-foreground"
    },
    low: { 
      variant: "secondary" as const, 
      label: "Low",
      icon: Circle,
      className: ""
    },
  };

  const { variant, label, icon: Icon, className } = config[priority];

  return (
    <Badge variant={variant} className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};