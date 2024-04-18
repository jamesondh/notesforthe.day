import { useState } from "react";
import LoadOrInitializeData from "../hooks/load-or-initialize-data";
import PushUpdateToDb from "../hooks/push-update-to-db";

interface TextareaProps {
  label: string;
  date: string;
  placeholder: string;
  rows?: number;
}

export default function Textarea({
  label,
  date,
  placeholder,
  rows = 4,
}: TextareaProps) {
  const [value, setValue] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  LoadOrInitializeData({ date, label, setValue, setIsLoaded });
  PushUpdateToDb({ date, label, isLoaded, value });

  return (
    <div className="mb-4">
      <p className="mb-1">{label}</p>
      <textarea
        className="text-white bg-backgroundPrimaryDark shadow-lg p-3 w-full rounded border-gray-700"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={rows}
        cols={50}
      />
    </div>
  );
}
