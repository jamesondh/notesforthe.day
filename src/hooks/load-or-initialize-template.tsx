import { useEffect } from "react";
import { INITIAL_TEMPLATE } from "../constants";
import { getDatabaseTemplateKey, getDatabaseDateTemplateKey } from "../utils";
import { InputComponent } from "../types";

interface LoadOrInitializeTemplateProps {
  date?: string | null;
  setValue: React.Dispatch<React.SetStateAction<InputComponent[]>>;
}

export default function LoadOrInitializeTemplate({
  date,
  setValue,
}: LoadOrInitializeTemplateProps) {
  useEffect(() => {
    // console.log("Loading or initializing template");

    // if a date is passed, try to load the template for that date and return early
    if (date) {
      const today = localStorage.getItem(getDatabaseDateTemplateKey(date));
      if (today) {
        setValue(JSON.parse(today));
        return;
      }
    }

    // use the global template (and create it if necessary)
    let template;
    const globalTemplate = localStorage.getItem(getDatabaseTemplateKey());
    if (globalTemplate) {
      template = JSON.parse(globalTemplate);
    } else {
      localStorage.setItem(
        getDatabaseTemplateKey(),
        JSON.stringify(INITIAL_TEMPLATE),
      );
      template = INITIAL_TEMPLATE;
    }
    setValue(template);

    // set today's template to the global template
    if (date) {
      localStorage.setItem(
        getDatabaseDateTemplateKey(date),
        JSON.stringify(template),
      );
    }
  }, [date]);
}
