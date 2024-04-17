interface InputTextProps {
  placeholder: string;
  onKeyPress: (value: string) => void;
}

export default function InputText({ placeholder, onKeyPress }: InputTextProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="text-white bg-black border p-1 mb-1 w-full"
      onKeyPress={(e) => {
        if (e.key === "Enter") onKeyPress((e.target as HTMLInputElement).value);
      }}
    />
  );
}
