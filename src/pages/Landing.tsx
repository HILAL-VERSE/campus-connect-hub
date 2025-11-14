import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, TrendingUp, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Hero Section */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">BroRise</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth?mode=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Empower Your Campus
            <span className="block text-primary mt-2">One Complaint at a Time</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BroRise is your transparent, fast, and user-friendly platform for reporting campus issues,
            tracking resolutions, and driving meaningful improvements.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/auth?mode=signup">Submit Your First Complaint</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Why Choose BroRise?</h3>
          <p className="text-lg text-muted-foreground">
            Built for students, faculty, and administrators to create a better campus together
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold">Easy Reporting</h4>
              <p className="text-muted-foreground">
                Submit complaints and suggestions with a simple, intuitive interface
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h4 className="text-xl font-semibold">Real-Time Tracking</h4>
              <p className="text-muted-foreground">
                Monitor your complaint status and progress with live updates
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-warning" />
              </div>
              <h4 className="text-xl font-semibold">Earn Rewards</h4>
              <p className="text-muted-foreground">
                Get ticket points for meaningful contributions to campus improvement
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-xl font-semibold">Full Transparency</h4>
              <p className="text-muted-foreground">
                Complete visibility into resolution process with admin analytics
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary text-primary-foreground border-0 shadow-xl">
          <CardContent className="py-12 text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Campus?
            </h3>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join students, faculty, and administrators already using BroRise to create positive change
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link to="/auth?mode=signup">Get Started Free</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BroRise. Empowering campus communities.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;