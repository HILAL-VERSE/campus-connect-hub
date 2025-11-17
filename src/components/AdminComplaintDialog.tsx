import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Lightbulb, Save } from "lucide-react";
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
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("complaints")
        .update({
          status,
          progress: progress[0],
          admin_notes: adminNotes,
        })
        .eq("id", complaint.id);

      if (error) throw error;
      toast.success("Complaint updated successfully");
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

          <div className="space-y-2">
            <Label>Admin Notes</Label>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add internal notes about this complaint..."
              className="min-h-[100px]"
            />
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
