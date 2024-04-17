interface TextareaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Textarea({
  placeholder,
  value,
  onChange,
}: TextareaProps) {
  return (
    <textarea
      className="text-white bg-black border p-1 w-full rounded border-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      cols={50}
    />
  );
}
