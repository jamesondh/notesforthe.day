import classNames from "classnames";

interface InputTextProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (value: string) => void;
  backgroundColor?: string;
}

export default function InputText({
  placeholder,
  value,
  onChange,
  onKeyPress,
  backgroundColor = "bg-backgroundPrimaryDark",
}: InputTextProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className={classNames(
        "text-foregroundPrimary p-3 shadow w-full rounded",
        backgroundColor,
      )}
      onKeyPress={(e) => onKeyPress(e.key)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
