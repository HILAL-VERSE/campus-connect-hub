import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { ComplaintProgress } from "./ComplaintProgress";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Lightbulb } from "lucide-react";
import { format } from "date-fns";

interface ComplaintCardProps {
  complaint: {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: "urgent" | "normal" | "low";
    status: "pending" | "in_progress" | "resolved" | "rejected";
    progress: number;
    is_anonymous: boolean;
    is_initiative: boolean;
    created_at: string;
  };
  onClick?: () => void;
}

export const ComplaintCard = ({ complaint, onClick }: ComplaintCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg">{complaint.title}</CardTitle>
              {complaint.is_initiative && (
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Initiative
                </Badge>
              )}
              {complaint.is_anonymous && (
                <Badge variant="outline" className="bg-muted/50">
                  <User className="w-3 h-3 mr-1" />
                  Anonymous
                </Badge>
              )}
            </div>
            <CardDescription className="line-clamp-2">
              {complaint.description}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Badge variant="outline" className="capitalize">
            {complaint.category.replace('_', ' ')}
          </Badge>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {format(new Date(complaint.created_at), "MMM d, yyyy")}
          </div>
        </div>
        <ComplaintProgress progress={complaint.progress} />
      </CardContent>
    </Card>
  );
};