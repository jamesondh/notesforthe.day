interface InputTextProps {
  placeholder: string;
  onKeyPress: (value: string) => void;
}

export default function InputText({ placeholder, onKeyPress }: InputTextProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="text-white bg-black border p-1 my-1 w-full rounded border-gray-700"
      onKeyPress={(e) => {
        if (e.key === "Enter") onKeyPress((e.target as HTMLInputElement).value);
      }}
    />
  );
}
