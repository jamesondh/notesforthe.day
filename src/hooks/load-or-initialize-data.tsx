import { useEffect } from "react";
import { getDatabaseKey } from "../utils";

interface LoadOrInitializeDataProps<T> {
  date: string;
  label: string;
  initialValue?: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoadOrInitializeData<T>({
  date,
  label,
  initialValue = "" as T,
  setValue,
  setIsLoaded,
}: LoadOrInitializeDataProps<T>) {
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
