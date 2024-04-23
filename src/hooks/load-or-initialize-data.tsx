import { useEffect } from "react";
import { getNotesForDate } from "../utils";
import { InputComponent } from "../types";

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
    // console.log("Loading or initializing data for", date, label);

    setIsLoaded(false);

    // get today's entry from local storage
    const today = getNotesForDate(date);

    // if today's entry does not exist, set isLoaded to true, use initial value, and return early
    if (!today) {
      // console.log("No entry for today, setting initial value");
      setValue(initialValue);
      setIsLoaded(true);
      return;
    }

    // find the data for the input component with this label
    const inputComponentData = today
      ? JSON.parse(today).find((item: InputComponent) => item.label === label)
      : null;
    // console.log("Input component data found", inputComponentData);

    // if exists, set the value to the saved data. otherwise, set it to the initial value
    if (inputComponentData) {
      // console.log("Setting value to ", inputComponentData.value);
      setValue(inputComponentData.value);
    } else {
      // console.log("setting initial value");
      setValue(initialValue);
    }

    setIsLoaded(true);
  }, [date, label]);
}
