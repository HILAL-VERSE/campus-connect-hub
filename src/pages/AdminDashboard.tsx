import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ComplaintCard } from "@/components/ComplaintCard";
import { AdminComplaintDialog } from "@/components/AdminComplaintDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, BarChart3, Download } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
      setFilteredComplaints(data || []);
    } catch (error: any) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    let filtered = complaints;
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") filtered = filtered.filter((c) => c.status === statusFilter);
    if (categoryFilter !== "all") filtered = filtered.filter((c) => c.category === categoryFilter);
    setFilteredComplaints(filtered);
  }, [searchTerm, statusFilter, categoryFilter, complaints]);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    in_progress: complaints.filter((c) => c.status === "in_progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  const handleExport = () => {
    const csvData = [
      ["ID", "Title", "Description", "Category", "Priority", "Status", "Progress", "Created At", "Admin Notes"],
      ...filteredComplaints.map((c) => [
        c.id,
        c.title,
        c.description,
        c.category,
        c.priority,
        c.status,
        c.progress,
        c.created_at,
        c.admin_notes || "",
      ]),
    ];
    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `complaints-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Complaints exported successfully");
  };

  const handleComplaintClick = (complaint: any) => {
    setSelectedComplaint(complaint);
    setDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            <p className="text-muted-foreground mt-1">Manage all campus complaints</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{stats.total}</p></CardContent></Card>
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-secondary">{stats.pending}</p></CardContent></Card>
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary">{stats.in_progress}</p></CardContent></Card>
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-success">{stats.resolved}</p></CardContent></Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search complaints..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleExport} variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
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
          <h3 className="text-xl font-semibold">Active Complaints</h3>
          {loading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Loading...</p>
              </CardContent>
            </Card>
          ) : filteredComplaints.filter(c => c.status === "pending" || c.status === "in_progress").length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No active complaints</p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints
              .filter(c => c.status === "pending" || c.status === "in_progress")
              .map((complaint) => (
                <ComplaintCard 
                  key={complaint.id} 
                  complaint={complaint} 
                  onClick={() => handleComplaintClick(complaint)} 
                />
              ))
          )}
        </div>

        {/* Resolved Complaints */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-success">Resolved Complaints</h3>
          {loading ? null : filteredComplaints.filter(c => c.status === "resolved").length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No resolved complaints</p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints
              .filter(c => c.status === "resolved")
              .map((complaint) => (
                <ComplaintCard 
                  key={complaint.id} 
                  complaint={complaint} 
                  onClick={() => handleComplaintClick(complaint)} 
                />
              ))
          )}
        </div>

        {/* Rejected Complaints */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-destructive">Rejected Complaints</h3>
          {loading ? null : filteredComplaints.filter(c => c.status === "rejected").length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No rejected complaints</p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints
              .filter(c => c.status === "rejected")
              .map((complaint) => (
                <ComplaintCard 
                  key={complaint.id} 
                  complaint={complaint} 
                  onClick={() => handleComplaintClick(complaint)} 
                />
              ))
          )}
        </div>
      </div>

      {selectedComplaint && (
        <AdminComplaintDialog
          complaint={selectedComplaint}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onUpdate={fetchComplaints}
        />
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;