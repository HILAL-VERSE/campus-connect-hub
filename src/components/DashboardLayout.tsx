import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, LogOut, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">BroRise</h1>
              <p className="text-xs text-muted-foreground capitalize">{profile?.role} Portal</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {profile?.role !== "admin" && (
              <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-lg border border-warning/20">
                <Award className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Ticket Points</p>
                  <p className="font-bold text-warning">{profile?.ticket_points || 0}</p>
                </div>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};