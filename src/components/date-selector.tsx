interface DateSelectorProps {
  value: string;
  onChange: (newDate: string) => void;
}

export default function DateSelector({ value, onChange }: DateSelectorProps) {
  return (
    <div>
      <input
        id="dateSelector"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm tracking-tight text-foregroundPrimary bg-backgroundPrimary h-full"
        style={{ colorScheme: "dark", maxWidth: "6.9rem" }} // TODO: match theme
      />
    </div>
  );
}
