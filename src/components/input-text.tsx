interface InputTextProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (value: string) => void;
}

export default function InputText({
  placeholder,
  value,
  onChange,
  onKeyPress,
}: InputTextProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="text-white p-1 bg-black border w-full rounded border-gray-700"
      onKeyPress={(e) => onKeyPress(e.key)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
