import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Lightbulb } from "lucide-react";

interface SubmitComplaintDialogProps {
  onSuccess?: () => void;
}

export const SubmitComplaintDialog = ({ onSuccess }: SubmitComplaintDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "maintenance",
    priority: "normal",
    is_anonymous: false,
    is_initiative: false,
  });
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("complaints").insert([{
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        priority: formData.priority as any,
        is_anonymous: formData.is_anonymous,
        is_initiative: formData.is_initiative,
      }]);

      if (error) throw error;

      toast.success(
        formData.is_initiative
          ? "Initiative submitted successfully!"
          : "Complaint submitted successfully!"
      );
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "maintenance",
        priority: "normal",
        is_anonymous: false,
        is_initiative: false,
      });
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Submit {formData.is_initiative ? "Initiative" : "Complaint"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formData.is_initiative ? "Submit Initiative" : "Submit Complaint"}
          </DialogTitle>
          <DialogDescription>
            {formData.is_initiative
              ? "Share your ideas to improve campus facilities and services"
              : "Report an issue or concern on campus. We'll track it to resolution."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-accent" />
              <Label htmlFor="is_initiative" className="text-sm font-medium cursor-pointer">
                This is a suggestion/initiative
              </Label>
            </div>
            <Switch
              id="is_initiative"
              checked={formData.is_initiative}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_initiative: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Brief summary of the issue"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the issue"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <Label htmlFor="is_anonymous" className="text-sm cursor-pointer">
              Submit anonymously (your identity will be hidden)
            </Label>
            <Switch
              id="is_anonymous"
              checked={formData.is_anonymous}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_anonymous: checked })
              }
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};