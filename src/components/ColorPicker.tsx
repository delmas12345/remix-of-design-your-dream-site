interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-foreground min-w-[120px]">
        {label}
      </label>
      <div className="flex items-center gap-3 flex-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-border cursor-pointer overflow-hidden"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-input flex-1 uppercase"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};
