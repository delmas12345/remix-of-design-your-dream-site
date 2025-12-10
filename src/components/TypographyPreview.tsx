import { cn } from "@/lib/utils";

interface TypographyOption {
  id: string;
  label: string;
}

interface TypographyPreviewProps {
  options: TypographyOption[];
  selected: string;
  onChange: (value: string) => void;
}

const fontStyles: Record<string, { fontFamily: string; sampleText: string; description: string }> = {
  elegant: {
    fontFamily: "'Playfair Display', serif",
    sampleText: "Elegant & Sophisticated",
    description: "Timeless serif fonts perfect for luxury brands"
  },
  modern: {
    fontFamily: "'Montserrat', sans-serif",
    sampleText: "Clean & Modern",
    description: "Contemporary sans-serif for professional look"
  },
  bold: {
    fontFamily: "'Bebas Neue', sans-serif",
    sampleText: "BOLD & POWERFUL",
    description: "Strong fonts that make a statement"
  },
  fun: {
    fontFamily: "'Pacifico', cursive",
    sampleText: "Fun & Creative",
    description: "Playful fonts for creative projects"
  }
};

export const TypographyPreview = ({ options, selected, onChange }: TypographyPreviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => {
        const style = fontStyles[option.id];
        const isSelected = selected === option.id;
        
        return (
          <label
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all duration-300",
              "hover:shadow-lg hover:-translate-y-0.5",
              isSelected
                ? "border-accent bg-accent/5 shadow-md"
                : "border-border bg-card hover:border-accent/50"
            )}
          >
            {/* Radio indicator */}
            <div className="absolute top-4 right-4">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                isSelected ? "border-accent bg-accent" : "border-muted-foreground/40"
              )}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                )}
              </div>
            </div>
            
            {/* Font preview */}
            <div className="mb-3">
              <span
                className="text-2xl md:text-3xl text-foreground block leading-tight"
                style={{ fontFamily: style?.fontFamily }}
              >
                {style?.sampleText}
              </span>
            </div>
            
            {/* Label and description */}
            <div className="mt-auto">
              <span className="font-semibold text-foreground block">{option.label}</span>
              <span className="text-sm text-muted-foreground">{style?.description}</span>
            </div>
            
            {/* Sample alphabet */}
            <div 
              className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground"
              style={{ fontFamily: style?.fontFamily }}
            >
              Aa Bb Cc 123
            </div>
          </label>
        );
      })}
    </div>
  );
};
