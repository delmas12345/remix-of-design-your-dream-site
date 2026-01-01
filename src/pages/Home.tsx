import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-web-design.jpg";
import graphicDesignImage from "@/assets/graphic-design-services.jpg";
import appDevImage from "@/assets/app-development.jpg";
import websiteImage from "@/assets/website-services.jpg";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  FileImage, 
  CreditCard, 
  Star,
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const services = [
    {
      icon: Globe,
      title: "Website Design",
      description: "Custom, responsive websites that captivate your audience and drive results.",
      image: websiteImage,
      link: "/website-form",
      price: "Starting at $500"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps (PWA)",
      description: "Powerful progressive web apps that work seamlessly on any device.",
      image: appDevImage,
      link: "/website-form",
      price: "Starting at $700"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Stunning flyers, posters, logos, and business cards that make you stand out.",
      image: graphicDesignImage,
      link: "/graphic-design-form",
      price: "Starting at $50"
    }
  ];

  const graphicServices = [
    { icon: FileImage, name: "Flyers & Posters", desc: "Eye-catching promotional materials" },
    { icon: Palette, name: "Logo Design", desc: "Unique brand identity creation" },
    { icon: CreditCard, name: "Business Cards", desc: "Professional first impressions" },
    { icon: Star, name: "Social Media Graphics", desc: "Engaging digital content" }
  ];

  const features = [
    { icon: Zap, title: "Fast Delivery", desc: "Quick turnaround without compromising quality" },
    { icon: Shield, title: "6 Months Support", desc: "Free maintenance and updates included" },
    { icon: Sparkles, title: "Modern Design", desc: "Latest trends and best practices" },
    { icon: Clock, title: "24/7 Communication", desc: "Always available when you need us" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <img src={logo} alt="Authentic Tech Logo" className="h-12 w-12 object-contain rounded-xl shadow-lg" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground tracking-tight">Authentic Tech</h1>
                <p className="text-xs text-muted-foreground">Premium Digital Solutions</p>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#why-us" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
              <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <Link to="/website-form">
                <Button className="btn-accent text-sm px-4 py-2">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional web design" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        
        <div className="relative container max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 opacity-0 animate-fade-in border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Crafting Digital Excellence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in leading-tight text-foreground" style={{ animationDelay: "100ms" }}>
              We Build
              <span className="block text-accent">Digital Experiences</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl opacity-0 animate-fade-in mb-8" style={{ animationDelay: "200ms" }}>
              From stunning websites to eye-catching graphics, we bring your vision to life with professional design and modern technology.
            </p>
            
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/website-form">
                <Button className="btn-accent text-base px-8 py-6 gap-2">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="#services">
                <Button variant="outline" className="text-base px-8 py-6 border-2">
                  Explore Services
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              What We <span className="text-accent">Create</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive digital solutions tailored to elevate your brand and grow your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={service.link}
                className="group section-card overflow-hidden hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-48 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 md:left-6">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                      <service.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent">{service.price}</span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Graphic Design Spotlight */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={graphicDesignImage} 
                alt="Graphic Design Services"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Palette className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Graphic Design</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Make Your Brand <span className="text-accent">Unforgettable</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Stand out from the competition with professionally designed marketing materials that capture attention and leave lasting impressions.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {graphicServices.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/graphic-design-form">
                <Button className="btn-accent gap-2">
                  Order Graphic Design
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 md:py-28" style={{ background: "var(--gradient-hero)" }}>
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Why Choose <span className="text-accent">Authentic Tech</span>?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              We're committed to delivering exceptional quality and service that exceeds expectations.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-bold text-primary-foreground mb-2">{feature.title}</h3>
                <p className="text-primary-foreground/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Whether you need a website, mobile app, or stunning graphics, we're here to bring your vision to life. Get started today!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/website-form">
              <Button className="btn-primary text-base px-8 py-6 gap-2">
                <Globe className="w-5 h-5" />
                Website / App Form
              </Button>
            </Link>
            <Link to="/graphic-design-form">
              <Button className="btn-accent text-base px-8 py-6 gap-2">
                <Palette className="w-5 h-5" />
                Graphic Design Form
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Get in Touch</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Let's Work <span className="text-accent">Together</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Have questions? We'd love to hear from you. Reach out and let's discuss how we can help your business grow.
              </p>
              
              <div className="space-y-4">
                <a href="tel:+17546104106" className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call us</p>
                    <p className="font-semibold text-foreground">+1 754 610 4106</p>
                  </div>
                </a>
                
                <a href="mailto:contact@authentic-tech.dev" className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email us</p>
                    <p className="font-semibold text-foreground">contact@authentic-tech.dev</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-foreground">Haiti • Serving Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="section-card">
              <h3 className="text-xl font-bold text-foreground mb-6">Quick Links</h3>
              <div className="space-y-3">
                <Link to="/website-form" className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Website / App Project</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
                
                <Link to="/graphic-design-form" className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-accent" />
                    <span className="font-medium text-foreground">Graphic Design Project</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
                
                <Link to="/privacy-policy" className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Privacy Policy</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="relative container max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Authentic Tech Logo" className="h-12 w-12 object-contain rounded-xl shadow-lg" />
              <span className="font-bold text-xl text-primary-foreground tracking-tight">Authentic Tech</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Privacy Policy
              </Link>
              <a href="#services" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Services
              </a>
              <a href="#contact" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Authentic Tech. Crafting Digital Excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
