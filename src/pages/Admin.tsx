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
  page_count: string | null;
  design_style: string[] | null;
  layout: string | null;
  main_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  features: string[] | null;
  budget: string | null;
  deadline: string | null;
  additional_notes: string | null;
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Contact</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${selectedSubmission.email}`} className="hover:text-accent">
                        {selectedSubmission.email}
                      </a>
                    </div>
                    {selectedSubmission.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${selectedSubmission.phone}`} className="hover:text-accent">
                          {selectedSubmission.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Project</h3>
                    {selectedSubmission.page_count && (
                      <p className="text-muted-foreground">
                        Pages: {selectedSubmission.page_count}
                      </p>
                    )}
                    {selectedSubmission.budget && (
                      <p className="text-muted-foreground">
                        Budget: {selectedSubmission.budget}
                      </p>
                    )}
                    {selectedSubmission.deadline && (
                      <p className="text-muted-foreground">
                        Deadline: {selectedSubmission.deadline}
                      </p>
                    )}
                  </div>

                  {/* Website Purpose */}
                  {selectedSubmission.website_purpose && selectedSubmission.website_purpose.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Purpose</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.website_purpose.map((purpose) => (
                          <span
                            key={purpose}
                            className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                          >
                            {purpose}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Design Style */}
                  {selectedSubmission.design_style && selectedSubmission.design_style.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Style</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.design_style.map((style) => (
                          <span
                            key={style}
                            className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                          >
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Colors</h3>
                    <div className="flex gap-3">
                      {selectedSubmission.main_color && (
                        <div
                          className="w-10 h-10 rounded-lg border border-border"
                          style={{ backgroundColor: selectedSubmission.main_color }}
                          title={`Main: ${selectedSubmission.main_color}`}
                        />
                      )}
                      {selectedSubmission.secondary_color && (
                        <div
                          className="w-10 h-10 rounded-lg border border-border"
                          style={{ backgroundColor: selectedSubmission.secondary_color }}
                          title={`Secondary: ${selectedSubmission.secondary_color}`}
                        />
                      )}
                      {selectedSubmission.accent_color && (
                        <div
                          className="w-10 h-10 rounded-lg border border-border"
                          style={{ backgroundColor: selectedSubmission.accent_color }}
                          title={`Accent: ${selectedSubmission.accent_color}`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  {selectedSubmission.features && selectedSubmission.features.length > 0 && (
                    <div className="space-y-3 md:col-span-2">
                      <h3 className="font-semibold text-foreground">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Notes */}
                  {selectedSubmission.additional_notes && (
                    <div className="space-y-3 md:col-span-2">
                      <h3 className="font-semibold text-foreground">Notes</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {selectedSubmission.additional_notes}
                      </p>
                    </div>
                  )}
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
