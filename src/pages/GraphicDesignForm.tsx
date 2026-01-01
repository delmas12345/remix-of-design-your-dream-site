import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import graphicDesignImage from "@/assets/graphic-design-services.jpg";
import { 
  FileImage, 
  Palette, 
  CreditCard, 
  Star, 
  Image,
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  Building,
  Send,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const GraphicDesignForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    designType: [] as string[],
    otherDesignType: "",
    colorPreferences: "",
    style: "",
    dimensions: "",
    deadline: "",
    budget: "",
    projectDescription: "",
    referenceLinks: "",
    additionalNotes: ""
  });

  const designTypes = [
    { id: "flyer", label: "Flyers", icon: FileImage },
    { id: "poster", label: "Posters", icon: Image },
    { id: "logo", label: "Logo Design", icon: Palette },
    { id: "business-card", label: "Business Cards", icon: CreditCard },
    { id: "social-media", label: "Social Media Graphics", icon: Star },
    { id: "banner", label: "Banners & Ads", icon: Image },
    { id: "brochure", label: "Brochures", icon: FileImage },
    { id: "other", label: "Other", icon: Sparkles }
  ];

  const styleOptions = [
    { value: "modern", label: "Modern & Minimalist" },
    { value: "bold", label: "Bold & Vibrant" },
    { value: "elegant", label: "Elegant & Luxury" },
    { value: "playful", label: "Playful & Fun" },
    { value: "corporate", label: "Corporate & Professional" },
    { value: "vintage", label: "Vintage & Retro" }
  ];

  const budgetOptions = [
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-500", label: "$200 - $500" },
    { value: "500+", label: "$500+" }
  ];

  const handleDesignTypeChange = (typeId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      designType: checked 
        ? [...prev.designType, typeId]
        : prev.designType.filter(t => t !== typeId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || formData.designType.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll log the submission - you can add a database table later
      console.log("Graphic Design Form Submission:", formData);
      
      toast.success("Your request has been submitted! We'll contact you soon.");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        businessName: "",
        designType: [],
        otherDesignType: "",
        colorPreferences: "",
        style: "",
        dimensions: "",
        deadline: "",
        budget: "",
        projectDescription: "",
        referenceLinks: "",
        additionalNotes: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="relative">
              <img src={logo} alt="Authentic Tech Logo" className="h-14 w-14 object-contain rounded-xl shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Authentic Tech</h1>
              <p className="text-xs text-muted-foreground font-medium">Graphic Design Services</p>
            </div>
          </Link>
          
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="relative container max-w-5xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center text-primary-foreground">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 opacity-0 animate-fade-in">
              <Palette className="w-4 h-4" />
              <span className="text-sm font-medium font-mono">Professional Graphic Design</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-fade-in leading-tight" style={{ animationDelay: "100ms" }}>
              Graphic Design
              <br />
              <span className="text-accent">Request Form</span>
            </h1>
            
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Tell us about your design needs. From flyers to logos, we'll create stunning visuals that make your brand stand out.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <main className="container max-w-4xl mx-auto px-4 py-12 md:py-16 -mt-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">1</span>
              Contact Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Your full name"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 234 567 8900"
                  className="form-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  placeholder="Your business or brand name"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Design Type */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">2</span>
              What Do You Need? *
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {designTypes.map((type) => (
                <label
                  key={type.id}
                  className={`checkbox-label flex-col text-center ${
                    formData.designType.includes(type.id) ? "border-accent bg-accent/5" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                    formData.designType.includes(type.id) ? "bg-accent" : "bg-muted"
                  }`}>
                    <type.icon className={`w-6 h-6 ${
                      formData.designType.includes(type.id) ? "text-accent-foreground" : "text-muted-foreground"
                    }`} />
                  </div>
                  <Checkbox
                    checked={formData.designType.includes(type.id)}
                    onCheckedChange={(checked) => handleDesignTypeChange(type.id, checked as boolean)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-foreground">{type.label}</span>
                </label>
              ))}
            </div>
            
            {formData.designType.includes("other") && (
              <div className="mt-4">
                <Input
                  value={formData.otherDesignType}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherDesignType: e.target.value }))}
                  placeholder="Please specify the design type"
                  className="form-input"
                />
              </div>
            )}
          </div>

          {/* Design Style */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">3</span>
              Preferred Style
            </h2>
            
            <RadioGroup
              value={formData.style}
              onValueChange={(value) => setFormData(prev => ({ ...prev, style: value }))}
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {styleOptions.map((option) => (
                <label
                  key={option.value}
                  className={`checkbox-label cursor-pointer ${
                    formData.style === option.value ? "border-accent bg-accent/5" : ""
                  }`}
                >
                  <RadioGroupItem value={option.value} className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.style === option.value ? "border-accent bg-accent" : "border-border"
                  }`}>
                    {formData.style === option.value && (
                      <Check className="w-3 h-3 text-accent-foreground" />
                    )}
                  </div>
                  <span className="font-medium text-foreground">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Project Details */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">4</span>
              Project Details
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description *</Label>
                <Textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                  placeholder="Describe your project in detail. What message do you want to convey? Who is your target audience?"
                  className="form-input min-h-[120px]"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="colorPreferences">Color Preferences</Label>
                  <Input
                    id="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={(e) => setFormData(prev => ({ ...prev, colorPreferences: e.target.value }))}
                    placeholder="e.g., Blue and gold, brand colors"
                    className="form-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions / Size</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                    placeholder="e.g., 8.5x11 inch, 1080x1080px"
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referenceLinks">Reference Links / Inspiration</Label>
                <Textarea
                  id="referenceLinks"
                  value={formData.referenceLinks}
                  onChange={(e) => setFormData(prev => ({ ...prev, referenceLinks: e.target.value }))}
                  placeholder="Share links to designs you like or want to use as inspiration"
                  className="form-input min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">5</span>
              Budget & Timeline
            </h2>
            
            <div className="space-y-6">
              <div>
                <Label className="mb-4 block">Budget Range</Label>
                <RadioGroup
                  value={formData.budget}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {budgetOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`checkbox-label justify-center ${
                        formData.budget === option.value ? "border-accent bg-accent/5" : ""
                      }`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <span className="font-semibold text-foreground">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Desired Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">6</span>
              Additional Notes
            </h2>
            
            <Textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              placeholder="Anything else you'd like us to know about your project?"
              className="form-input min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-accent text-lg px-12 py-6 gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="relative container max-w-5xl mx-auto px-4 py-12 text-center text-primary-foreground">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={logo} alt="Authentic Tech Logo" className="h-12 w-12 object-contain rounded-xl shadow-lg" />
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

export default GraphicDesignForm;
