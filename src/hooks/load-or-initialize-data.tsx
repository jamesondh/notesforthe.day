import { useEffect } from "react";
import { getDatabaseKey } from "../utils";
import { CheckboxItem } from "../types";

interface LoadOrInitializeDataProps {
  date: string;
  label: string;
  initialValue?: CheckboxItem[] | string;
  setValue: React.Dispatch<React.SetStateAction<CheckboxItem[] | string>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoadOrInitializeData({
  date,
  label,
  initialValue = "",
  setValue,
  setIsLoaded,
}: LoadOrInitializeDataProps) {
  useEffect(() => {
    if (!date || !label) return;

    setIsLoaded(false);
    const savedData = localStorage.getItem(getDatabaseKey(date, label));
    if (savedData) {
      setValue(JSON.parse(savedData));
    } else {
      setValue(initialValue);
    }
    setIsLoaded(true);
  }, [date, label]);
}
