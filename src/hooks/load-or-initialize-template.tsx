import { useEffect } from "react";
import { INITIAL_TEMPLATE } from "../constants";
import {
  setTemplate,
  setTemplateForDate,
  getTemplateForDate,
  getTemplate,
} from "../utils";
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
      const today = getTemplateForDate(date);
      if (today) {
        // console.log("Found today's template");
        // console.log("today", today);
        setValue(JSON.parse(today));
        return;
      }
    }

    // use the global template (and create it if necessary)
    let template;
    const globalTemplate = getTemplate();
    if (globalTemplate) {
      template = JSON.parse(globalTemplate);
    } else {
      setTemplate(JSON.stringify(INITIAL_TEMPLATE));
      template = INITIAL_TEMPLATE;
    }
    setValue(template);
    // console.log("set template: ", JSON.stringify(template));

    // set today's template to the global template
    if (date) {
      // console.log("Setting today's template to the global template");
      // console.log(JSON.stringify(template));
      setTemplateForDate(date, JSON.stringify(template));
      // console.log("Today's template set to the global template");
    }
  }, [date]);
}
