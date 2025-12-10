interface RadioOption {
  id: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3;
}

export const RadioGroup = ({ name, options, selected, onChange, columns = 2 }: RadioGroupProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-2`}>
      {options.map((option) => (
        <label
          key={option.id}
          className="checkbox-label group cursor-pointer"
          onClick={() => onChange(option.id)}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              selected === option.id
                ? "border-accent"
                : "border-border group-hover:border-accent/50"
            }`}
          >
            {selected === option.id && (
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            )}
          </div>
          <span className="text-foreground text-sm md:text-base">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
