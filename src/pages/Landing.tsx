import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, TrendingUp, Award, Shield, Zap, Users, BarChart3, CheckCircle2, ArrowRight, Sparkles, Target, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard.png";
import featureTracking from "@/assets/feature-tracking.png";
import featureRewards from "@/assets/feature-rewards.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* AI/ML themed background with gradient mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-warning/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
           style={{
             backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
             backgroundSize: '60px 60px'
           }} 
      />

      {/* Navigation */}
      <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
              BroRise
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#showcase" className="text-muted-foreground hover:text-primary transition-colors">Showcase</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="border-border hover:bg-muted hidden sm:inline-flex">
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/25">
              <Link to="/auth?mode=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-hero opacity-30 blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-glow opacity-20 blur-3xl animate-pulse pointer-events-none" />
          
          <div className="relative grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">AI-Powered Campus Solutions</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block mb-2">Transform</span>
                <span className="block mb-2">Campus Life</span>
                <span className="block bg-gradient-to-r from-primary via-warning to-accent bg-clip-text text-transparent">
                  With Intelligence
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                BroRise revolutionizes how students and faculty communicate. Track complaints, 
                earn rewards, and create a better campus environment with our intelligent platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 shadow-xl shadow-primary/30 text-lg px-8 py-6">
                  <Link to="/auth?mode=signup">
                    Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-border/50 hover:bg-muted text-lg px-8 py-6">
                  <Link to="#features">
                    Explore Features
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Free for students</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Cards */}
            <div>
              <div className="grid grid-cols-1 gap-8">
                {/* Fast Response Card */}
                <Card className="group relative bg-card/60 backdrop-blur-xl border-border/50 shadow-xl transform-gpu hover:scale-105 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  <CardContent className="p-10 lg:p-12 space-y-4 relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                      <Rocket className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg lg:text-xl font-medium text-foreground">Fast Response</p>
                      <p className="text-5xl lg:text-6xl font-bold text-primary">&lt;24h</p>
                      <p className="text-base lg:text-lg text-muted-foreground">Average resolution time</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Satisfaction Card */}
                <Card className="group relative bg-card/60 backdrop-blur-xl border-border/50 shadow-xl transform-gpu hover:scale-105 hover:border-warning/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-warning to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  <CardContent className="p-10 lg:p-12 space-y-4 relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-warning to-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                      <Award className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg lg:text-xl font-medium text-foreground">Student Satisfaction</p>
                      <p className="text-5xl lg:text-6xl font-bold text-warning">98%</p>
                      <p className="text-base lg:text-lg text-muted-foreground">Overall rating</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Powerful Features</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for{" "}
              <span className="bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
                Campus Excellence
              </span>
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive tools designed to streamline communication and foster collaboration
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: MessageSquare,
                title: "Smart Complaint System",
                description: "Submit and track complaints with AI-powered categorization and priority assignment for faster resolution",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Get instant insights into complaint trends, resolution rates, and campus improvement metrics",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Award,
                title: "Rewards & Gamification",
                description: "Earn points for active participation and unlock achievements for contributing to campus betterment",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Anonymous Reporting",
                description: "Submit sensitive issues anonymously while maintaining accountability through secure tracking",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: Users,
                title: "Multi-Role Dashboard",
                description: "Customized interfaces for students, faculty, and admins with role-specific features and controls",
                gradient: "from-red-500 to-rose-500"
              },
              {
                icon: Target,
                title: "Progress Tracking",
                description: "Monitor complaint status in real-time from submission to resolution with detailed updates",
                gradient: "from-indigo-500 to-violet-500"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="group relative bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden hover:scale-105 transform-gpu hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                     style={{backgroundImage: `linear-gradient(135deg, var(--primary), var(--warning))`}} />
                
                <CardContent className="p-6 lg:p-8 space-y-6">
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button className="text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Visual Showcase Section */}
        <section id="showcase" className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto mb-32">
            {/* Left - 3D Tracking Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-warning opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-700" />
              
              <div className="relative transform-gpu transition-all duration-700 hover:scale-105">
                <img 
                  src={featureTracking} 
                  alt="Progress Tracking" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Progress Tracking</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Track Every Step{" "}
                <span className="block mt-2 bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
                  From Start to Finish
                </span>
              </h3>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Stay informed with real-time updates on your complaints. Our intelligent tracking 
                system keeps you in the loop at every stage, ensuring transparency and accountability.
              </p>

              <ul className="space-y-4 pt-4">
                {[
                  "Real-time status notifications",
                  "Detailed progress timeline",
                  "Admin notes and updates",
                  "Estimated resolution time"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground text-base lg:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warning/10 border border-warning/20">
                <Award className="w-4 h-4 text-warning" />
                <span className="text-sm text-warning font-medium">Rewards System</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Get Rewarded{" "}
                <span className="block mt-2 bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent">
                  For Making a Difference
                </span>
              </h3>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Earn points for every contribution to campus improvement. Unlock achievements, 
                climb the leaderboard, and get recognized for being an active community member.
              </p>

              <ul className="space-y-4 pt-4">
                {[
                  "Points for complaint submissions",
                  "Bonus rewards for valid reports",
                  "Achievement badges and milestones",
                  "Monthly leaderboard rankings"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-warning" />
                    </div>
                    <span className="text-foreground text-base lg:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - 3D Rewards Image */}
            <div className="relative group order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-warning to-accent opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-700" />
              
              <div className="relative transform-gpu transition-all duration-700 hover:scale-105">
                <img 
                  src={featureRewards} 
                  alt="Rewards System" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container mx-auto px-6 lg:px-8 py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Simple Process</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Get Started in{" "}
              <span className="bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
                Three Easy Steps
              </span>
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform your campus experience with our streamlined complaint resolution system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Submit Your Complaint",
                description: "Use our intuitive form to submit complaints. Choose categories, add details, and even submit anonymously if needed.",
                icon: MessageSquare,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Track Progress",
                description: "Monitor real-time updates as your complaint moves through review, assignment, and resolution stages.",
                icon: BarChart3,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Earn Rewards",
                description: "Gain points for valid submissions and active participation. Unlock achievements and climb the leaderboard.",
                icon: Award,
                color: "from-amber-500 to-orange-500"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent -translate-x-1/2 z-0" />
                )}

                <Card className="relative bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 transform-gpu hover:-translate-y-2 h-full">
                  <CardContent className="p-6 lg:p-8 space-y-6">
                    <div className="relative">
                      <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 mx-auto`}>
                        <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                        <span className="text-lg font-bold text-primary-foreground">{step.step}</span>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <h4 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-warning/10 to-accent/10 backdrop-blur-xl border-primary/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-glow opacity-30 blur-3xl" />
            
            <CardContent className="relative p-12 md:p-16 lg:p-20 text-center space-y-10">
              <div className="space-y-6 max-w-3xl mx-auto">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Ready to Transform Your{" "}
                  <span className="block mt-2 bg-gradient-to-r from-primary via-warning to-accent bg-clip-text text-transparent">
                    Campus Experience?
                  </span>
                </h3>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of students and faculty already using BroRise to create 
                  better, more responsive campus environments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 shadow-2xl shadow-primary/40 text-lg px-10 py-7">
                  <Link to="/auth?mode=signup">
                    Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-border/50 hover:bg-muted text-lg px-10 py-7">
                  <Link to="/auth">
                    Sign In
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 lg:gap-8 justify-center text-sm text-muted-foreground pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Free for students</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Setup in 2 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
              <div className="col-span-2 md:col-span-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                    <MessageSquare className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
                    BroRise
                  </h1>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Transforming campus communication with intelligent complaint management and student engagement.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-foreground mb-4">Product</h5>
                <ul className="space-y-3">
                  <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm">Features</a></li>
                  <li><a href="#showcase" className="text-muted-foreground hover:text-primary transition-colors text-sm">Showcase</a></li>
                  <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors text-sm">How It Works</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-foreground mb-4">Company</h5>
                <ul className="space-y-3">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-foreground mb-4">Connect</h5>
                <ul className="space-y-3">
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Twitter</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">LinkedIn</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
              <p>&copy; 2024 BroRise. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
};

export default Landing;