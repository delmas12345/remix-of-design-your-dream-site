import { ArrowLeft, Shield, CreditCard, HeadphonesIcon, Lock, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Form
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Privacy Policy & Terms of Service
            </h1>
          </div>
          <p className="text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Authentic Tech. By submitting our design options form, you agree to the following terms and conditions. 
              Please read this document carefully before proceeding with your project request.
            </p>
          </section>

          {/* Payment Terms */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Payment Terms</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                We offer flexible payment options to accommodate your business needs:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Full Payment</h3>
                  <p className="text-sm">
                    Pay the entire project cost upfront and receive a <span className="text-primary font-medium">10% discount</span> on 
                    your total project value. This option is ideal for clients who prefer a one-time transaction.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Monthly Installments</h3>
                  <p className="text-sm">
                    Pay in monthly installments with a <span className="text-primary font-medium">minimum of $500 USD per month</span>. 
                    The project will be delivered in phases according to your payment schedule.
                  </p>
                </div>
              </div>
              <p className="text-sm italic">
                Note: Project development begins only after receipt of the initial payment or first installment.
              </p>
            </div>
          </section>

          {/* Support & Maintenance */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <HeadphonesIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Support & Maintenance</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  6 Months Free Assistance
                </h3>
                <p className="text-sm">
                  Every system we create includes <span className="font-medium">6 months of complimentary technical assistance</span> starting 
                  from the project delivery date. This includes bug fixes, minor adjustments, and technical support.
                </p>
              </div>
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
                  Extended Support
                </h3>
                <p className="text-sm">
                  After the initial 6-month period, continued assistance and maintenance services are available 
                  at an additional cost. Support packages can be customized based on your specific needs and 
                  will be discussed prior to the expiration of your free support period.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy & Data Collection */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Privacy & Data Collection</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                We are committed to protecting your privacy and handling your personal information responsibly.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p>
                    <span className="font-medium text-foreground">Purpose of Data Collection:</span> We collect personal 
                    information (name, email, phone number, business details) solely for the purpose of contacting you 
                    regarding your project inquiry and delivering our services.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p>
                    <span className="font-medium text-foreground">No Unauthorized Marketing:</span> Your information will 
                    <span className="font-semibold"> never be used for marketing purposes without your explicit consent</span>. 
                    We do not sell, trade, or share your personal data with third parties for promotional activities.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p>
                    <span className="font-medium text-foreground">Data Security:</span> We implement appropriate security 
                    measures to protect your personal information from unauthorized access, alteration, or disclosure.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p>
                    <span className="font-medium text-foreground">Data Retention:</span> Your information is retained only 
                    for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these terms or need assistance, please reach out to us directly:
            </p>
            <a 
              href="https://wa.me/17546104106" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: +1 (754) 610-4106
            </a>
          </section>

          {/* Agreement */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Agreement</h2>
            <p className="text-muted-foreground leading-relaxed">
              By submitting the design options form, you acknowledge that you have read, understood, and agree to 
              be bound by these terms and conditions. If you do not agree with any part of these terms, please do 
              not submit the form.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Authentic Tech. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
