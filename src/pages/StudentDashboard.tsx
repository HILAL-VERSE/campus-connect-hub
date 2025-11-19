import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SubmitComplaintDialog } from "@/components/SubmitComplaintDialog";
import { ComplaintCard } from "@/components/ComplaintCard";
import { ResolvedComplaintCard } from "@/components/ResolvedComplaintCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchComplaints = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
      setFilteredComplaints(data || []);
    } catch (error: any) {
      toast.error("Failed to load complaints");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [user]);

  useEffect(() => {
    let filtered = complaints;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((c) => c.category === categoryFilter);
    }

    setFilteredComplaints(filtered);
  }, [searchTerm, statusFilter, categoryFilter, complaints]);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    in_progress: complaints.filter((c) => c.status === "in_progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">My Complaints & Initiatives</h2>
            <p className="text-muted-foreground mt-1">
              Track your submissions and help improve campus
            </p>
          </div>
          <SubmitComplaintDialog onSuccess={fetchComplaints} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.in_progress}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{stats.resolved}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Complaints */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Active Complaints & Initiatives</h3>
          {loading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Loading complaints...</p>
              </CardContent>
            </Card>
          ) : filteredComplaints.filter(c => c.status === "pending" || c.status === "in_progress").length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                    ? "No active complaints match your filters"
                    : "No active complaints. Submit your first one!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints
              .filter(c => c.status === "pending" || c.status === "in_progress")
              .map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
          )}
        </div>

        {/* Resolved Complaints */}
        {filteredComplaints.filter(c => c.status === "resolved").length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-success">Resolved</h3>
            {filteredComplaints
              .filter(c => c.status === "resolved")
              .map((complaint) => (
                <ResolvedComplaintCard key={complaint.id} complaint={complaint} />
              ))}
          </div>
        )}

        {/* Rejected Complaints */}
        {filteredComplaints.filter(c => c.status === "rejected").length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-destructive">Rejected</h3>
            {filteredComplaints
              .filter(c => c.status === "rejected")
              .map((complaint) => (
                <Card key={complaint.id} className="border-destructive/30 bg-destructive/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{complaint.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{complaint.description}</p>
                    {complaint.admin_notes && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">Reason:</h4>
                        <p className="text-sm">{complaint.admin_notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;