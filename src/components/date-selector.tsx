interface DateSelectorProps {
  value: string;
  onChange: (newDate: string) => void;
}

export default function DateSelector({ value, onChange }: DateSelectorProps) {
  return (
    <div>
      <label htmlFor="dateSelector">Select Date: </label>
      <input
        id="dateSelector"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-black"
      />
    </div>
  );
}
