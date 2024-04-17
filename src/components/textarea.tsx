interface TextareaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
}: TextareaProps) {
  return (
    <div className="mb-2">
      <p className="mb-1">{label}</p>
      <textarea
        className="text-white bg-black border p-1 w-full rounded border-gray-700"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        cols={50}
      />
    </div>
  );
}
