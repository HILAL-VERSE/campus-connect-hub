import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, TrendingUp, Award, Shield, Zap, Users, BarChart3, CheckCircle2, ArrowRight, Sparkles, Globe, Lock, Clock, Target, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard.png";
import featureTracking from "@/assets/feature-tracking.png";
import featureRewards from "@/assets/feature-rewards.png";
import backgroundShapes from "@/assets/background-shapes.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Floating background shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <img src={backgroundShapes} alt="" className="absolute w-full h-full object-cover" />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
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
            <a href="#impact" className="text-muted-foreground hover:text-primary transition-colors">Impact</a>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="border-border hover:bg-muted">
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/25">
              <Link to="/auth?mode=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Dashboard */}
      <section className="relative container mx-auto px-4 py-20 md:py-32">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-hero opacity-50 blur-3xl" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-glow blur-3xl animate-pulse" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Campus Solutions</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block">Transform</span>
              <span className="block">Campus Life</span>
              <span className="block bg-gradient-to-r from-primary via-warning to-accent bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Experience the future of campus complaint management with intelligent tracking, 
              gamified rewards, and transparent resolution processes that empower every voice.
            </p>
            
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start pt-4">
              <Button size="lg" asChild className="text-lg px-10 py-6 bg-gradient-primary hover:opacity-90 shadow-glow group">
                <Link to="/auth?mode=signup">
                  Start Free Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-10 py-6 border-primary/30 hover:bg-primary/10">
                <Link to="/auth">Watch Demo</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 justify-center lg:justify-start pt-6">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Right - 3D Dashboard Image */}
          <div className="relative perspective-1000">
            <div className="relative transform-gpu hover:scale-105 transition-transform duration-700 animate-float-slow">
              <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl" />
              <img 
                src={heroDashboard} 
                alt="BroRise Dashboard" 
                className="relative w-full rounded-2xl shadow-glow border border-primary/20"
                style={{
                  transform: 'rotateY(-10deg) rotateX(5deg)',
                  transformStyle: 'preserve-3d'
                }}
              />
              {/* Floating elements around dashboard */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-warning/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with 3D Cards */}
      <section id="features" className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Powerful Features</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
              Drive Real Change
            </span>
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for students, faculty, and administrators with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: MessageSquare,
              title: "Smart Reporting",
              description: "Submit complaints with AI-powered categorization, rich media support, and anonymous options for sensitive issues",
              color: "primary"
            },
            {
              icon: TrendingUp,
              title: "Live Tracking",
              description: "Monitor complaint status with real-time progress updates, estimated resolution times, and milestone notifications",
              color: "accent"
            },
            {
              icon: Award,
              title: "Gamified Rewards",
              description: "Earn ticket points for active participation, quality reporting, and community engagement with competitive leaderboards",
              color: "warning"
            },
            {
              icon: Shield,
              title: "Full Transparency",
              description: "View administrative actions, resolution history, and public complaint statistics with complete accountability",
              color: "success"
            },
            {
              icon: Users,
              title: "Role-Based Access",
              description: "Tailored dashboards for students, faculty, and administrators with appropriate permissions and specialized workflows",
              color: "primary"
            },
            {
              icon: BarChart3,
              title: "Advanced Analytics",
              description: "Comprehensive insights into complaint trends, response times, and resolution effectiveness with visual charts",
              color: "accent"
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className="relative group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-elevated overflow-hidden transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
              <CardContent className="relative pt-8 pb-8 space-y-4">
                <div className={`w-16 h-16 rounded-xl bg-${feature.color}/10 border border-${feature.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-card`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                <h4 className="text-2xl font-semibold">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Visual Showcase with Images */}
      <section id="showcase" className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Feature 1: Real-Time Tracking */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative perspective-1000 order-2 lg:order-1">
              <div className="relative transform-gpu hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
                <img 
                  src={featureTracking} 
                  alt="Real-time tracking" 
                  className="relative w-full rounded-2xl shadow-elevated border border-accent/20"
                  style={{
                    transform: 'rotateY(5deg) rotateX(-5deg)',
                    transformStyle: 'preserve-3d'
                  }}
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent font-medium">Real-Time Intelligence</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold">
                Track Every Step of
                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mt-2">
                  Your Journey
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stay informed with instant notifications, progress milestones, and transparent 
                communication throughout the entire resolution process. Our intelligent system 
                keeps you updated every step of the way.
              </p>
              <ul className="space-y-4">
                {[
                  "Instant push notifications for status changes",
                  "Visual progress indicators with milestones",
                  "Estimated resolution time predictions",
                  "Direct communication with administrators"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2: Gamified Rewards */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20">
                <Rocket className="w-4 h-4 text-warning" />
                <span className="text-sm text-warning font-medium">Engagement Rewards</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold">
                Earn Recognition for
                <span className="block bg-gradient-to-r from-warning to-primary bg-clip-text text-transparent mt-2">
                  Making a Difference
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our innovative ticket point system rewards active community members who contribute 
                to campus improvement. Climb the leaderboards, unlock achievements, and showcase 
                your impact on campus culture.
              </p>
              <ul className="space-y-4">
                {[
                  "Earn points for quality complaint submissions",
                  "Unlock exclusive badges and achievements",
                  "Compete on campus-wide leaderboards",
                  "Redeem points for real campus perks"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative perspective-1000">
              <div className="relative transform-gpu hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
                <img 
                  src={featureRewards} 
                  alt="Gamified rewards" 
                  className="relative w-full rounded-2xl shadow-elevated border border-warning/20"
                  style={{
                    transform: 'rotateY(-5deg) rotateX(5deg)',
                    transformStyle: 'preserve-3d'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with 3D Steps */}
      <section id="how-it-works" className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-glow opacity-10 blur-3xl" />
        
        <div className="relative text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Simple Process,
            </span>
            <span className="block mt-2">Powerful Results</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three easy steps to transform your campus experience
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Connecting lines */}
          <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5">
            <div className="h-full bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
          </div>

          {[
            {
              step: "01",
              icon: MessageSquare,
              title: "Submit & Categorize",
              description: "Create detailed complaints with automatic AI categorization, rich media attachments, and anonymous options",
              highlights: ["AI-Powered", "Media Support", "Anonymous Option"]
            },
            {
              step: "02",
              icon: Clock,
              title: "Track & Engage",
              description: "Follow real-time progress with visual milestones, communicate directly with admins, and receive instant updates",
              highlights: ["Real-Time", "Direct Chat", "Notifications"]
            },
            {
              step: "03",
              icon: CheckCircle2,
              title: "Resolve & Reward",
              description: "View resolution details, provide feedback, earn ticket points, and celebrate your contribution to campus improvement",
              highlights: ["Earn Points", "Leave Feedback", "Get Rewarded"]
            }
          ].map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Step number badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
              </div>

              <Card className="relative pt-16 pb-8 px-6 bg-gradient-card border-border/50 group-hover:border-primary/50 transition-all duration-500 hover:shadow-elevated transform group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                
                <CardContent className="space-y-6">
                  <div className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h4 className="text-2xl font-bold">{step.title}</h4>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {step.highlights.map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Stats with 3D Cards */}
      <section id="impact" className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-30 blur-3xl" />
        
        <Card className="relative bg-gradient-card border-border/50 shadow-elevated overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-glow blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-glow blur-3xl opacity-50" />
          
          <CardContent className="relative py-16 px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                Making Real Impact
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
                  Across Campuses
                </span>
              </h3>
              <p className="text-lg text-muted-foreground">
                Join thousands of students driving positive change
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Globe, value: "50+", label: "Campuses Using BroRise", subtext: "And growing daily" },
                { icon: Users, value: "25K+", label: "Active Community Members", subtext: "Engaged students & faculty" },
                { icon: CheckCircle2, value: "95%", label: "Resolution Success Rate", subtext: "Industry leading" },
                { icon: Zap, value: "< 48h", label: "Average Response Time", subtext: "Lightning fast support" }
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                  <div className="relative text-center space-y-4 p-6 rounded-xl border border-border/50 group-hover:border-primary/50 transition-all transform group-hover:-translate-y-2">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-card group-hover:scale-110 transition-transform">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="space-y-1">
                      <div className="text-foreground font-semibold">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.subtext}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-glow opacity-40 blur-3xl" />
        
        <Card className="relative bg-gradient-card border border-primary/30 shadow-glow overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-glow blur-3xl opacity-30" />
          
          <CardContent className="relative py-20 px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Secure & Anonymous • Free Forever</span>
            </div>
            
            <h3 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              Ready to Transform Your Campus Into a
              <span className="block bg-gradient-to-r from-primary via-warning to-accent bg-clip-text text-transparent mt-2">
                Better Place?
              </span>
            </h3>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of students and faculty already making a real difference. 
              Start reporting issues, tracking progress, and earning rewards today.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap pt-6">
              <Button size="lg" asChild className="text-lg px-12 py-7 bg-gradient-primary hover:opacity-90 shadow-glow group">
                <Link to="/auth?mode=signup">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              No credit card required • Set up in 2 minutes • Free forever
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-12 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <MessageSquare className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
                  BroRise
                </h1>
                <p className="text-xs text-muted-foreground">Empowering Campus Communities</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BroRise. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Making campuses better, one complaint at a time.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotateY(-10deg) rotateX(5deg);
          }
          50% {
            transform: translateY(-15px) rotateY(-10deg) rotateX(5deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default Landing;
