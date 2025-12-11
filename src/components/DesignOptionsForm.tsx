import { useState } from "react";
import { FormSection } from "./FormSection";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { ColorPicker } from "./ColorPicker";
import { TypographyPreview } from "./TypographyPreview";
import AIFormAssistant from "./AIFormAssistant";
import { Send, FileText, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormSuggestions {
  websitePurpose?: string[];
  pageCount?: string;
  mainPages?: string;
  designStyle?: string[];
  layout?: string;
  typography?: string;
  features?: string[];
  contentProvider?: string;
  media?: string[];
  deadline?: string;
  budget?: string;
}

const websitePurposeOptions = [
  { id: "business", label: "Business Website" },
  { id: "ecommerce", label: "E-Commerce / Online Store" },
  { id: "portfolio", label: "Portfolio / Gallery" },
  { id: "booking", label: "Booking / Appointment Website" },
  { id: "blog", label: "Blog / News" },
  { id: "personal", label: "Personal Brand" },
  { id: "nonprofit", label: "Nonprofit / Community" },
];

const pageCountOptions = [
  { id: "1", label: "1 Page (Landing Page)" },
  { id: "3", label: "3 Pages" },
  { id: "5", label: "5 Pages" },
  { id: "7-10", label: "7–10 Pages" },
  { id: "10+", label: "10+ Pages (Custom)" },
];

const designStyleOptions = [
  { id: "modern", label: "Modern & Minimalist" },
  { id: "corporate", label: "Corporate & Professional" },
  { id: "bold", label: "Bold & Flashy" },
  { id: "luxury", label: "Luxury / High-End" },
  { id: "creative", label: "Creative / Artistic" },
  { id: "colorful", label: "Fun & Colorful" },
  { id: "dark", label: "Dark Theme" },
  { id: "light", label: "Light Theme" },
];

const layoutOptions = [
  { id: "wide", label: "Wide Layout (Full width)" },
  { id: "boxed", label: "Boxed Layout" },
  { id: "grid", label: "Grid / Section Layout" },
  { id: "single-scroll", label: "Single-Page Scroll" },
  { id: "multi-page", label: "Multi-Page Classic Layout" },
];

const typographyOptions = [
  { id: "elegant", label: "Elegant / Serif" },
  { id: "modern", label: "Clean & Modern Sans-Serif" },
  { id: "bold", label: "Bold / Strong Fonts" },
  { id: "fun", label: "Fun / Creative Fonts" },
];

const featureOptions = [
  { id: "store", label: "Online Store (E-commerce)" },
  { id: "payment", label: "Payment Integration" },
  { id: "booking", label: "Booking System / Appointment Calendar" },
  { id: "chat", label: "Live Chat" },
  { id: "contact", label: "Contact Form" },
  { id: "membership", label: "Membership / Login Area" },
  { id: "blog", label: "Blog" },
  { id: "gallery", label: "Photo Gallery" },
  { id: "video", label: "Video Backgrounds" },
  { id: "social", label: "Social Media Integration" },
  { id: "newsletter", label: "Newsletter / Email Signup" },
  { id: "seo", label: "SEO Optimization" },
  { id: "multilang", label: "Multi-Language" },
  { id: "forms", label: "Custom Forms" },
  { id: "analytics", label: "Analytics Setup" },
];

const contentProviderOptions = [
  { id: "client", label: "Client" },
  { id: "designer", label: "Designer" },
  { id: "both", label: "Both" },
];

const mediaOptions = [
  { id: "logo", label: "Logo" },
  { id: "text", label: "Text / Descriptions" },
  { id: "images", label: "Images" },
  { id: "videos", label: "Videos" },
  { id: "products", label: "Product List (If e-commerce)" },
  { id: "guidelines", label: "Brand Guidelines" },
];

const deadlineOptions = [
  { id: "1-2weeks", label: "1–2 Weeks" },
  { id: "2-4weeks", label: "2–4 Weeks" },
  { id: "1-2months", label: "1–2 Months" },
  { id: "flexible", label: "Flexible Deadline" },
];

const budgetOptions = [
  { id: "under500", label: "Under $500" },
  { id: "500-1000", label: "$500 – $1,000" },
  { id: "1000-3000", label: "$1,000 – $3,000" },
  { id: "3000-5000", label: "$3,000 – $5,000" },
  { id: "5000+", label: "$5,000+ (Custom Quote)" },
];

export const DesignOptionsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    websitePurpose: [] as string[],
    otherPurpose: "",
    pageCount: "",
    mainPages: "",
    designStyle: [] as string[],
    otherStyle: "",
    layout: "",
    mainColor: "#3d4f5f",
    secondaryColor: "#dc2626",
    accentColor: "#f97316",
    useDesignerColors: false,
    typography: "",
    customTypography: "",
    features: [] as string[],
    otherFeatures: "",
    contentProvider: "",
    mediaProvided: [] as string[],
    deadline: "",
    launchDate: "",
    budget: "",
    additionalNotes: "",
    signature: "",
    signatureDate: "",
  });

  const handleApplySuggestions = (suggestions: FormSuggestions) => {
    setFormData(prev => ({
      ...prev,
      websitePurpose: suggestions.websitePurpose || prev.websitePurpose,
      pageCount: suggestions.pageCount || prev.pageCount,
      mainPages: suggestions.mainPages || prev.mainPages,
      designStyle: suggestions.designStyle || prev.designStyle,
      layout: suggestions.layout || prev.layout,
      typography: suggestions.typography || prev.typography,
      features: suggestions.features || prev.features,
      contentProvider: suggestions.contentProvider || prev.contentProvider,
      mediaProvided: suggestions.media || prev.mediaProvided,
      deadline: suggestions.deadline || prev.deadline,
      budget: suggestions.budget || prev.budget,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("form_submissions").insert({
        full_name: formData.fullName,
        business_name: formData.businessName || null,
        email: formData.email,
        phone: formData.phone || null,
        website_purpose: formData.websitePurpose,
        other_purpose: formData.otherPurpose || null,
        page_count: formData.pageCount || null,
        main_pages: formData.mainPages || null,
        design_style: formData.designStyle,
        other_style: formData.otherStyle || null,
        layout: formData.layout || null,
        main_color: formData.mainColor,
        secondary_color: formData.secondaryColor,
        accent_color: formData.accentColor,
        use_designer_colors: formData.useDesignerColors,
        typography: formData.typography || null,
        custom_typography: formData.customTypography || null,
        features: formData.features,
        other_features: formData.otherFeatures || null,
        content_provider: formData.contentProvider || null,
        media_provided: formData.mediaProvided,
        deadline: formData.deadline || null,
        launch_date: formData.launchDate || null,
        budget: formData.budget || null,
        additional_notes: formData.additionalNotes || null,
        signature: formData.signature,
        signature_date: formData.signatureDate,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Form Submitted Successfully!",
        description: "We'll review your project specifications and get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="section-card text-center py-16">
        <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-foreground mb-4">Thank You!</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Your project specifications have been submitted successfully. We'll review your requirements and get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              fullName: "",
              businessName: "",
              email: "",
              phone: "",
              websitePurpose: [],
              otherPurpose: "",
              pageCount: "",
              mainPages: "",
              designStyle: [],
              otherStyle: "",
              layout: "",
              mainColor: "#3d4f5f",
              secondaryColor: "#dc2626",
              accentColor: "#f97316",
              useDesignerColors: false,
              typography: "",
              customTypography: "",
              features: [],
              otherFeatures: "",
              contentProvider: "",
              mediaProvided: [],
              deadline: "",
              launchDate: "",
              budget: "",
              additionalNotes: "",
              signature: "",
              signatureDate: "",
            });
          }}
          className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300"
        >
          Submit Another Form
        </button>
      </div>
    );
  }

  return (
    <>
      <AIFormAssistant onApplySuggestions={handleApplySuggestions} />
      <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Client Information */}
      <FormSection number={1} title="Client Information" delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          <TextInput
            label="Business / Organization Name"
            placeholder="Enter business name"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </FormSection>

      {/* Section 2: Website Purpose */}
      <FormSection number={2} title="Website Purpose" delay={150}>
        <p className="text-muted-foreground text-sm mb-4">Select one or more</p>
        <CheckboxGroup
          options={websitePurposeOptions}
          selected={formData.websitePurpose}
          onChange={(selected) => setFormData({ ...formData, websitePurpose: selected })}
        />
        <TextInput
          className="mt-4"
          placeholder="Other (please specify)"
          value={formData.otherPurpose}
          onChange={(e) => setFormData({ ...formData, otherPurpose: e.target.value })}
        />
      </FormSection>

      {/* Section 3: Number of Pages */}
      <FormSection number={3} title="Number of Pages" delay={200}>
        <RadioGroup
          name="pageCount"
          options={pageCountOptions}
          selected={formData.pageCount}
          onChange={(value) => setFormData({ ...formData, pageCount: value })}
        />
        <TextArea
          className="mt-4"
          label="List the main pages you want:"
          placeholder="e.g., Home, About, Services, Contact, Blog..."
          value={formData.mainPages}
          onChange={(e) => setFormData({ ...formData, mainPages: e.target.value })}
        />
      </FormSection>

      {/* Section 4: Website Style & Layout */}
      <FormSection number={4} title="Website Style & Layout" delay={250}>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-foreground mb-3">A. Design Style (Select one or more)</h3>
            <CheckboxGroup
              options={designStyleOptions}
              selected={formData.designStyle}
              onChange={(selected) => setFormData({ ...formData, designStyle: selected })}
            />
            <TextInput
              className="mt-3"
              placeholder="Other style preference"
              value={formData.otherStyle}
              onChange={(e) => setFormData({ ...formData, otherStyle: e.target.value })}
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-3">B. Layout Preference</h3>
            <RadioGroup
              name="layout"
              options={layoutOptions}
              selected={formData.layout}
              onChange={(value) => setFormData({ ...formData, layout: value })}
            />
          </div>
        </div>
      </FormSection>

      {/* Section 5: Color Palette */}
      <FormSection number={5} title="Color Palette" delay={300}>
        <div className="space-y-4">
          <ColorPicker
            label="Main Color"
            value={formData.mainColor}
            onChange={(value) => setFormData({ ...formData, mainColor: value })}
          />
          <ColorPicker
            label="Secondary Color"
            value={formData.secondaryColor}
            onChange={(value) => setFormData({ ...formData, secondaryColor: value })}
          />
          <ColorPicker
            label="Accent Color"
            value={formData.accentColor}
            onChange={(value) => setFormData({ ...formData, accentColor: value })}
          />
          <div className="flex items-center gap-3 pt-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.useDesignerColors}
                onChange={(e) => setFormData({ ...formData, useDesignerColors: e.target.checked })}
                className="form-checkbox"
              />
              <span className="text-foreground">Designer can choose colors for me</span>
            </label>
          </div>
        </div>
      </FormSection>

      {/* Section 6: Typography */}
      <FormSection number={6} title="Typography (Text Style)" delay={350}>
        <p className="text-muted-foreground text-sm mb-4">Select a typography style to preview how your text will look</p>
        <TypographyPreview
          options={typographyOptions}
          selected={formData.typography}
          onChange={(value) => setFormData({ ...formData, typography: value })}
        />
        <TextInput
          className="mt-6"
          placeholder="Custom font preference (e.g., specific font name)"
          value={formData.customTypography}
          onChange={(e) => setFormData({ ...formData, customTypography: e.target.value })}
        />
      </FormSection>

      {/* Section 7: Features & Functionalities */}
      <FormSection number={7} title="Features & Functionalities" delay={400}>
        <p className="text-muted-foreground text-sm mb-4">Check all that apply</p>
        <CheckboxGroup
          options={featureOptions}
          selected={formData.features}
          onChange={(selected) => setFormData({ ...formData, features: selected })}
          columns={3}
        />
        <TextInput
          className="mt-4"
          placeholder="Other features needed"
          value={formData.otherFeatures}
          onChange={(e) => setFormData({ ...formData, otherFeatures: e.target.value })}
        />
      </FormSection>

      {/* Section 8: Media & Content */}
      <FormSection number={8} title="Media & Content" delay={450}>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-foreground mb-3">A. Content Provided By:</h3>
            <RadioGroup
              name="contentProvider"
              options={contentProviderOptions}
              selected={formData.contentProvider}
              onChange={(value) => setFormData({ ...formData, contentProvider: value })}
              columns={3}
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-3">B. Elements You Will Provide:</h3>
            <CheckboxGroup
              options={mediaOptions}
              selected={formData.mediaProvided}
              onChange={(selected) => setFormData({ ...formData, mediaProvided: selected })}
              columns={3}
            />
          </div>
        </div>
      </FormSection>

      {/* Section 9: Project Deadline */}
      <FormSection number={9} title="Project Deadline" delay={500}>
        <RadioGroup
          name="deadline"
          options={deadlineOptions}
          selected={formData.deadline}
          onChange={(value) => setFormData({ ...formData, deadline: value })}
        />
        <TextInput
          className="mt-4"
          label="Preferred Launch Date"
          type="date"
          value={formData.launchDate}
          onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
        />
      </FormSection>

      {/* Section 10: Budget Range */}
      <FormSection number={10} title="Budget Range" delay={550}>
        <p className="text-muted-foreground text-sm mb-4">
          Budget may vary based on complexity and timeline requirements
        </p>
        <RadioGroup
          name="budget"
          options={budgetOptions}
          selected={formData.budget}
          onChange={(value) => setFormData({ ...formData, budget: value })}
        />
      </FormSection>

      {/* Section 11: Additional Notes */}
      <FormSection number={11} title="Additional Notes" delay={600}>
        <TextArea
          placeholder="Please list any examples, inspirations, or special requirements..."
          value={formData.additionalNotes}
          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
          rows={5}
        />
      </FormSection>

      {/* Section 12: Client Signature */}
      <FormSection number={12} title="Client Signature" delay={650}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Signature"
            placeholder="Type your full name as signature"
            value={formData.signature}
            onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
            required
          />
          <TextInput
            label="Date"
            type="date"
            value={formData.signatureDate}
            onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
            required
          />
        </div>
      </FormSection>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Form
            </>
          )}
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl border border-border hover:bg-secondary/80 transition-all duration-300"
          onClick={() => window.print()}
        >
          <FileText className="w-5 h-5" />
          Print Form
        </button>
      </div>
      </form>
    </>
  );
};
