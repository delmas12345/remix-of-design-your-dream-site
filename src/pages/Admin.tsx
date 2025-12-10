import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Trash2, Eye, Calendar, Mail, Phone, ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.jpg";
import { Link } from "react-router-dom";

interface Submission {
  id: string;
  full_name: string;
  business_name: string | null;
  email: string;
  phone: string | null;
  website_purpose: string[] | null;
  other_purpose: string | null;
  page_count: string | null;
  main_pages: string | null;
  design_style: string[] | null;
  other_style: string | null;
  layout: string | null;
  main_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  use_designer_colors: boolean | null;
  typography: string | null;
  custom_typography: string | null;
  features: string[] | null;
  other_features: string | null;
  content_provider: string | null;
  media_provided: string[] | null;
  budget: string | null;
  deadline: string | null;
  launch_date: string | null;
  additional_notes: string | null;
  signature: string | null;
  signature_date: string | null;
  submitted_at: string;
}

const ADMIN_PASSWORD = "Delfr55%";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      fetchSubmissions();
    } else {
      toast({
        title: "Invalid Password",
        description: "The password you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("form_submissions")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Error",
        description: "Failed to load submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const { error } = await supabase
        .from("form_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSubmissions(submissions.filter((s) => s.id !== id));
      setSelectedSubmission(null);
      toast({
        title: "Deleted",
        description: "Submission has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast({
        title: "Error",
        description: "Failed to delete submission.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  // Set up realtime subscription
  useEffect(() => {
    if (!isAuthenticated) return;

    const channel = supabase
      .channel("submissions-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "form_submissions",
        },
        () => {
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="section-card max-w-md w-full">
          <div className="flex items-center justify-center gap-3 mb-8">
            <img src={logo} alt="Authentic Tech" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Access</h1>
              <p className="text-xs text-muted-foreground">Authentic Tech</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-secondary rounded-full">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Enter Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              Login
            </button>
          </form>

          <Link
            to="/"
            className="mt-6 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Authentic Tech" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Form Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubmissions}
              disabled={loading}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_auth");
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-1">
            <div className="section-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Submissions ({submissions.length})
              </h2>

              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No submissions yet
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      onClick={() => setSelectedSubmission(submission)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedSubmission?.id === submission.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="font-medium text-foreground">
                        {submission.full_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {submission.email}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submission Details */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="section-card">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedSubmission.full_name}
                    </h2>
                    {selectedSubmission.business_name && (
                      <p className="text-muted-foreground">
                        {selectedSubmission.business_name}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSubmission(selectedSubmission.id)}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Section 1: Client Information */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">1. Client Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Full Name</span>
                        <p className="text-foreground font-medium">{selectedSubmission.full_name}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Business Name</span>
                        <p className="text-foreground">{selectedSubmission.business_name || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Email</span>
                        <a href={`mailto:${selectedSubmission.email}`} className="text-accent hover:underline flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {selectedSubmission.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Phone</span>
                        {selectedSubmission.phone ? (
                          <a href={`tel:${selectedSubmission.phone}`} className="text-accent hover:underline flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {selectedSubmission.phone}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">N/A</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Website Purpose */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">2. Website Purpose</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-muted-foreground">Selected Purposes</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedSubmission.website_purpose && selectedSubmission.website_purpose.length > 0 ? (
                            selectedSubmission.website_purpose.map((purpose) => (
                              <span key={purpose} className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                                {purpose}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                      {selectedSubmission.other_purpose && (
                        <div>
                          <span className="text-xs text-muted-foreground">Other Purpose</span>
                          <p className="text-foreground">{selectedSubmission.other_purpose}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 3: Number of Pages */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">3. Number of Pages</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Page Count</span>
                        <p className="text-foreground">{selectedSubmission.page_count || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Main Pages</span>
                        <p className="text-foreground whitespace-pre-wrap">{selectedSubmission.main_pages || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Website Style & Layout */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">4. Website Style & Layout</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Design Styles</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedSubmission.design_style && selectedSubmission.design_style.length > 0 ? (
                            selectedSubmission.design_style.map((style) => (
                              <span key={style} className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                                {style}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                      {selectedSubmission.other_style && (
                        <div>
                          <span className="text-xs text-muted-foreground">Other Style</span>
                          <p className="text-foreground">{selectedSubmission.other_style}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-xs text-muted-foreground">Layout Preference</span>
                        <p className="text-foreground">{selectedSubmission.layout || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Color Palette */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">5. Color Palette</h3>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-6">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Main Color</span>
                          {selectedSubmission.main_color ? (
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-lg border border-border" style={{ backgroundColor: selectedSubmission.main_color }} />
                              <span className="text-sm text-foreground">{selectedSubmission.main_color}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Secondary Color</span>
                          {selectedSubmission.secondary_color ? (
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-lg border border-border" style={{ backgroundColor: selectedSubmission.secondary_color }} />
                              <span className="text-sm text-foreground">{selectedSubmission.secondary_color}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Accent Color</span>
                          {selectedSubmission.accent_color ? (
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-lg border border-border" style={{ backgroundColor: selectedSubmission.accent_color }} />
                              <span className="text-sm text-foreground">{selectedSubmission.accent_color}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Use Designer Colors</span>
                        <p className="text-foreground">{selectedSubmission.use_designer_colors ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Typography */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">6. Typography</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Typography Style</span>
                        <p className="text-foreground">{selectedSubmission.typography || "N/A"}</p>
                      </div>
                      {selectedSubmission.custom_typography && (
                        <div>
                          <span className="text-xs text-muted-foreground">Custom Typography</span>
                          <p className="text-foreground">{selectedSubmission.custom_typography}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 7: Features & Functionalities */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">7. Features & Functionalities</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-muted-foreground">Selected Features</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedSubmission.features && selectedSubmission.features.length > 0 ? (
                            selectedSubmission.features.map((feature) => (
                              <span key={feature} className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                                {feature}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                      {selectedSubmission.other_features && (
                        <div>
                          <span className="text-xs text-muted-foreground">Other Features</span>
                          <p className="text-foreground">{selectedSubmission.other_features}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 8: Media & Content */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">8. Media & Content</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Content Provider</span>
                        <p className="text-foreground">{selectedSubmission.content_provider || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Media Provided</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedSubmission.media_provided && selectedSubmission.media_provided.length > 0 ? (
                            selectedSubmission.media_provided.map((media) => (
                              <span key={media} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                                {media}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 9: Project Deadline */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">9. Project Deadline</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Deadline</span>
                        <p className="text-foreground">{selectedSubmission.deadline || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Launch Date</span>
                        <p className="text-foreground">{selectedSubmission.launch_date || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 10: Budget Range */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">10. Budget Range</h3>
                    <div>
                      <span className="text-xs text-muted-foreground">Budget</span>
                      <p className="text-foreground text-lg font-medium">{selectedSubmission.budget || "N/A"}</p>
                    </div>
                  </div>

                  {/* Section 11: Additional Notes */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">11. Additional Notes</h3>
                    <p className="text-foreground whitespace-pre-wrap">{selectedSubmission.additional_notes || "N/A"}</p>
                  </div>

                  {/* Section 12: Client Signature */}
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4 text-lg border-b border-border pb-2">12. Client Signature</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground">Signature</span>
                        <p className="text-foreground font-medium italic">{selectedSubmission.signature || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Date</span>
                        <p className="text-foreground">{selectedSubmission.signature_date || "N/A"}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">Submitted At</span>
                      <p className="text-foreground">{new Date(selectedSubmission.submitted_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="section-card flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-muted-foreground">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a submission to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
