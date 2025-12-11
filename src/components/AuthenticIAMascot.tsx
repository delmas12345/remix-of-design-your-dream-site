import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mascotImage from '@/assets/authenticia-mascot.png';

const AuthenticIAMascot: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Show mascot after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-24 right-6 z-40 max-w-sm transition-all duration-300 ${isLeaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-fade-in'}`}>
      {/* Speech Bubble */}
      <div className="relative bg-card border-2 border-primary/30 rounded-2xl shadow-2xl p-5 backdrop-blur-sm">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-muted hover:bg-muted/80 border border-border transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Mascot Avatar */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-primary/30">
              <img src={mascotImage} alt="AuthenticIA Mascot" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex-1">
            {/* Mascot Name */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-foreground text-lg">AuthenticIA</h3>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>

            {/* Message */}
            <p className="text-foreground text-sm leading-relaxed mb-4">
              👋 <strong>Welcome!</strong> I'm here to help you design your perfect website. 
              Click the <span className="text-primary font-semibold">AI Assistant</span> button below to share your ideas, 
              and I'll help you fill out this form based on your unique needs!
            </p>

            {/* Arrow pointing to AI button */}
            <div className="flex items-center gap-2 text-primary text-sm mb-4">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span className="font-medium">Click the button in the bottom right corner</span>
            </div>

            {/* Understand Button */}
            <Button
              onClick={handleDismiss}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              I Understand
            </Button>
          </div>
        </div>

        {/* Speech bubble tail */}
        <div className="absolute -bottom-3 right-8 w-6 h-6 bg-card border-b-2 border-r-2 border-primary/30 transform rotate-45" />
      </div>
    </div>
  );
};

export default AuthenticIAMascot;
