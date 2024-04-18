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
      className="text-white p-3 bg-backgroundPrimaryDark shadow-lg w-full rounded"
      onKeyPress={(e) => onKeyPress(e.key)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
