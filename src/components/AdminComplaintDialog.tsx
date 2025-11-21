import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Lightbulb, Save, Award } from "lucide-react";
import { format } from "date-fns";

interface AdminComplaintDialogProps {
  complaint: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export const AdminComplaintDialog = ({ complaint, open, onOpenChange, onUpdate }: AdminComplaintDialogProps) => {
  const [status, setStatus] = useState(complaint.status);
  const [progress, setProgress] = useState([complaint.progress]);
  const [adminNotes, setAdminNotes] = useState(complaint.admin_notes || "");
  const [creditPoints, setCreditPoints] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update complaint
      const { error: complaintError } = await supabase
        .from("complaints")
        .update({
          status,
          progress: progress[0],
          admin_notes: adminNotes,
        })
        .eq("id", complaint.id);

      if (complaintError) throw complaintError;

      // Award credit points if specified and valid
      if (creditPoints > 0 && creditPoints <= 5) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("ticket_points")
          .eq("id", complaint.user_id)
          .single();

        if (profileError) throw profileError;

        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            ticket_points: (profile.ticket_points || 0) + creditPoints
          })
          .eq("id", complaint.user_id);

        if (updateError) throw updateError;
        
        toast.success(`Complaint updated and ${creditPoints} credit points awarded!`);
      } else {
        toast.success("Complaint updated successfully");
      }
      
      onUpdate();
      onOpenChange(false);
    } catch (error: any) {
      toast.error("Failed to update complaint");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Complaint</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg">{complaint.title}</h3>
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
            <p className="text-sm text-muted-foreground">{complaint.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="capitalize">
                {complaint.category.replace('_', ' ')}
              </Badge>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {format(new Date(complaint.created_at), "MMM d, yyyy 'at' h:mm a")}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {status === "in_progress" && (
            <div className="space-y-2">
              <Label>Progress: {progress[0]}%</Label>
              <Slider
                value={progress}
                onValueChange={setProgress}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Admin Notes</Label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add internal notes about this complaint..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Award className="w-4 h-4 text-warning" />
              Award Credit Points (1-5)
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="0"
                max="5"
                value={creditPoints}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setCreditPoints(Math.min(5, Math.max(0, val)));
                }}
                placeholder="0"
                className="w-24"
              />
              <p className="text-sm text-muted-foreground">
                Award 1-5 credit points to the student for valid complaint
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
