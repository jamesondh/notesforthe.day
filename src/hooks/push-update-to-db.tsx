import { useEffect } from "react";
import { getDatabaseKey } from "../utils";

interface PushUpdateToDbProps {
  date: string;
  label: string;
  isLoaded: boolean;
  value: unknown;
}

export default function PushUpdateToDb({
  date,
  label,
  isLoaded,
  value,
}: PushUpdateToDbProps) {
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(getDatabaseKey(date, label), JSON.stringify(value));
    }
  }, [value, isLoaded, date]);
}
