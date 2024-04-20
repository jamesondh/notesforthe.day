import classNames from "classnames";

interface InputTextProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (value: string) => void;
  backgroundColor?: string;
  outline?: boolean;
}

export default function InputText({
  placeholder,
  value,
  onChange,
  onKeyPress,
  backgroundColor = "bg-backgroundPrimaryDark",
  outline = false,
}: InputTextProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className={classNames(
        "text-foregroundPrimary p-3 shadow w-full rounded",
        backgroundColor,
        outline ? "border border-red-500" : "",
      )}
      onKeyPress={(e) => onKeyPress && onKeyPress(e.key)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
