import { useEffect } from "react";
import { INITIAL_TEMPLATE } from "../constants";
import { getDatabaseTemplateKey } from "../utils";
import { InputComponent } from "../types";

interface LoadOrInitializeTemplateProps {
  setValue: React.Dispatch<React.SetStateAction<InputComponent[]>>;
}

export default function LoadOrInitializeTemplate({
  setValue,
}: LoadOrInitializeTemplateProps) {
  useEffect(() => {
    const savedData = localStorage.getItem(getDatabaseTemplateKey());
    if (savedData) {
      setValue(JSON.parse(savedData));
    } else {
      localStorage.setItem(
        getDatabaseTemplateKey(),
        JSON.stringify(INITIAL_TEMPLATE),
      );
      setValue(INITIAL_TEMPLATE);
    }
  }, []);
}
