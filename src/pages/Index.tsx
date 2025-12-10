import { DesignOptionsForm } from "@/components/DesignOptionsForm";
import logo from "@/assets/logo.jpg";
import { Sparkles, Palette, Code, Rocket } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={logo} 
                alt="Authentic Tech Logo" 
                className="h-14 w-14 object-contain rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Authentic Tech</h1>
              <p className="text-xs text-muted-foreground font-medium">Premium Web Solutions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="relative container max-w-5xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center text-primary-foreground">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 opacity-0 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Let's Build Something Amazing</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-in leading-tight" style={{ animationDelay: "100ms" }}>
              Website Design
              <br />
              <span className="text-accent">Options Form</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto opacity-0 animate-fade-in mb-10" style={{ animationDelay: "200ms" }}>
              Complete this form to share your vision. We'll create a custom website that perfectly represents your brand.
            </p>
            
            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Palette className="w-4 h-4" />
                <span className="text-sm">Custom Design</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Code className="w-4 h-4" />
                <span className="text-sm">Modern Tech</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Rocket className="w-4 h-4" />
                <span className="text-sm">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <main className="container max-w-5xl mx-auto px-4 py-12 md:py-16 -mt-4">
        <DesignOptionsForm />
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="relative container max-w-5xl mx-auto px-4 py-12 text-center text-primary-foreground">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src={logo} 
              alt="Authentic Tech Logo" 
              className="h-12 w-12 object-contain bg-primary-foreground rounded-xl p-1.5 shadow-lg"
            />
            <span className="font-bold text-xl tracking-tight">Authentic Tech</span>
          </div>
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Authentic Tech. Crafting Digital Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
