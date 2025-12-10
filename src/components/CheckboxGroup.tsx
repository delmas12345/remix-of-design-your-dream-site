import { Check } from "lucide-react";

interface CheckboxOption {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 1 | 2 | 3;
}

export const CheckboxGroup = ({ options, selected, onChange, columns = 2 }: CheckboxGroupProps) => {
  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

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
          onClick={() => toggleOption(option.id)}
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              selected.includes(option.id)
                ? "bg-accent border-accent"
                : "border-border group-hover:border-accent/50"
            }`}
          >
            {selected.includes(option.id) && (
              <Check className="w-3 h-3 text-accent-foreground" />
            )}
          </div>
          <span className="text-foreground text-sm md:text-base">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
