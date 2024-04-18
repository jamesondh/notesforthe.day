import { useEffect } from "react";
import { getDatabaseKey } from "../utils";

interface PushUpdateToDbProps {
  date: string;
  label: string;
  isLoaded: boolean;
  value: unknown;
}

// TODO: only push to db if value has changed
export default function PushUpdateToDb({
  date,
  label,
  isLoaded,
  value,
}: PushUpdateToDbProps) {
  useEffect(() => {
    if (isLoaded) {
      // console.log("Pushing to db", date, label, value);
      localStorage.setItem(getDatabaseKey(date, label), JSON.stringify(value));
    }
  }, [value, isLoaded, date]);
}
