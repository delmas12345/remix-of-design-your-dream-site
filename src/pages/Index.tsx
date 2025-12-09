import { DesignOptionsForm } from "@/components/DesignOptionsForm";
import logo from "@/assets/logo.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Authentic Tech Logo" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">Authentic Tech</h1>
              <p className="text-xs text-muted-foreground">Web Design Solutions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in">
            Website Design Options Form
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Client Project Specification & Selection Sheet
          </p>
          <div className="mt-8 flex justify-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
            <span className="inline-block w-2 h-2 rounded-full bg-accent/60"></span>
            <span className="inline-block w-2 h-2 rounded-full bg-accent/30"></span>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <main className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
        <DesignOptionsForm />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src={logo} 
              alt="Authentic Tech Logo" 
              className="h-10 w-10 object-contain bg-white rounded-lg p-1"
            />
            <span className="font-semibold text-lg">Authentic Tech</span>
          </div>
          <p className="text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} Authentic Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
