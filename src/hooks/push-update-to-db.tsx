import { useEffect } from "react";
import { getDatabaseDateKey } from "../utils";
import { InputComponent } from "../types";

interface PushUpdateToDbProps {
  date: string;
  label: string;
  isLoaded: boolean;
  value: unknown;
}

// TODO: don't store an empty template
export default function PushUpdateToDb({
  date,
  label,
  isLoaded,
  value,
}: PushUpdateToDbProps) {
  useEffect(() => {
    if (isLoaded) {
      // get today's entry from local storage
      const today = localStorage.getItem(getDatabaseDateKey(date));

      // if there is no entry for today, create a new one
      if (!today) {
        // console.log("No entry for today, creating a new one");
        const newToday = [];
        newToday.push({ label, value });
        localStorage.setItem(
          getDatabaseDateKey(date),
          JSON.stringify(newToday),
        );
        return;
      }
      // console.log("Entry for today found");

      // get the input component data for this label
      const inputComponentData = JSON.parse(today).find(
        (item: InputComponent) => item.label === label,
      );
      if (!inputComponentData) {
        // console.log("No data for this label, creating a new one");
        const newToday = JSON.parse(today);
        newToday.push({ label, value });
        localStorage.setItem(
          getDatabaseDateKey(date),
          JSON.stringify(newToday),
        );
        return;
      } else {
        // console.log("Data for this label found");
        // if the data is the same as the value, do nothing
        if (
          JSON.stringify(inputComponentData.value) === JSON.stringify(value)
        ) {
          // console.log("Data is the same, doing nothing");
          return;
        }
        // console.log("Data is different, updating");
        // update the data for this label
        const newToday = JSON.parse(today).map((item: InputComponent) =>
          item.label === label ? { label, value } : item,
        );
        localStorage.setItem(
          getDatabaseDateKey(date),
          JSON.stringify(newToday),
        );
      }
    }
  }, [value, isLoaded, date]);
}
