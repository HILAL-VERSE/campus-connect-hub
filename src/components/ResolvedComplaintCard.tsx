import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Lightbulb, User } from "lucide-react";
import { format } from "date-fns";

interface ResolvedComplaintCardProps {
  complaint: {
    id: string;
    title: string;
    description: string;
    category: string;
    admin_notes: string | null;
    progress: number;
    is_anonymous: boolean;
    is_initiative: boolean;
    created_at: string;
    updated_at: string;
  };
}

export const ResolvedComplaintCard = ({ complaint }: ResolvedComplaintCardProps) => {
  return (
    <Card className="border-success/30 bg-success/5">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <CheckCircle className="w-5 h-5 text-success" />
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
          </div>
          <Badge className="bg-success text-success-foreground">Resolved</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-1">Original Request:</h4>
          <p className="text-sm text-muted-foreground">{complaint.description}</p>
        </div>
        
        {complaint.admin_notes && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-1">Resolution Details:</h4>
            <p className="text-sm">{complaint.admin_notes}</p>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Badge variant="outline" className="capitalize">
            {complaint.category.replace('_', ' ')}
          </Badge>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Resolved on {format(new Date(complaint.updated_at), "MMM d, yyyy")}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-success/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all" 
              style={{ width: `${complaint.progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-success">{complaint.progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
};
